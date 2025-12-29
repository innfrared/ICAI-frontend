import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  SessionContainer,
  SessionHeader,
  SessionHeaderActions,
  SessionInfo,
  InfoItem,
  InfoLabel,
  InfoValue,
  BackButton,
  CompleteButton,
  QuestionsGrid,
  QuestionCard,
  QuestionHeader,
  QuestionNumber,
  QuestionText,
  AnswerSection,
  AnswerTextarea,
  AnswerActions,
  DictateButton,
  SubmitAnswerButton,
  AnswerButton,
  CancelButton,
  FeedbackSection,
  FeedbackText,
  GenerateMoreButton,
  DeleteButton,
  LoadingSpinner,
  ErrorMessage,
} from './InterviewSession.styles';

import {
  getInterviewSession,
  submitInterviewAnswer,
  generateMoreQuestions,
  deleteInterviewQuestion,
  completeInterviewSession,
  getInterviewToken,
} from '@services/interviews/interviews';

import type { InterviewSessionDetail } from '@services/interviews/interview.types';
import type { ApiError } from '@services/api/client';

import { formatRole, formatLevel, formatTechStackList } from '../../utils/formatText';
import { useAuth } from '../../contexts/AuthContext';

type SpeechRecognitionCtor = new () => SpeechRecognition;

