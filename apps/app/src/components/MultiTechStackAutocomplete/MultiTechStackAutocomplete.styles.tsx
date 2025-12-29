import styled from 'styled-components';

export const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  box-sizing: border-box;
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

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Option = styled.li<{ $isHighlighted: boolean }>`
  padding: 0.75rem;
  cursor: pointer;
  color: #475569;
  background-color: ${(props) => (props.$isHighlighted ? '#f3f4f6' : '#ffffff')};
  transition: background-color 0.2s ease;
  opacity: 1;

  &:hover {
    background-color: #f3f4f6;
    color: #0f172a;
  }

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

export const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #1e293b;
  color: #ffffff;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &::before {
    content: '×';
  }
`;
