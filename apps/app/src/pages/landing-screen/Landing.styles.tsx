import styled from 'styled-components';

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  background-image: radial-gradient(circle, #9ca3af 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 2.5rem;
  text-align: center;
  line-height: 1.6;
  width: 80vw;
`;

export const StartButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #1e293b;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(30, 41, 59, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(30, 41, 59, 0.4);
    background-color: #0f172a;
  }

  &:active {
    transform: translateY(0);
  }
`;
