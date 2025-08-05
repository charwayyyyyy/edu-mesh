import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useJobStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'volunteer' | 'contract';
  category: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary?: string;
  contactEmail: string;
  postedBy: {
    id: string;
    name: string;
    avatar?: string;
    university: string;
  };
  isCommunityImpact: boolean;
}

const JobBoard = () => {
  const { jobs, fetchJobs } = useJobStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    location: '',
    isCommunityImpact: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock job categories
  const categories = [
    'Technology',
    'Education',
    'Healthcare',
    'Finance',
    'Marketing',
    'Design',
    'Research',
    'Agriculture',
    'NGO',
    'Other',
  ];

  // Mock job types
  const jobTypes = ['full-time', 'part-time', 'internship', 'volunteer', 'contract'];

  // Mock locations
  const locations = ['Accra', 'Kumasi', 'Tamale', 'Cape Coast', 'Remote', 'Other'];

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would call the fetchJobs action from the store
        // For now, we'll simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data would be set by the store in a real app
        // Here we're just simulating the store behavior
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [fetchJobs]);

  // Filter jobs based on search term and filters
  const filteredJobs = (): Job[] => {
    // Mock jobs data
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Ghana',
        location: 'Accra',
        type: 'full-time',
        category: 'Technology',
        postedDate: '2023-05-15',
        deadline: '2023-06-15',
        description:
          'We are looking for a talented Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications.',
        requirements: [
          'Bachelor\'s degree in Computer Science or related field',
          '2+ years of experience with React',
          'Strong JavaScript skills',
          'Experience with responsive design',
        ],
        skills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript'],
        salary: 'GHS 3,000 - 5,000 per month',
        contactEmail: 'careers@techghana.com',
        postedBy: {
          id: '101',
          name: 'Ama Serwaa',
          avatar: 'https://ui-avatars.com/api/?name=Ama+Serwaa&background=0D8ABC&color=fff',
          university: 'University of Ghana',
        },
        isCommunityImpact: false,
      },
      {
        id: '2',
        title: 'Community Health Volunteer',
        company: 'Ghana Health Service',
        location: 'Kumasi',
        type: 'volunteer',
        category: 'Healthcare',
        postedDate: '2023-05-10',
        deadline: '2023-06-10',
        description:
          'Join our team of community health volunteers to help educate local communities about preventive healthcare measures.',
        requirements: [
          'Interest in public health',
          'Good communication skills',
          'Ability to speak local languages',
          'Available for at least 10 hours per week',
        ],
        skills: ['Communication', 'Public Speaking', 'Community Outreach'],
        contactEmail: 'volunteer@ghs.gov.gh',
        postedBy: {
          id: '102',
          name: 'Dr. Kwame Nkrumah',
          avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
          university: 'Kwame Nkrumah University of Science and Technology',
        },
        isCommunityImpact: true,
      },
      {
        id: '3',
        title: 'Data Science Intern',
        company: 'Ashesi Innovation Lab',
        location: 'Accra',
        type: 'internship',
        category: 'Technology',
        postedDate: '2023-05-20',
        deadline: '2023-06-20',
        description:
          'Join our data science team for a 3-month internship. You will work on real-world projects analyzing data to solve local challenges.',
        requirements: [
          'Currently pursuing a degree in Computer Science, Statistics, or related field',
          'Knowledge of Python and data analysis libraries',
          'Strong analytical skills',
          'Interest in applying data science to solve African challenges',
        ],
        skills: ['Python', 'Data Analysis', 'Machine Learning', 'Statistics'],
        salary: 'GHS 1,000 per month',
        contactEmail: 'internships@ashesi.edu.gh',
        postedBy: {
          id: '103',
          name: 'Prof. Yaa Asantewaa',
          avatar: 'https://ui-avatars.com/api/?name=Yaa+Asantewaa&background=0D8ABC&color=fff',
          university: 'Ashesi University',
        },
        isCommunityImpact: false,
      },
      {
        id: '4',
        title: 'Agricultural Research Assistant',
        company: 'Ghana Agricultural Research Institute',
        location: 'Tamale',
        type: 'part-time',
        category: 'Agriculture',
        postedDate: '2023-05-18',
        deadline: '2023-06-18',
        description:
          'Support our research team in conducting field studies on sustainable farming practices in Northern Ghana.',
        requirements: [
          'Background in Agriculture, Environmental Science, or related field',
          'Experience with field research',
          'Ability to travel to rural areas',
          'Knowledge of local farming practices',
        ],
        skills: ['Research', 'Data Collection', 'Field Work', 'Report Writing'],
        salary: 'GHS 1,500 per month',
        contactEmail: 'jobs@gari.org.gh',
        postedBy: {
          id: '104',
          name: 'Ibrahim Mahama',
          avatar: 'https://ui-avatars.com/api/?name=Ibrahim+Mahama&background=0D8ABC&color=fff',
          university: 'University for Development Studies',
        },
        isCommunityImpact: true,
      },
      {
        id: '5',
        title: 'Social Media Manager',
        company: 'Digital Ghana',
        location: 'Remote',
        type: 'contract',
        category: 'Marketing',
        postedDate: '2023-05-22',
        deadline: '2023-06-22',
        description:
          'Manage social media accounts for various clients, creating engaging content and growing their online presence.',
        requirements: [
          'Experience in social media management',
          'Creative content creation skills',
          'Knowledge of social media analytics',
          'Excellent communication skills',
        ],
        skills: ['Social Media', 'Content Creation', 'Analytics', 'Communication'],
        salary: 'GHS 2,500 per month',
        contactEmail: 'careers@digitalghana.com',
        postedBy: {
          id: '105',
          name: 'Efua Dadzie',
          avatar: 'https://ui-avatars.com/api/?name=Efua+Dadzie&background=0D8ABC&color=fff',
          university: 'Ghana Institute of Journalism',
        },
        isCommunityImpact: false,
      },
    ];

    return mockJobs.filter((job) => {
      // Search term filter
      const matchesSearch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      // Other filters
      const matchesType = filters.type === '' || job.type === filters.type;
      const matchesCategory = filters.category === '' || job.category === filters.category;
      const matchesLocation = filters.location === '' || job.location === filters.location;
      const matchesCommunityImpact = !filters.isCommunityImpact || job.isCommunityImpact;

      return matchesSearch && matchesType && matchesCategory && matchesLocation && matchesCommunityImpact;
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'part-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'internship':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'volunteer':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'contract':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      category: '',
      location: '',
      isCommunityImpact: false,
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error}</h2>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Board</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
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
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search jobs by title, company, or skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <AdjustmentsHorizontalIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            Filters
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
            className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
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

              <div className="flex items-center">
                <input
                  id="community-impact"
                  name="community-impact"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={filters.isCommunityImpact}
                  onChange={(e) => setFilters({ ...filters, isCommunityImpact: e.target.checked })}
                />
                <label
                  htmlFor="community-impact"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Community Impact Opportunities
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs().length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No jobs found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
            <div className="mt-6">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          filteredJobs().map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <BuildingOfficeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getJobTypeColor(
                        job.type
                      )}`}
                    >
                      {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                    </span>
                    {job.isCommunityImpact && (
                      <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                        Community Impact
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Posted: {formatDate(job.postedDate)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Deadline: {formatDate(job.deadline)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{job.description}</p>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <img
                    className="h-8 w-8 rounded-full mr-2"
                    src={job.postedBy.avatar || `https://ui-avatars.com/api/?name=${job.postedBy.name}`}
                    alt={job.postedBy.name}
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 dark:text-white font-medium">{job.postedBy.name}</p>
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-gray-500 dark:text-gray-400">{job.postedBy.university}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobBoard;