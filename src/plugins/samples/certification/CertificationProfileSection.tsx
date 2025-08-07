import React from 'react';
import { mockCertifications } from '../CertificationPlugin';

const CertificationProfileSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-0">Certifications</h3>
        <button className="text-sm text-brand hover:text-brand-dark">
          Add Certification
        </button>
      </div>

      {mockCertifications.map(cert => (
        <div key={cert.id} className="bg-neutral-0 dark:bg-neutral-800 rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-0">{cert.name}</h4>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">{cert.issuer}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Issued: {new Date(cert.issueDate).toLocaleDateString()}
                {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
              </div>

              {cert.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {cert.skills.map(skill => (
                    <span key={skill} className="bg-brand-light text-brand-dark text-xs px-2 py-1 rounded">
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
                  className="text-xs text-brand hover:text-brand-dark"
                >
                  Verify
                </a>
              )}
              <button className="text-xs text-neutral-500 hover:text-neutral-700">
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationProfileSection;
