import styled from 'styled-components';

export const UserMenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const UserMenuButton = styled.button<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  color: ${(props) => (props.$isOpen ? '#4b5563' : '#9ca3af')};
  background-color: transparent;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  transform: ${(props) => (props.$isOpen ? 'translateY(-1px)' : 'translateY(0)')};
  box-shadow: ${(props) => (props.$isOpen ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none')};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #4b5563;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 180px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(30, 41, 59, 0.15);
  z-index: 1000;
  overflow: hidden;
`;

export const UserMenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  color: ${(props) => (props.$danger ? '#ef4444' : '#475569')};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: inherit;

  &:hover {
    background-color: ${(props) => (props.$danger ? '#fef2f2' : '#f3f4f6')};
  }
  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

export const UserMenuDivider = styled.div`
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.25rem 0;
`;

