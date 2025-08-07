export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

export const mockCertifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2023-01-15',
    expiryDate: '2026-01-15',
    credentialId: 'AWS-123456',
    credentialUrl: 'https://aws.amazon.com/verification',
    skills: ['AWS', 'Cloud Architecture', 'Infrastructure'],
  },
  {
    id: 'cert-2',
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    issueDate: '2022-06-10',
    credentialId: 'PSM-123456',
    credentialUrl: 'https://www.scrum.org/certificates',
    skills: ['Scrum', 'Agile', 'Project Management'],
  },
];
