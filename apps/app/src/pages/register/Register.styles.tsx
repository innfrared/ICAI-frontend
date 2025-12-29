import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RegisterContainer = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #ffffff;
  background-image: radial-gradient(circle, #9ca3af 1px, transparent 1px);
  background-size: 30px 30px;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const RegisterCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 500px;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

export const RegisterTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const RegisterSubtitle = styled.p`
  font-size: 0.9375rem;
  color: #475569;
  margin: 0 0 2rem 0;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
`;

export const RequiredAsterisk = styled.span`
  color: #F44336;
  margin-left: 0.25rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #0f172a;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(30, 41, 59, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const RegisterFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const RegisterLink = styled(Link)`
  color: #1e293b;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0f172a;
    text-decoration: underline;
  }
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 2rem;
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Step = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: ${(props) =>
    props.$isActive || props.$isCompleted ? '#1e293b' : '#e5e7eb'};
  color: ${(props) => (props.$isActive || props.$isCompleted ? '#ffffff' : '#9ca3af')};
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

export const StepConnector = styled.div<{ $isCompleted: boolean }>`
  width: 40px;
  height: 2px;
  background-color: ${(props) => (props.$isCompleted ? '#1e293b' : '#e5e7eb')};
  transition: background-color 0.3s ease;
  align-self: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const BackButton = styled.button`
  flex: 1;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #9ca3af;
    background-color: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NextButton = styled.button`
  flex: 1;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(30, 41, 59, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #0f172a;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.1);
  }
`;
