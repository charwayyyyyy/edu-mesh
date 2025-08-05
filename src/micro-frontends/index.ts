/**
 * Micro-frontend architecture for EduMesh
 * 
 * This module provides the infrastructure for loading and managing micro-frontends
 * within the EduMesh application. Micro-frontends allow different teams to work
 * on separate parts of the application independently.
 */

import { lazy } from 'react';

export interface MicroFrontend {
  id: string;
  name: string;
  description: string;
  entryPoint: string;
  route: string;
  icon?: string;
  permissions?: string[];
  version: string;
  team?: string;
}

// Registry of available micro-frontends
export const microFrontends: MicroFrontend[] = [
  {
    id: 'job-board',
    name: 'Job Board',
    description: 'Browse and apply for job opportunities',
    entryPoint: './JobBoardMFE',
    route: '/jobs',
    icon: 'job-icon.svg',
    version: '1.0.0',
    team: 'Career Services',
  },
  {
    id: 'mentorship',
    name: 'Mentorship',
    description: 'Connect with mentors and mentees',
    entryPoint: './MentorshipMFE',
    route: '/mentorship',
    icon: 'mentorship-icon.svg',
    version: '1.0.0',
    team: 'Student Success',
  },
  {
    id: 'skill-exchange',
    name: 'Skill Exchange',
    description: 'Exchange skills with other students',
    entryPoint: './SkillExchangeMFE',
    route: '/skill-exchange',
    version: '1.0.0',
    team: 'Community Engagement',
  },
];

// Lazy load micro-frontends
export const loadMicroFrontend = (id: string) => {
  const mfe = microFrontends.find(m => m.id === id);
  if (!mfe) {
    throw new Error(`Micro-frontend with id ${id} not found`);
  }
  
  return lazy(() => import(mfe.entryPoint));
};

// Register a new micro-frontend at runtime
export const registerMicroFrontend = (mfe: MicroFrontend) => {
  if (microFrontends.some(m => m.id === mfe.id)) {
    throw new Error(`Micro-frontend with id ${mfe.id} already exists`);
  }
  
  microFrontends.push(mfe);
};

// Get all available micro-frontends
export const getAvailableMicroFrontends = (userPermissions: string[] = []) => {
  return microFrontends.filter(mfe => {
    // If no permissions are required, or user has all required permissions
    if (!mfe.permissions || mfe.permissions.length === 0) {
      return true;
    }
    
    return mfe.permissions.every(permission => userPermissions.includes(permission));
  });
};