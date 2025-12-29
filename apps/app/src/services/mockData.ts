import { type Mode } from '@components/ModeOption/ModeOption';
import { type Role } from '@components/RoleAutocomplete/RoleAutocomplete';
import { type TechStack } from '@components/MultiTechStackAutocomplete/MultiTechStackAutocomplete';

export type Level = 'JUNIOR_I' | 'JUNIOR_II' | 'MID_I' | 'MID_II' | 'SENIOR';

export interface ModeConfig {
  mode: Mode;
  label: string;
  description: string;
  color: string;
}

export interface RoleOption {
  value: Role;
  label: string;
}

export interface TechStackOption {
  value: TechStack;
  label: string;
}

export interface LevelOption {
  value: Level;
  label: string;
}

export const MODES: ModeConfig[] = [
  {
    mode: 'conversation',
    label: 'Conversation',
    description: 'Engage in a natural, flowing dialogue about technical topics with contextual follow-up questions.',
    color: '#4CAF50',
  },
  {
    mode: 'drilldown',
    label: 'Drilldown',
    description: 'Deep dive into specific technical concepts with progressively detailed questions and explanations.',
    color: '#2196F3',
  },
  {
    mode: 'case',
    label: 'Case',
    description: 'Work through real-world scenarios and case studies to demonstrate problem-solving skills.',
    color: '#9C27B0',
  },
  {
    mode: 'challenge',
    label: 'Challenge',
    description: 'Tackle challenging coding problems and algorithmic puzzles with time constraints.',
    color: '#FF9800',
  },
  {
    mode: 'retrospective',
    label: 'Retrospective',
    description: 'Review and reflect on past interview experiences to identify areas for improvement.',
    color: '#F44336',
  },
];

export const ROLES: RoleOption[] = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'fullstack', label: 'Full Stack Developer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'mobile', label: 'Mobile Developer' },
];

export const TECH_STACKS: TechStackOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

export const LEVELS: LevelOption[] = [
  { value: 'JUNIOR_I', label: 'Junior I' },
  { value: 'JUNIOR_II', label: 'Junior II' },
  { value: 'MID_I', label: 'Mid I' },
  { value: 'MID_II', label: 'Mid II' },
  { value: 'SENIOR', label: 'Senior' },
];
