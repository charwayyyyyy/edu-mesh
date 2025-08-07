import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import JobCard, { Job } from '../components/jobs/JobCard';
import { useJobStore } from '../store';

const JobBoard = () => {
  const { jobs, isLoading, error, fetchJobs } = useJobStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock job types
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  // Mock locations
  const locations = ['Accra', 'Kumasi', 'Tamale', 'Cape Coast', 'Remote', 'Other'];

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filters.type === '' || job.type === filters.type;
      const matchesLocation = filters.location === '' || job.location === filters.location;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, searchTerm, filters]);

  const resetFilters = () => {
    setFilters({
      type: '',
      location: '',
    });
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading job listings..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-0 mb-4">{error}</h2>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-0">Job Board</h1>
        <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
          Find internships, part-time jobs, and career opportunities posted by alumni and organizations.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
              placeholder="Search jobs by title, company, or skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            onClick={() => setShowFilters(!showFilters)}
          >
            <AdjustmentsHorizontalIcon className="-ml-1 mr-2 h-5 w-5 text-neutral-400" aria-hidden="true" />
            Filters
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            onClick={() => {}}
          >
            <BriefcaseIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Post a Job
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-brand focus:border-brand sm:text-sm rounded-md"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-brand focus:border-brand sm:text-sm rounded-md"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <BriefcaseIcon className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-lg font-medium text-neutral-900 dark:text-neutral-0">No jobs found</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Try adjusting your search or filter criteria.
            </p>
            <div className="mt-6">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default JobBoard;