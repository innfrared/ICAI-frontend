import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LoginContainer,
  LoginCard,
  LoginTitle,
  LoginSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  LoginFooter,
  LoginLink,
} from './Login.styles';
import { login, getUserProfile } from '@services/auth/auth';
import type { ApiError } from '@services/api/client';
import { useAuth } from '../../contexts/AuthContext';
import { setCookie } from '../../utils/cookies';
import { decodeJWT } from '../../utils/jwt';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.access) {
        setCookie('accessToken', response.access, 7);
        if (response.refresh) {
          setCookie('refreshToken', response.refresh, 30);
        }

        let userData;
        try {
          userData = await getUserProfile(response.access);
          console.log('User profile fetched:', userData);
        } catch (profileError) {
          console.warn('User profile endpoint not available, using minimal data from JWT:', profileError);
          const decodedToken = decodeJWT(response.access);
          const userId = decodedToken?.user_id ? parseInt(decodedToken.user_id, 10) : 0;
          userData = {
            id: userId,
            email: formData.email,
          };
        }

        authLogin(userData, response.access, response.refresh);
        
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/home';
        navigate(from, { replace: true });
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Welcome Back</LoginTitle>
        <LoginSubtitle>Sign in to your account to continue</LoginSubtitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
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
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          {error && (
            <FormGroup>
              <div style={{ color: '#F44336', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {error}
              </div>
            </FormGroup>
          )}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </Form>
        <LoginFooter>
          <span>Don't have an account?</span>
          <LoginLink to="/register">Create an account</LoginLink>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
