import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
`;
