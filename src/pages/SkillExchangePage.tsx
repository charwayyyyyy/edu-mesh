import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowsRightLeftIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useSkillExchangeStore, useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface SkillExchange {
  id: string;
  title: string;
  description: string;
  skillOffered: string;
  skillsWanted: string[];
  estimatedHours: number;
  postedDate: string;
  expiryDate: string;
  status: 'open' | 'in-progress' | 'completed';
  postedBy: {
    id: string;
    name: string;
    avatar?: string;
    university: string;
    department: string;
  };
  tags: string[];
}

const SkillExchangePage = () => {
  const { user } = useAuthStore();
  const { exchanges, fetchExchanges } = useSkillExchangeStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    skillCategory: '',
    university: '',
    status: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock skill categories
  const skillCategories = [
    'Programming',
    'Design',
    'Writing',
    'Mathematics',
    'Science',
    'Languages',
    'Music',
    'Art',
    'Business',
    'Other',
  ];

  // Mock universities
  const universities = [
    'University of Ghana',
    'Kwame Nkrumah University of Science and Technology',
    'University of Cape Coast',
    'Ashesi University',
    'Ghana Institute of Management and Public Administration',
    'Other',
  ];

  // Mock statuses
  const statuses = ['open', 'in-progress', 'completed'];

  useEffect(() => {
    const loadExchanges = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would call the fetchExchanges action from the store
        // For now, we'll simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data would be set by the store in a real app
        // Here we're just simulating the store behavior
      } catch (err) {
        setError('Failed to load skill exchanges. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadExchanges();
  }, [fetchExchanges]);

  // Filter exchanges based on search term and filters
  const filteredExchanges = (): SkillExchange[] => {
    // Mock exchanges data
    const mockExchanges: SkillExchange[] = [
      {
        id: '1',
        title: 'Web Development for Graphic Design',
        description:
          'I can help you build a simple website using React and Tailwind CSS. In exchange, I would like help with designing a logo and some UI elements for my project.',
        skillOffered: 'Web Development',
        skillsWanted: ['Graphic Design', 'UI Design'],
        estimatedHours: 10,
        postedDate: '2023-05-15',
        expiryDate: '2023-06-15',
        status: 'open',
        postedBy: {
          id: '101',
          name: 'Kofi Mensah',
          avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D8ABC&color=fff',
          university: 'University of Ghana',
          department: 'Computer Science',
        },
        tags: ['React', 'Tailwind CSS', 'Frontend', 'Logo Design'],
      },
      {
        id: '2',
        title: 'Statistics Tutoring for French Lessons',
        description:
          'I can help you understand statistical concepts and data analysis using R or Python. In exchange, I would like to improve my French language skills.',
        skillOffered: 'Statistics',
        skillsWanted: ['French Language'],
        estimatedHours: 8,
        postedDate: '2023-05-10',
        expiryDate: '2023-06-10',
        status: 'in-progress',
        postedBy: {
          id: '102',
          name: 'Ama Serwaa',
          avatar: 'https://ui-avatars.com/api/?name=Ama+Serwaa&background=0D8ABC&color=fff',
          university: 'Kwame Nkrumah University of Science and Technology',
          department: 'Mathematics',
        },
        tags: ['Statistics', 'R', 'Python', 'Data Analysis', 'French'],
      },
      {
        id: '3',
        title: 'Essay Writing Help for Music Production',
        description:
          'I can help you write and edit academic essays or research papers. In exchange, I would like to learn the basics of music production using FL Studio.',
        skillOffered: 'Academic Writing',
        skillsWanted: ['Music Production'],
        estimatedHours: 12,
        postedDate: '2023-05-20',
        expiryDate: '2023-06-20',
        status: 'open',
        postedBy: {
          id: '103',
          name: 'Kwame Nkrumah',
          avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
          university: 'University of Cape Coast',
          department: 'English',
        },
        tags: ['Academic Writing', 'Research', 'Music', 'FL Studio'],
      },
      {
        id: '4',
        title: 'Mobile App Testing for Math Tutoring',
        description:
          'I need help with calculus and differential equations. In exchange, I can test your mobile app and provide detailed feedback on usability and bugs.',
        skillOffered: 'QA Testing',
        skillsWanted: ['Mathematics Tutoring'],
        estimatedHours: 6,
        postedDate: '2023-05-18',
        expiryDate: '2023-06-18',
        status: 'completed',
        postedBy: {
          id: '104',
          name: 'Efua Dadzie',
          avatar: 'https://ui-avatars.com/api/?name=Efua+Dadzie&background=0D8ABC&color=fff',
          university: 'Ashesi University',
          department: 'Computer Science',
        },
        tags: ['QA', 'Testing', 'Mobile Apps', 'Calculus', 'Mathematics'],
      },
      {
        id: '5',
        title: 'Presentation Skills for Video Editing',
        description:
          'I can help you improve your public speaking and presentation skills. In exchange, I would like to learn video editing using Adobe Premiere Pro.',
        skillOffered: 'Public Speaking',
        skillsWanted: ['Video Editing'],
        estimatedHours: 8,
        postedDate: '2023-05-22',
        expiryDate: '2023-06-22',
        status: 'open',
        postedBy: {
          id: '105',
          name: 'Ibrahim Mahama',
          avatar: 'https://ui-avatars.com/api/?name=Ibrahim+Mahama&background=0D8ABC&color=fff',
          university: 'Ghana Institute of Management and Public Administration',
          department: 'Business Administration',
        },
        tags: ['Public Speaking', 'Presentations', 'Video Editing', 'Adobe Premiere'],
      },
    ];

    return mockExchanges.filter((exchange) => {
      // Search term filter
      const matchesSearch =
        searchTerm === '' ||
        exchange.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exchange.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exchange.skillOffered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exchange.skillsWanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        exchange.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Other filters
      const matchesSkillCategory =
        filters.skillCategory === '' ||
        exchange.skillOffered.toLowerCase().includes(filters.skillCategory.toLowerCase()) ||
        exchange.skillsWanted.some((skill) =>
          skill.toLowerCase().includes(filters.skillCategory.toLowerCase())
        );
      const matchesUniversity =
        filters.university === '' ||
        exchange.postedBy.university.toLowerCase().includes(filters.university.toLowerCase());
      const matchesStatus = filters.status === '' || exchange.status === filters.status;

      return matchesSearch && matchesSkillCategory && matchesUniversity && matchesStatus;
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const resetFilters = () => {
    setFilters({
      skillCategory: '',
      university: '',
      status: '',
    });
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading skill exchanges..." />
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skill Exchange</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Trade your skills with other students. Teach what you know, learn what you don't.
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
              placeholder="Search by title, skills, or tags"
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
          {user && (
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => {}}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create Exchange
            </button>
          )}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="skillCategory"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Skill Category
                </label>
                <select
                  id="skillCategory"
                  name="skillCategory"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.skillCategory}
                  onChange={(e) => setFilters({ ...filters, skillCategory: e.target.value })}
                >
                  <option value="">All Skill Categories</option>
                  {skillCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="university"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  University
                </label>
                <select
                  id="university"
                  name="university"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.university}
                  onChange={(e) => setFilters({ ...filters, university: e.target.value })}
                >
                  <option value="">All Universities</option>
                  {universities.map((university) => (
                    <option key={university} value={university}>
                      {university}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
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

      {/* Exchange Listings */}
      <div className="space-y-6">
        {filteredExchanges().length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <ArrowsRightLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No exchanges found</h3>
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
          filteredExchanges().map((exchange) => (
            <motion.div
              key={exchange.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    {exchange.title}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      exchange.status
                    )}`}
                  >
                    {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exchange.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Offering</h4>
                    <div className="mt-1 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {exchange.skillOffered}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Looking For</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {exchange.skillsWanted.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Commitment</h4>
                    <div className="mt-1 flex items-center">
                      <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Approximately {exchange.estimatedHours} hours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {exchange.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src={
                        exchange.postedBy.avatar ||
                        `https://ui-avatars.com/api/?name=${exchange.postedBy.name}`
                      }
                      alt={exchange.postedBy.name}
                    />
                    <div className="text-sm">
                      <p className="text-gray-900 dark:text-white font-medium">{exchange.postedBy.name}</p>
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-gray-500 dark:text-gray-400">
                          {exchange.postedBy.university}, {exchange.postedBy.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>Posted: {formatDate(exchange.postedDate)}</p>
                    <p>Expires: {formatDate(exchange.expiryDate)}</p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  {exchange.status === 'open' && (
                    <Link
                      to={`/skill-exchange/${exchange.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      Propose Exchange
                    </Link>
                  )}
                  {exchange.status !== 'open' && (
                    <Link
                      to={`/skill-exchange/${exchange.id}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
      >
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How Skill Exchange Works</h2>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">1. Create an Exchange</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Post what skill you can offer and what you want to learn in return.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">2. Find a Match</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Browse exchanges or wait for someone to propose a match with your listing.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <ArrowsRightLeftIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">3. Exchange Skills</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Meet in person or virtually to share knowledge and learn from each other.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">4. Grow Together</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Leave feedback, build your reputation, and continue expanding your skills.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillExchangePage;