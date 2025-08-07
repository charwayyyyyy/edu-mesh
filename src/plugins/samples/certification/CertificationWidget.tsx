import React from 'react';
import { mockCertifications } from '../CertificationPlugin';

const CertificationWidget: React.FC = () => {
  return (
    <div className="bg-neutral-0 dark:bg-neutral-800 rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3 text-neutral-900 dark:text-neutral-0">My Certifications</h3>
      <div className="space-y-3">
        {mockCertifications.map(cert => (
          <div key={cert.id} className="border-b pb-2 border-neutral-200 dark:border-neutral-700">
            <div className="font-medium text-neutral-900 dark:text-neutral-0">{cert.name}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">{cert.issuer}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Issued: {new Date(cert.issueDate).toLocaleDateString()}
              {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 text-sm text-brand hover:text-brand-dark">
        View All Certifications
      </button>
    </div>
  );
};

export default CertificationWidget;
