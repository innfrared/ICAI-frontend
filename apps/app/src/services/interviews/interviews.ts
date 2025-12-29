import { getCookie } from '../../utils/cookies';
import type {
  InterviewSessionListItem,
  InterviewSessionDetail,
  CreateInterviewSessionRequest,
  GenerateMoreQuestionsRequest,
  SubmitInterviewAnswerRequest,
} from './interview.types';
import type { ApiError } from '../api/client';

export type {
  InterviewStatus,
  InterviewSessionListItem,
  InterviewQuestion,
  InterviewSessionDetail,
  CreateInterviewSessionRequest,
  GenerateMoreQuestionsRequest,
  SubmitInterviewAnswerRequest,
  CompleteInterviewSessionRequest,
} from './interview.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const getAuthToken = (accessToken?: string) =>
    accessToken || getCookie('access') || getCookie('accessToken');
  
const handleJson = async <T>(response: Response, retryCount = 0): Promise<T> => {
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    if (response.status === 401 && retryCount === 0) {
      try {
        const { refreshToken: refreshTokenFn } = await import('../auth/auth');
        const { getCookie, setCookie } = await import('../../utils/cookies');
        
        const refreshTokenValue = getCookie('refreshToken');
        if (refreshTokenValue) {
          const refreshResponse = await refreshTokenFn(refreshTokenValue);
          if (refreshResponse.access) {
            setCookie('accessToken', refreshResponse.access, 7);
            if (refreshResponse.refresh) {
              setCookie('refreshToken', refreshResponse.refresh, 30);
            }
          }
        }
      } catch (refreshError) {
      }
    }
    
    const err: ApiError = {
      status: response.status,
      message: data?.message || data?.detail || 'Request failed',
      errors: data?.errors || {},
    };
    throw err;
  }

  return data as T;
};

const authHeaders = (accessToken?: string) => {
  const token = getAuthToken(accessToken);
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const tokenKey = (sessionId: string) => `interview_token:${sessionId}`;

export const saveInterviewToken = (sessionId: string, token: string): void => {
  localStorage.setItem(tokenKey(sessionId), token);
};

export const getInterviewToken = (sessionId: string): string | null => {
  return localStorage.getItem(tokenKey(sessionId));
};

const interviewTokenHeader = (sessionId: string) => {
  const token = getInterviewToken(sessionId);
  return token ? { 'X-Interview-Token': token } : {};
};

export const listInterviewSessions = async (accessToken?: string) => {
  const response = await fetch(`${API_BASE_URL}/api/interviews/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
    } as HeadersInit,
  });

  return handleJson<InterviewSessionListItem[]>(response);
};

export const startInterviewSession = async (payload: CreateInterviewSessionRequest, accessToken?: string) => {
  const response = await fetch(`${API_BASE_URL}/api/interviews/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
    } as HeadersInit,
    body: JSON.stringify(payload),
  });

  const data = await handleJson<InterviewSessionDetail & { public_token?: string }>(response);

  if (data.public_token) {
    saveInterviewToken(data.id, data.public_token);
  }

  return data as InterviewSessionDetail;
};

export const getInterviewSession = async (sessionId: string, accessToken?: string) => {
  const response = await fetch(`${API_BASE_URL}/api/interviews/${sessionId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
      ...interviewTokenHeader(sessionId),
    } as HeadersInit,
  });

  return handleJson<InterviewSessionDetail>(response);
};

export const generateMoreQuestions = async (
  sessionId: string,
  payload: GenerateMoreQuestionsRequest,
  accessToken?: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/interviews/${sessionId}/generate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
      ...interviewTokenHeader(sessionId),
    } as HeadersInit,
    body: JSON.stringify(payload),
  });

  return handleJson<InterviewSessionDetail>(response);
};

export const submitInterviewAnswer = async (
  sessionId: string,
  payload: SubmitInterviewAnswerRequest,
  accessToken?: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/interviews/${sessionId}/answer/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
      ...interviewTokenHeader(sessionId),
    } as HeadersInit,
    body: JSON.stringify(payload),
  });

  return handleJson<InterviewSessionDetail>(response);
};

export const deleteInterviewQuestion = async (
  sessionId: string,
  questionId: string,
  accessToken?: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/interviews/${sessionId}/questions/${questionId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
      ...interviewTokenHeader(sessionId),
    } as HeadersInit,
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await response.json() : null;
    const err: ApiError = {
      status: response.status,
      message: data?.message || data?.detail || 'Request failed',
      errors: data?.errors || {},
    };
    throw err;
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return getInterviewSession(sessionId, accessToken);
  }

  return handleJson<InterviewSessionDetail>(response);
};

export const completeInterviewSession = async (
  sessionId: string,
  accessToken?: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/interviews/${sessionId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
      ...interviewTokenHeader(sessionId),
    } as HeadersInit,
    body: JSON.stringify({ status: 'COMPLETED' }),
  });

  return handleJson<InterviewSessionDetail>(response);
};
