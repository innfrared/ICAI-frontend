import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '@services/auth/auth';
import type { ApiError } from '@services/api/client';
import { getCookie } from '../../utils/cookies';
import RoleAutocomplete, { type Role } from '@components/RoleAutocomplete/RoleAutocomplete';
import MultiTechStackAutocomplete, { type TechStack } from '@components/MultiTechStackAutocomplete/MultiTechStackAutocomplete';
import { ROLES, LEVELS, TECH_STACKS, type Level } from '@services/mockData';
import {
  ProfileContainer,
  ProfileCard,
  ProfileTitle,
  ProfileSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  RequiredAsterisk,
  Select,
  ErrorMessage,
  SuccessMessage,
} from './Profile.styles';

const Profile: React.FC = () => {
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '' as Role | '',
    level: '' as Level | '',
    tech_stack: [] as TechStack[],
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const loadProfile = async (): Promise<void> => {
      try {
        setIsLoadingProfile(true);
        const userData = await getUserProfile();
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          email: userData.email || '',
          role: (userData.role as Role) || '',
          level: (userData.level as Level) || '',
          tech_stack: (userData.tech_stack as TechStack[]) || [],
        });
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to load profile');
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleRoleChange = (value: Role): void => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleTechStackChange = (value: TechStack[]): void => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const updatedUser = await updateUserProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        role: formData.role || undefined,
        level: formData.level || undefined,
        tech_stack: formData.tech_stack.length > 0 ? formData.tech_stack : undefined,
      });

      const accessToken = getCookie('accessToken') || '';
      const refreshToken = getCookie('refreshToken') || '';
      authLogin(updatedUser, accessToken, refreshToken);

      setSuccess('Profile updated successfully!');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <ProfileTitle>Loading Profile...</ProfileTitle>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileTitle>My Profile</ProfileTitle>
        <ProfileSubtitle>Manage your account information and preferences</ProfileSubtitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup $delay={0.2}>
            <Label htmlFor="first_name">
              First Name<RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </FormGroup>
          <FormGroup $delay={0.25}>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Doe"
            />
          </FormGroup>
          <FormGroup $delay={0.3}>
            <Label htmlFor="email">
              Email<RequiredAsterisk>*</RequiredAsterisk>
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
          <FormGroup $delay={0.35} $zIndex={1001}>
            <Label htmlFor="role">Role</Label>
            <RoleAutocomplete
              value={formData.role}
              onChange={handleRoleChange}
              options={ROLES}
            />
          </FormGroup>
          <FormGroup $delay={0.4}>
            <Label htmlFor="level">Level</Label>
            <Select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="">Select level</option>
              {LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup $delay={0.45} $zIndex={1000}>
            <Label htmlFor="tech_stack">Tech Stack</Label>
            <MultiTechStackAutocomplete
              value={formData.tech_stack}
              onChange={handleTechStackChange}
              options={TECH_STACKS}
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </SubmitButton>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;

