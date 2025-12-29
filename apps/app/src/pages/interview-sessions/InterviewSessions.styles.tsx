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

export const SessionsContainer = styled.div`
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

export const SessionsHeader = styled.div`
  max-width: 1280px;
  margin: 0 auto 3rem;
  animation: ${popIn} 0.5s ease-out;
  animation-fill-mode: both;
`;

export const SessionsTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const SessionsList = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SessionCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(30, 41, 59, 0.08);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${popIn} 0.5s ease-out;
  animation-fill-mode: both;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.12);
  }
`;

export const SessionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const SessionStatus = styled.span<{ $color: string }>`
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.$color};
  background-color: ${(props) => `${props.$color}15`};
  border-radius: 0.375rem;
  text-transform: capitalize;
`;

export const SessionScore = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
`;

export const SessionCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SessionInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SessionInfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SessionInfoValue = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f172a;
`;

export const SessionDate = styled.div`
  font-size: 0.8125rem;
  color: #64748b;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
`;

export const EmptyState = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
  animation: ${popIn} 0.5s ease-out;
  animation-fill-mode: both;
`;

export const EmptyStateText = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
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
  animation: ${popIn} 0.5s ease-out;
  animation-fill-mode: both;
`;

