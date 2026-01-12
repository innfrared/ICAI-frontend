import styled from 'styled-components';

export const ToggleButton = styled.button<{ $isDarkMode: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid
    ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(15, 23, 42, 0.1)')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  color: #ffffff;

  background: ${(props) =>
    props.$isDarkMode
      ? 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)'
      : 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)'};

  box-shadow: ${(props) =>
    props.$isDarkMode
      ? '0 8px 22px rgba(15, 23, 42, 0.45)'
      : '0 8px 22px rgba(251, 191, 36, 0.4)'};

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: ${(props) =>
      props.$isDarkMode
        ? '0 12px 30px rgba(15, 23, 42, 0.55)'
        : '0 12px 30px rgba(251, 191, 36, 0.55)'};
  }

  &:active {
    transform: translateY(-2px) scale(1.05);
    transition: transform 0.1s;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

export const ToggleIcon = styled.div<{ $isDarkMode: boolean }>`
  width: 24px;
  height: 24px;
  position: relative;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isDarkMode ? 'rotate(10deg)' : 'rotate(0deg)')};
  color: #ffffff;
  
  svg {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
    color: inherit;
    transform: ${(props) => (props.$isDarkMode ? 'scale(0.95)' : 'scale(1)')};
  }

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;

export const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      transform="translate(24 0) scale(-1 1)"
    />
  </svg>
);
