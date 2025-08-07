import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  postedAt: Date;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-0 dark:bg-neutral-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center">
            <BriefcaseIcon className="h-6 w-6 text-brand" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-0">
            <Link to={`/jobs/${job.id}`} className="hover:underline">
              {job.title}
            </Link>
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{job.company}</p>
          <div className="mt-2 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-neutral-700 dark:text-neutral-200 line-clamp-2">{job.description}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {job.postedAt.toLocaleDateString()}
        </span>
        <Link
          to={`/jobs/${job.id}`}
          className="text-sm font-medium text-brand hover:text-brand-dark"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
