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

export const ProfileContainer = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #ffffff;
  background-image: radial-gradient(circle, #9ca3af 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const ProfileCard = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
  border: 1px solid #e5e7eb;
  animation: ${popIn} 0.5s ease-out;
  position: relative;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const ProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  text-align: center;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: 0.1s;
  animation-fill-mode: both;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const ProfileSubtitle = styled.p`
  font-size: 0.9375rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  text-align: center;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: 0.15s;
  animation-fill-mode: both;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div<{ $delay?: number; $zIndex?: number }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: ${(props) => props.$delay || 0}s;
  animation-fill-mode: both;
  position: relative;
  z-index: ${(props) => props.$zIndex || 'auto'};
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #0f172a;
  cursor: pointer;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.1);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 0.5rem;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;

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

export const RequiredAsterisk = styled.span`
  color: #ef4444;
  margin-left: 0.25rem;
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  animation: ${popIn} 0.5s ease-out;
`;

export const SuccessMessage = styled.div`
  padding: 0.75rem 1rem;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  color: #16a34a;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  animation: ${popIn} 0.5s ease-out;
`;

