// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university?: string;
  department?: string;
  graduationYear?: number;
  hometown?: string;
  isVerified: boolean;
  skills: Skill[];
  bio?: string;
  education?: Education[];
  experience?: Experience[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startYear: number;
  endYear?: number;
  current?: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

// Job related types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Remote';
  salary?: string;
  applicationDeadline?: string;
  postedBy: string;
  postedAt: string;
  applicants?: string[];
  status: 'Open' | 'Closed' | 'Filled';
}

// Mentorship related types
export interface Mentor {
  id: string;
  userId: string;
  user?: User;
  expertise: string[];
  availability: string;
  mentorshipAreas: string[];
  bio: string;
  rating?: number;
  reviews?: MentorReview[];
  mentees?: string[];
}

export interface MentorReview {
  id: string;
  mentorId: string;
  reviewerId: string;
  reviewer?: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  message: string;
  createdAt: string;
}

// Skill Exchange related types
export interface SkillExchange {
  id: string;
  title: string;
  description: string;
  skillsOffered: string[];
  skillsWanted: string[];
  userId: string;
  user?: User;
  status: 'Open' | 'Closed' | 'In Progress';
  createdAt: string;
  updatedAt?: string;
  responses?: SkillExchangeResponse[];
}

export interface SkillExchangeResponse {
  id: string;
  exchangeId: string;
  userId: string;
  user?: User;
  message: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
}

// Plugin related types
export interface Plugin {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  version: string;
  author: string;
  entryPoint: string;
  settings?: Record<string, any>;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}