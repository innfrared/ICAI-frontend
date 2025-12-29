export type InterviewStatus = 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export type InterviewSessionListItem = {
  id: string; // UUID
  role: string;
  position: string;
  level: string;
  stack: string[];
  status: InterviewStatus;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  ended_at: string | null;
  overall_score: number | null;
};

export type InterviewQuestion = {
  id: string; // UUID
  order: number;
  question: string;
  answer: string;
  feedback: string;
  score: number | null;
  meta: Record<string, unknown>;
  asked_at: string;
  answered_at: string | null;
};

export type InterviewSessionDetail = {
  id: string; // UUID
  role: string;
  position: string;
  level: string;
  stack: string[];
  status: InterviewStatus;

  fastapi_session_id: string;

  overall_feedback: string;
  overall_score: number | null;
  overall_meta: Record<string, unknown>;

  created_at: string;
  updated_at: string;
  started_at: string | null;
  ended_at: string | null;

  questions: InterviewQuestion[];
  public_token?: string;
};

export type CreateInterviewSessionRequest = {
  role: string;
  position: string;
  level: string;
  stack?: string[];
};

export type GenerateMoreQuestionsRequest = {
  count: number;
};

export type SubmitInterviewAnswerRequest = {
  question_id: string;
  answer: string;
  check_only?: boolean;
};

export type CompleteInterviewSessionRequest = {
  status: 'COMPLETED';
};

