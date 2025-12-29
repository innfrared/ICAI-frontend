import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #0f172a;
  color: #ffffff;
  margin-top: auto;
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem 1rem 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FooterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
`;

export const FooterLink = styled(Link)`
  font-size: 0.875rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #fde68a;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding: 1.5rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Copyright = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  text-align: center;
  margin: 0;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const SocialLink = styled.a`
  color: #cbd5e1;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:hover {
    color: #fde68a;
    background-color: rgba(253, 230, 138, 0.15);
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
