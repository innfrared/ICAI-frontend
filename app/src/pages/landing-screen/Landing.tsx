import { useNavigate } from 'react-router-dom';
import {
  LandingContainer,
  Title,
  Description,
  StartButton,
} from './Landing.styles';
import { syncData } from '../../utils/syncData';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = async (): Promise<void> => {
    await syncData();
    navigate('/interview-coach');
  };

  return (
    <LandingContainer>
      <Title>Interview Coach</Title>
      <Description>
        Prepare for your next technical interview with our AI-powered coaching platform.
        Get personalized practice questions and feedback tailored to your role and experience level.
      </Description>
      <StartButton onClick={handleStartClick}>
        Start Interview Practice
      </StartButton>
    </LandingContainer>
  );
};

export default Landing;
