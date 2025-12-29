import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #ffffff;
  background-image: radial-gradient(circle, #9ca3af 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  position: relative;
`;

export const HeroSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #fde68a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: #475569;
  max-width: 600px;
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const CTAButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(30, 41, 59, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FeaturesSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border-color: #d1d5db;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #475569;
  margin: 0;
  line-height: 1.6;
`;
