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

export const PageContainer = styled.div`
  min-height: 100%;
  padding: 4rem 2rem;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  display: flex;
  background-image: radial-gradient(circle, #9ca3af 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: ${popIn} 0.5s ease-out;
  position: relative;
  overflow: visible;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;
  text-align: center;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: 0.1s;
  animation-fill-mode: both;
`;

export const FormGroup = styled.div<{ $delay?: number; $zIndex?: number }>`
  margin-bottom: 1.5rem;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: ${(props) => props.$delay || 0}s;
  animation-fill-mode: both;
  position: relative;
  z-index: ${(props) => props.$zIndex || 'auto'};
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
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

  &:focus {
    outline: none;
    border-color: #9ca3af;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0.5rem;
  width: 100%;
  flex-wrap: nowrap;
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #0f172a;
  color: #ffffff;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3);
  max-width: 250px;
  white-space: normal;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #0f172a;
  }
`;

const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const ModeOptionContainer = styled.div<{ $color: string; $isSelected: boolean }>`
  position: relative;
  flex: 1 1 0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) => 
    props.$isSelected 
      ? props.$color 
      : hexToRgba(props.$color, 0.1)
  };
  border: 2px solid ${(props) => (props.$isSelected ? props.$color : 'transparent')};
  color: ${(props) => (props.$isSelected ? '#ffffff' : props.$color)};
  font-weight: ${(props) => (props.$isSelected ? '600' : '500')};
  font-size: 0.9rem;

  &:hover {
    background-color: ${(props) => props.$color};
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: ${(props) => props.$color};

    ${Tooltip} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const ModeLabel = styled.span`
  font-size: 1rem;
  text-align: center;
  z-index: 1;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 1rem;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(30, 41, 59, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
