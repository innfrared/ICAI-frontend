import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { decodeJWT } from '../../utils/jwt';
import {
  RegisterContainer,
  RegisterCard,
  RegisterTitle,
  RegisterSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  RegisterFooter,
  RegisterLink,
  StepIndicator,
  StepWrapper,
  Step,
  StepConnector,
  ButtonGroup,
  BackButton,
  NextButton,
  Select,
  RequiredAsterisk,
} from './Register.styles';
import { register } from '@services/auth/auth';
import type { ApiError } from '@services/api/client';
import RoleAutocomplete, { type Role } from '@components/RoleAutocomplete/RoleAutocomplete';
import MultiTechStackAutocomplete, { type TechStack } from '@components/MultiTechStackAutocomplete/MultiTechStackAutocomplete';
import { ROLES, LEVELS, TECH_STACKS, type Level } from '@services/mockData';

const TOTAL_STEPS = 3;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '' as Role | '',
    level: '' as Level | '',
    techStack: [] as TechStack[],
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleRoleChange = (role: Role): void => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
    setError('');
  };

  const handleTechStackChange = (techStack: TechStack[]): void => {
    setFormData((prev) => ({
      ...prev,
      techStack,
    }));
    setError('');
  };

  const validateStep = (step: number): boolean => {
    setError('');
    if (step === 1) {
      if (!formData.firstName || !formData.email) {
        setError('Please fill in all required fields');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else if (step === 2) {
      if (!formData.role || !formData.level || formData.techStack.length === 0) {
        setError('Please fill in all fields');
        return false;
      }
    } else if (step === 3) {
      if (!formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }
    }
    return true;
  };

  const handleNext = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handleBack = (): void => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (!validateStep(3)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        role: formData.role,
        level: formData.level,
        tech_stack: formData.techStack,
        password: formData.password,
      });

      if (response.access) {
        const decodedToken = decodeJWT(response.access);
        const userId = decodedToken?.user_id ? parseInt(decodedToken.user_id, 10) : 0;

        const userData = response.user || {
          id: userId,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        };
        authLogin(userData, response.access, response.refresh);
        navigate('/home');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = (): React.ReactElement => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <FormGroup>
              <Label htmlFor="firstName">
                First Name
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">
                Email
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </FormGroup>
          </>
        );
      case 2:
        return (
          <>
            <FormGroup>
              <Label htmlFor="role">Role</Label>
              <RoleAutocomplete
                value={formData.role}
                onChange={handleRoleChange}
                options={ROLES}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="level">Level</Label>
              <Select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Choose a level...</option>
                {LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="techStack">Tech Stack</Label>
              <MultiTechStackAutocomplete
                value={formData.techStack}
                onChange={handleTechStackChange}
                options={TECH_STACKS}
                required
              />
            </FormGroup>
          </>
        );
      case 3:
        return (
          <>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </FormGroup>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterTitle>Create Account</RegisterTitle>
        <RegisterSubtitle>Sign up to get started with Interview Coach</RegisterSubtitle>
        
        <StepIndicator>
          {[1, 2, 3].map((step) => (
            <StepWrapper key={step}>
              <Step
                $isActive={currentStep === step}
                $isCompleted={currentStep > step}
              >
                {currentStep > step ? '✓' : step}
              </Step>
              {step < TOTAL_STEPS && (
                <StepConnector $isCompleted={currentStep > step} />
              )}
            </StepWrapper>
          ))}
        </StepIndicator>

        <Form onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {renderStepContent()}
          
          {error && (
            <FormGroup>
              <div style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {error}
              </div>
            </FormGroup>
          )}

          <ButtonGroup>
            {currentStep > 1 && (
              <BackButton type="button" onClick={handleBack}>
                Back
              </BackButton>
            )}
            {currentStep < TOTAL_STEPS ? (
              <NextButton type="button" onClick={handleNext}>
                Next
              </NextButton>
            ) : (
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </SubmitButton>
            )}
          </ButtonGroup>
        </Form>
        
        <RegisterFooter>
          <span>Already have an account?</span>
          <RegisterLink to="/login">Sign in</RegisterLink>
        </RegisterFooter>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
