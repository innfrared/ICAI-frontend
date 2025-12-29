import { ROLES, LEVELS, TECH_STACKS } from '@services/mockData';

export const formatRole = (role: string): string => {
  const roleOption = ROLES.find((r) => r.value === role);
  return roleOption ? roleOption.label : role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const formatLevel = (level: string): string => {
  const levelOption = LEVELS.find((l) => l.value === level);
  return levelOption ? levelOption.label : level.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

export const formatTechStack = (techStack: string): string => {
  const techOption = TECH_STACKS.find((t) => t.value === techStack);
  return techOption ? techOption.label : techStack.charAt(0).toUpperCase() + techStack.slice(1);
};

export const formatTechStackList = (techStackList: string[]): string => {
  return techStackList.map(formatTechStack).join(', ');
};

