import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const SessionContainer = styled.div`
  min-height: 100%;
  padding: 4rem 2rem;
  background-color: #ffffff;
  background-image: radial-gradient(circle, #9ca3af 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const SessionHeader = styled.div`
  max-width: 1280px;
  margin: 0 auto 3rem;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(30, 41, 59, 0.15);
  border: 1px solid #e5e7eb;
  animation: ${popIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SessionHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #475569;
  background-color: transparent;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: #9ca3af;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CompleteButton = styled.button`
  padding: 0.625rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SessionInfo = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const QuestionsGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const QuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 2px 8px rgba(30, 41, 59, 0.08);
  border-left: 4px solid #6366f1;
  border-right: 1px solid #e5e7eb;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  animation: ${popIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
    gap: 1.25rem;
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
`;

export const QuestionNumber = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const QuestionText = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.7;
  margin: 0;
  letter-spacing: -0.01em;
  max-width: 100ch;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    line-height: 1.6;
  }
`;

export const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 100%;
`;

export const AnswerTextarea = styled.textarea`
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #0f172a;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
  min-height: 100px;
  max-height: 400px;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.1);
  }

  &:read-only {
    background-color: #f8fafc;
    cursor: default;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const AnswerActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const DictateButton = styled.button<{ $isListening?: boolean }>`
  padding: 0.875rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => (props.$isListening ? '#ffffff' : '#7c3aed')};
  background: ${(props) => (props.$isListening ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)')};
  border: 2px solid ${(props) => (props.$isListening ? '#ef4444' : '#c084fc')};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$isListening ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' : 'linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%)')};
    border-color: ${(props) => (props.$isListening ? '#dc2626' : '#a855f7')};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(124, 58, 237, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SubmitAnswerButton = styled.button`
  padding: 0.875rem 1.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #6366f1;
  background-color: #f0f4ff;
  border: 2px solid #6366f1;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #6366f1;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.875rem 1.5rem;
  }
`;

export const AnswerButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6366f1;
  background-color: #f0f4ff;
  border: 2px solid #6366f1;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: #6366f1;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 0.875rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  background-color: transparent;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: #9ca3af;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FeedbackSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 2px solid #86efac;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
`;

export const FeedbackText = styled.p`
  font-size: 0.875rem;
  color: #059669;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
`;

export const GenerateMoreButton = styled.button`
  max-width: 1280px;
  width: 100%;
  margin: 2rem auto 0;
  display: block;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #6366f1;
  background-color: #f0f4ff;
  border: 2px solid #6366f1;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: #6366f1;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #f3f4f6;
    border-color: #d1d5db;
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
    margin-top: 1.5rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.125rem;
  color: #64748b;
`;

export const ErrorMessage = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  color: #ef4444;
  font-size: 1rem;
  text-align: center;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  padding: 0;

  &:hover:not(:disabled) {
    background-color: #ef4444;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