const getSpeechRecognitionCtor = (): SpeechRecognitionCtor | null => {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

const InterviewSession: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const [session, setSession] = useState<InterviewSessionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const answersRef = useRef<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isMountedRef = useRef(true);

  // Keep ref in sync to avoid stale closure bugs (dictation uses this)
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Stop speech recognition on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  const handleApiError = useCallback(
    (err: unknown) => {
      const apiError = err as ApiError;

      // Guest access check
      if (apiError?.status === 403) {
        const guestToken = sessionId ? getInterviewToken(sessionId) : null;
        if (!isAuthenticated && !guestToken) {
          setError('This interview link requires access. Please log in or use a valid interview link.');
          return;
        }
      }

      // Auth expired / invalid
      if (apiError?.status === 401 && isAuthenticated) {
        logout();
        navigate('/login', { state: { from: { pathname: `/interviews/${sessionId}` } } });
        return;
      }

      setError(apiError?.message || 'Something went wrong.');
    },
    [isAuthenticated, logout, navigate, sessionId]
  );

  const hydrateAnswersFromSession = useCallback((sessionData: InterviewSessionDetail) => {
    const next: Record<string, string> = {};
    for (const q of sessionData.questions) {
      if (q.answer) next[q.id] = q.answer;
    }
    setAnswers(next);
  }, []);

  const loadSession = useCallback(async () => {
    if (!sessionId) {
      setError('Invalid session ID');
      setIsLoading(false);
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      const sessionData = await getInterviewSession(sessionId);
      if (!isMountedRef.current) return;

      setSession(sessionData);
      hydrateAnswersFromSession(sessionData);
    } catch (err) {
      if (!isMountedRef.current) return;
      handleApiError(err);
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  }, [sessionId, hydrateAnswersFromSession, handleApiError]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const headerInfo = useMemo(() => {
    if (!session) return null;
    return {
      role: formatRole(session.role),
      level: formatLevel(session.level),
      stack: formatTechStackList(session.stack),
    };
  }, [session]);

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleStopDictation = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(null);
  }, []);

  const handleStartDictation = useCallback(
    (questionId: string) => {
      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) {
        setError('Speech recognition is not supported in your browser.');
        return;
      }

      // stop any existing session first
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      const recognition = new Ctor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }

        const current = answersRef.current[questionId] || '';
        const next = current ? `${current} ${transcript}` : transcript;
        setAnswers((prev) => ({ ...prev, [questionId]: next }));
      };

      recognition.onerror = () => {
        setIsListening(null);
        recognitionRef.current = null;
      };

      recognition.onend = () => {
        setIsListening(null);
        recognitionRef.current = null;
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(questionId);
    },
    []
  );

  const handleSubmitAnswer = useCallback(
    async (questionId: string) => {
      if (!sessionId) return;

      const answer = (answersRef.current[questionId] || '').trim();
      if (!answer) {
        setError('Please enter an answer before submitting.');
        return;
      }

      if (answer.length <= 15) {
        setError('Answer must be more than 15 characters.');
        return;
      }

      try {
        setError('');
        setIsSubmitting(questionId);

        const updatedSession = await submitInterviewAnswer(sessionId, {
          question_id: questionId,
          answer,
        });

        if (!isMountedRef.current) return;

        setSession(updatedSession);
        setAnsweringQuestionId(null);
        // keep local answers in sync in case backend normalized/stored it
        hydrateAnswersFromSession(updatedSession);
      } catch (err) {
        if (!isMountedRef.current) return;
        const apiError = err as ApiError;
        setError(apiError?.message || 'Failed to submit answer.');
      } finally {
        if (isMountedRef.current) setIsSubmitting(null);
      }
    },
    [sessionId, hydrateAnswersFromSession]
  );

  const handleGenerateMore = useCallback(async () => {
    if (!sessionId) return;

    try {
      setError('');
      setIsGenerating(true);

      const updatedSession = await generateMoreQuestions(sessionId, { count: 3 });

      if (!isMountedRef.current) return;

      setSession(updatedSession);
      // do not overwrite text user is currently typing; only hydrate answered ones
      hydrateAnswersFromSession(updatedSession);
    } catch (err) {
      if (!isMountedRef.current) return;
      const apiError = err as ApiError;
      setError(apiError?.message || 'Failed to generate more questions.');
    } finally {
      if (isMountedRef.current) setIsGenerating(false);
    }
  }, [sessionId, hydrateAnswersFromSession]);

  const handleDeleteQuestion = useCallback(
    async (questionId: string) => {
      if (!sessionId) return;

      try {
        setError('');
        setIsDeleting(questionId);

        const updatedSession = await deleteInterviewQuestion(sessionId, questionId);

        if (!isMountedRef.current) return;

        setSession(updatedSession);

        if (answeringQuestionId === questionId) setAnsweringQuestionId(null);

        setAnswers((prev) => {
          const next = { ...prev };
          delete next[questionId];
          return next;
        });
      } catch (err) {
        if (!isMountedRef.current) return;
        const apiError = err as ApiError;
        setError(apiError?.message || 'Failed to delete question.');
      } finally {
        if (isMountedRef.current) setIsDeleting(null);
      }
    },
    [sessionId, answeringQuestionId]
  );

  const handleCompleteSession = useCallback(async () => {
    if (!sessionId) return;

    const ok = window.confirm('Are you sure you want to complete this interview session?');
    if (!ok) return;

    try {
      setError('');
      setIsCompleting(true);

      const updatedSession = await completeInterviewSession(sessionId);

      if (!isMountedRef.current) return;

      setSession(updatedSession);
    } catch (err) {
      if (!isMountedRef.current) return;
      const apiError = err as ApiError;
      setError(apiError?.message || 'Failed to complete session.');
    } finally {
      if (isMountedRef.current) setIsCompleting(false);
    }
  }, [sessionId]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isLoading) {
    return (
      <SessionContainer>
        <LoadingSpinner>Loading interview session...</LoadingSpinner>
      </SessionContainer>
    );
  }

  if (error || !session) {
    return (
      <SessionContainer>
        <ErrorMessage>{error || 'Session not found'}</ErrorMessage>
      </SessionContainer>
    );
  }

  return (
    <SessionContainer>
      <SessionHeader>
        <SessionHeaderActions>
          <BackButton onClick={handleGoBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Go Back
          </BackButton>
          <CompleteButton onClick={handleCompleteSession} disabled={isCompleting || session.status === 'COMPLETED'}>
            {isCompleting ? 'Completing...' : session.status === 'COMPLETED' ? 'Completed' : 'Complete Session'}
          </CompleteButton>
        </SessionHeaderActions>
        <SessionInfo>
          <InfoItem>
            <InfoLabel>Role</InfoLabel>
            <InfoValue>{headerInfo?.role}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Level</InfoLabel>
            <InfoValue>{headerInfo?.level}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Tech Stack</InfoLabel>
            <InfoValue>{headerInfo?.stack}</InfoValue>
          </InfoItem>
        </SessionInfo>
      </SessionHeader>

      <QuestionsGrid>
        {session.questions.map((q) => {
          const isEditing = answeringQuestionId === q.id;
          const isBusy = isSubmitting === q.id || isDeleting === q.id;

          return (
            <QuestionCard key={q.id} aria-busy={isBusy}>
              <DeleteButton
                onClick={() => handleDeleteQuestion(q.id)}
                disabled={isDeleting === q.id}
                aria-label={`Delete question ${q.order}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </DeleteButton>

              <QuestionHeader>
                <QuestionNumber>Q{q.order}</QuestionNumber>
                <QuestionText>{q.question}</QuestionText>
              </QuestionHeader>

              {isEditing ? (
                <AnswerSection>
                  <AnswerTextarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder="Type your answer here"
                  />

                  <AnswerActions>
                    <DictateButton
                      onClick={() => (isListening === q.id ? handleStopDictation() : handleStartDictation(q.id))}
                      $isListening={isListening === q.id}
                      disabled={isSubmitting === q.id}
                    >
                      {isListening === q.id ? 'Stop' : 'Dictate'}
                    </DictateButton>
                    <CancelButton
                      onClick={() => {
                        setAnsweringQuestionId(null);
                        setAnswers((prev) => {
                          const next = { ...prev };
                          delete next[q.id];
                          return next;
                        });
                      }}
                      disabled={isSubmitting === q.id}
                    >
                      Cancel
                    </CancelButton>
                    <SubmitAnswerButton
                      onClick={() => handleSubmitAnswer(q.id)}
                      disabled={isSubmitting === q.id || !(answers[q.id] || '').trim() || (answers[q.id] || '').trim().length <= 15}
                    >
                      {isSubmitting === q.id ? 'Submitting...' : 'Submit'}
                    </SubmitAnswerButton>
                  </AnswerActions>
                </AnswerSection>
                  ) : (
                    <AnswerSection>
                      {q.answer ? (
                        <>
                          <AnswerTextarea value={q.answer} readOnly />
                          {q.feedback ? (
                            <FeedbackSection>
                              <FeedbackText>{q.feedback}</FeedbackText>
                            </FeedbackSection>
                          ) : null}
                        </>
                      ) : (
                        <AnswerButton onClick={() => setAnsweringQuestionId(q.id)}>
                          Answer
                        </AnswerButton>
                      )}
                    </AnswerSection>
                  )}
            </QuestionCard>
          );
        })}
      </QuestionsGrid>

      <GenerateMoreButton onClick={handleGenerateMore} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'More Questions'}
      </GenerateMoreButton>
    </SessionContainer>
  );
};

export default InterviewSession;
