import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listInterviewSessions } from '@services/interviews/interviews';
import type { InterviewSessionListItem } from '@services/interviews/interview.types';
import type { ApiError } from '@services/api/client';
import { formatRole, formatLevel, formatTechStackList } from '../../utils/formatText';
import {
  SessionsContainer,
  SessionsHeader,
  SessionsTitle,
  SessionsList,
  SessionCard,
  SessionCardHeader,
  SessionCardBody,
  SessionInfo,
  SessionInfoItem,
  SessionInfoLabel,
  SessionInfoValue,
  SessionStatus,
  SessionScore,
  SessionDate,
  EmptyState,
  EmptyStateText,
  LoadingSpinner,
  ErrorMessage,
} from './InterviewSessions.styles';

const InterviewSessions: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sessions, setSessions] = useState<InterviewSessionListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await listInterviewSessions();
      setSessions(data);
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      setError(apiError.message || 'Failed to load interview sessions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleSessionClick = (sessionId: string) => {
    navigate(`/interviews/${sessionId}`);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'COMPLETED':
        return '#10b981';
      case 'IN_PROGRESS':
        return '#6366f1';
      case 'CREATED':
        return '#64748b';
      case 'FAILED':
        return '#ef4444';
      case 'CANCELLED':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  if (isLoading) {
    return (
      <SessionsContainer>
        <LoadingSpinner>Loading interview sessions...</LoadingSpinner>
      </SessionsContainer>
    );
  }

  if (error) {
    return (
      <SessionsContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </SessionsContainer>
    );
  }

  return (
    <SessionsContainer>
      <SessionsHeader>
        <SessionsTitle>Interview Sessions</SessionsTitle>
      </SessionsHeader>

      {sessions.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No interview sessions found. Start a new interview to get started!</EmptyStateText>
        </EmptyState>
      ) : (
        <SessionsList>
          {sessions.map((session) => (
            <SessionCard key={session.id} onClick={() => handleSessionClick(session.id)}>
              <SessionCardHeader>
                <SessionStatus $color={getStatusColor(session.status)}>
                  {session.status.replace('_', ' ')}
                </SessionStatus>
                {session.overall_score !== null && (
                  <SessionScore>Score: {session.overall_score}%</SessionScore>
                )}
              </SessionCardHeader>
              <SessionCardBody>
                <SessionInfo>
                  <SessionInfoItem>
                    <SessionInfoLabel>Role</SessionInfoLabel>
                    <SessionInfoValue>{formatRole(session.role)}</SessionInfoValue>
                  </SessionInfoItem>
                  <SessionInfoItem>
                    <SessionInfoLabel>Level</SessionInfoLabel>
                    <SessionInfoValue>{formatLevel(session.level)}</SessionInfoValue>
                  </SessionInfoItem>
                  <SessionInfoItem>
                    <SessionInfoLabel>Tech Stack</SessionInfoLabel>
                    <SessionInfoValue>{formatTechStackList(session.stack)}</SessionInfoValue>
                  </SessionInfoItem>
                </SessionInfo>
                <SessionDate>
                  {session.started_at && `Started: ${formatDate(session.started_at)}`}
                  {session.ended_at && ` • Ended: ${formatDate(session.ended_at)}`}
                </SessionDate>
              </SessionCardBody>
            </SessionCard>
          ))}
        </SessionsList>
      )}
    </SessionsContainer>
  );
};

export default InterviewSessions;

