import styled from 'styled-components';

const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const Tooltip = styled.div`
  position: absolute;
  top: calc(100% + 10px);
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
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: #0f172a;
  }
`;

export const ModeOptionContainer = styled.div<{ $color: string; $isSelected: boolean }>`
  position: relative;
  flex: 1 1 0;
  height: 40px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
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
