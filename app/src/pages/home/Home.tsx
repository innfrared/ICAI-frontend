import { useNavigate } from 'react-router-dom';
import {
  HomeContainer,
  HeroSection,
  Title,
  Description,
  CTAButton,
  FeaturesSection,
  FeatureCard,
  FeatureTitle,
  FeatureDescription,
} from './Home.styles';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = (): void => {
    navigate('/interview-coach');
  };

  return (
    <HomeContainer>
      <HeroSection>
        <Title>Interview Coach</Title>
        <Description>
          Prepare for your next technical interview with our AI-powered coaching platform.
          Get personalized practice questions and feedback tailored to your role and experience level.
        </Description>
        <CTAButton onClick={handleStartClick}>
          Start Interview Practice
        </CTAButton>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>🎯 Personalized Practice</FeatureTitle>
          <FeatureDescription>
            Get questions tailored to your role, level, and tech stack
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>💡 Real-time Feedback</FeatureTitle>
          <FeatureDescription>
            Receive instant feedback and suggestions to improve your answers
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>📊 Track Progress</FeatureTitle>
          <FeatureDescription>
            Monitor your improvement over time with detailed analytics
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;
