import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  FormContainer,
  Title,
  FormGroup,
  Label,
  Select,
  RadioGroup,
  SubmitButton,
} from './InterviewCoach.styles';
import ModeOption, { type Mode } from '@components/ModeOption/ModeOption';
import RoleAutocomplete, { type Role } from '@components/RoleAutocomplete/RoleAutocomplete';
import MultiTechStackAutocomplete, { type TechStack } from '@components/MultiTechStackAutocomplete/MultiTechStackAutocomplete';
import { MODES, LEVELS, ROLES, TECH_STACKS, type Level, type LevelOption, type ModeConfig } from '@services/mockData';
import { startInterviewSession } from '@services/interviews/interviews';
import type { ApiError } from '@services/api/client';

interface FormData {
  role: Role | '';
  level: Level | '';
  techStack: TechStack[];
  mode: Mode | '';
}

const InterviewCoach: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    role: '',
    level: '',
    techStack: [],
    mode: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFormData((prev) => ({
      ...prev,
      level: e.target.value as Level,
    }));
  };

  const handleRoleChange = (role: Role): void => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleTechStackChange = (techStack: TechStack[]): void => {
    setFormData((prev) => ({
      ...prev,
      techStack,
    }));
  };

  const handleModeChange = (mode: Mode): void => {
    setFormData((prev) => ({
      ...prev,
      mode,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const session = await startInterviewSession({
        role: formData.role,
        position: formData.mode || formData.role,
        level: formData.level,
        stack: formData.techStack.length > 0 ? formData.techStack : undefined,
      });

      navigate(`/interviews/${session.id}`);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to start interview session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Interview Coach Setup</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup $delay={0.2} $zIndex={1001}>
            <Label htmlFor="role">Select Role</Label>
            <RoleAutocomplete
              value={formData.role}
              onChange={handleRoleChange}
              options={ROLES}
              required
            />
          </FormGroup>

          <FormGroup $delay={0.3}>
            <Label htmlFor="level">Level</Label>
            <Select
              id="level"
              value={formData.level}
              onChange={handleLevelChange}
              required
            >
              <option value="">Choose a level...</option>
              {LEVELS.map((level: LevelOption) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup $delay={0.35} $zIndex={1000}>
            <Label htmlFor="techStack">Tech Stack</Label>
            <MultiTechStackAutocomplete
              value={formData.techStack}
              onChange={handleTechStackChange}
              options={TECH_STACKS}
              required
            />
          </FormGroup>

          <FormGroup $delay={0.4} $zIndex={999}>
            <Label>Mode</Label>
            <RadioGroup>
              {MODES.map((modeConfig: ModeConfig, index: number) => (
                <ModeOption
                  key={modeConfig.mode}
                  mode={modeConfig.mode}
                  label={modeConfig.label}
                  description={modeConfig.description}
                  color={modeConfig.color}
                  isSelected={formData.mode === modeConfig.mode}
                  onChange={() => handleModeChange(modeConfig.mode)}
                  required={index === 0}
                />
              ))}
            </RadioGroup>
          </FormGroup>

          {error && (
            <FormGroup>
              <div style={{ 
                color: '#ef4444', 
                fontSize: '0.875rem', 
                padding: '0.75rem 1rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                marginTop: '0.5rem'
              }}>
                {error}
              </div>
            </FormGroup>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Starting Interview...' : 'Start Interview'}
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default InterviewCoach;
