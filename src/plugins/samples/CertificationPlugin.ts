/**
 * Certification Plugin for EduMesh
 * 
 * This plugin adds certification features to the EduMesh platform, allowing users
 * to track and showcase their professional certifications.
 */

import React from 'react';
import { PluginContext, MenuItem, DashboardWidget, ProfileSection, Skill } from '../index';

// Define the certification types
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

// Mock data for certifications
const mockCertifications: Certification[] = [
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

// Define the certification dashboard widget component
const CertificationWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">My Certifications</h3>
      <div className="space-y-3">
        {mockCertifications.map(cert => (
          <div key={cert.id} className="border-b pb-2">
            <div className="font-medium">{cert.name}</div>
            <div className="text-sm text-gray-600">{cert.issuer}</div>
            <div className="text-xs text-gray-500">
              Issued: {new Date(cert.issueDate).toLocaleDateString()}
              {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-800">
        View All Certifications
      </button>
    </div>
  );
};

// Define the certification profile section component
const CertificationProfileSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Certifications</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          Add Certification
        </button>
      </div>
      
      {mockCertifications.map(cert => (
        <div key={cert.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <h4 className="font-medium">{cert.name}</h4>
              <div className="text-sm text-gray-600">{cert.issuer}</div>
              <div className="text-xs text-gray-500 mt-1">
                Issued: {new Date(cert.issueDate).toLocaleDateString()}
                {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
              </div>
              
              {cert.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {cert.skills.map(skill => (
                    <span key={skill} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-800"
                >
                  Verify
                </a>
              )}
              <button className="text-xs text-gray-500 hover:text-gray-700">
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Plugin initialization function
export const initialize = (context: PluginContext) => {
  console.log('Initializing Certification Plugin...');
  
  // Register menu item
  const menuItem: MenuItem = {
    id: 'certifications',
    label: 'Certifications',
    icon: 'certificate-icon.svg',
    route: '/certifications',
    position: 'sidebar',
    order: 30,
  };
  context.extensionPoints.registerMenuItem(menuItem);
  
  // Register dashboard widget
  const dashboardWidget: DashboardWidget = {
    id: 'certification-widget',
    title: 'My Certifications',
    component: CertificationWidget as any,
    width: 'third',
    height: 'medium',
    order: 20,
  };
  context.extensionPoints.registerDashboardWidget(dashboardWidget);
  
  // Register profile section
  const profileSection: ProfileSection = {
    id: 'certification-section',
    title: 'Certifications',
    component: CertificationProfileSection as any,
    order: 30,
  };
  context.extensionPoints.registerProfileSection(profileSection);
  
  // Register certification-related skills
  const certificationSkills: Skill[] = [
    { id: 'aws', name: 'AWS', category: 'Cloud' },
    { id: 'azure', name: 'Microsoft Azure', category: 'Cloud' },
    { id: 'gcp', name: 'Google Cloud Platform', category: 'Cloud' },
    { id: 'scrum', name: 'Scrum', category: 'Project Management' },
    { id: 'pmp', name: 'PMP', category: 'Project Management' },
    { id: 'cissp', name: 'CISSP', category: 'Security' },
    { id: 'ceh', name: 'Certified Ethical Hacker', category: 'Security' },
  ];
  
  certificationSkills.forEach(skill => {
    context.extensionPoints.registerSkill(skill);
  });
  
  console.log('Certification Plugin initialized successfully');
};

// Plugin cleanup function
export const cleanup = () => {
  console.log('Cleaning up Certification Plugin...');
  // In a real implementation, we would unregister all extensions and clean up resources
};