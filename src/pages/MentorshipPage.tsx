import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useMentorshipStore, useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Mentor {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  company: string;
  university: string;
  department: string;
  graduationYear: number;
  hometown: string;
  bio: string;
  expertise: string[];
  yearsOfExperience: number;
  availabilityPerWeek: number;
  menteeCount: number;
  rating: number;
  reviewCount: number;
}

const MentorshipPage = () => {
  const { user } = useAuthStore();
  const { mentors, fetchMentors } = useMentorshipStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    expertise: '',
    hometown: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock departments
  const departments = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Medicine',
    'Law',
    'Education',
    'Arts and Humanities',
    'Social Sciences',
    'Agriculture',
    'Other',
  ];

  // Mock expertise areas
  const expertiseAreas = [
    'Software Development',
    'Data Science',
    'Marketing',
    'Finance',
    'Healthcare',
    'Education',
    'Research',
    'Entrepreneurship',
    'Design',
    'Other',
  ];

  // Mock hometowns
  const hometowns = ['Accra', 'Kumasi', 'Tamale', 'Cape Coast', 'Takoradi', 'Other'];

  useEffect(() => {
    const loadMentors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would call the fetchMentors action from the store
        // For now, we'll simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data would be set by the store in a real app
        // Here we're just simulating the store behavior
      } catch (err) {
        setError('Failed to load mentors. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMentors();
  }, [fetchMentors]);

  // Filter mentors based on search term and filters
  const filteredMentors = (): Mentor[] => {
    // Mock mentors data
    const mockMentors: Mentor[] = [
      {
        id: '1',
        name: 'Dr. Kwame Nkrumah',
        avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
        title: 'Senior Software Engineer',
        company: 'Google',
        university: 'University of Ghana',
        department: 'Computer Science',
        graduationYear: 2010,
        hometown: 'Accra',
        bio: 'I help young developers navigate the tech industry and build meaningful careers. Specializing in web technologies and system design.',
        expertise: ['JavaScript', 'React', 'System Design', 'Career Development'],
        yearsOfExperience: 12,
        availabilityPerWeek: 3,
        menteeCount: 15,
        rating: 4.9,
        reviewCount: 28,
      },
      {
        id: '2',
        name: 'Ama Ata Aidoo',
        avatar: 'https://ui-avatars.com/api/?name=Ama+Ata+Aidoo&background=0D8ABC&color=fff',
        title: 'Marketing Director',
        company: 'Unilever Ghana',
        university: 'Kwame Nkrumah University of Science and Technology',
        department: 'Business Administration',
        graduationYear: 2008,
        hometown: 'Kumasi',
        bio: 'Passionate about helping students and young professionals develop their marketing skills and build personal brands that stand out.',
        expertise: ['Digital Marketing', 'Brand Strategy', 'Market Research', 'Content Creation'],
        yearsOfExperience: 14,
        availabilityPerWeek: 2,
        menteeCount: 10,
        rating: 4.8,
        reviewCount: 22,
      },
      {
        id: '3',
        name: 'Dr. Efua Sutherland',
        avatar: 'https://ui-avatars.com/api/?name=Efua+Sutherland&background=0D8ABC&color=fff',
        title: 'Medical Officer',
        company: 'Korle Bu Teaching Hospital',
        university: 'University of Ghana',
        department: 'Medicine',
        graduationYear: 2012,
        hometown: 'Accra',
        bio: 'Dedicated to mentoring medical students and young doctors. I provide guidance on medical career paths, research opportunities, and work-life balance.',
        expertise: ['Medicine', 'Public Health', 'Medical Research', 'Healthcare Management'],
        yearsOfExperience: 10,
        availabilityPerWeek: 2,
        menteeCount: 8,
        rating: 4.7,
        reviewCount: 15,
      },
      {
        id: '4',
        name: 'Kofi Annan',
        avatar: 'https://ui-avatars.com/api/?name=Kofi+Annan&background=0D8ABC&color=fff',
        title: 'Founder & CEO',
        company: 'GreenTech Ghana',
        university: 'Ashesi University',
        department: 'Engineering',
        graduationYear: 2009,
        hometown: 'Tamale',
        bio: 'Entrepreneur with a passion for sustainable technology. I mentor young engineers and entrepreneurs looking to create impact-driven businesses in Africa.',
        expertise: ['Entrepreneurship', 'Renewable Energy', 'Product Development', 'Fundraising'],
        yearsOfExperience: 13,
        availabilityPerWeek: 4,
        menteeCount: 20,
        rating: 4.9,
        reviewCount: 32,
      },
      {
        id: '5',
        name: 'Yaa Asantewaa',
        avatar: 'https://ui-avatars.com/api/?name=Yaa+Asantewaa&background=0D8ABC&color=fff',
        title: 'Lead UX Designer',
        company: 'Microsoft',
        university: 'Kwame Nkrumah University of Science and Technology',
        department: 'Arts and Humanities',
        graduationYear: 2014,
        hometown: 'Kumasi',
        bio: 'I help aspiring designers develop their skills and portfolios. Specializing in user-centered design and creating accessible digital experiences.',
        expertise: ['UX Design', 'UI Design', 'Design Thinking', 'Accessibility'],
        yearsOfExperience: 8,
        availabilityPerWeek: 3,
        menteeCount: 12,
        rating: 4.8,
        reviewCount: 18,
      },
    ];

    return mockMentors.filter((mentor) => {
      // Search term filter
      const matchesSearch =
        searchTerm === '' ||
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      // Other filters
      const matchesDepartment = filters.department === '' || mentor.department === filters.department;
      const matchesExpertise =
        filters.expertise === '' ||
        mentor.expertise.some((skill) => skill.toLowerCase() === filters.expertise.toLowerCase());
      const matchesHometown = filters.hometown === '' || mentor.hometown === filters.hometown;

      return matchesSearch && matchesDepartment && matchesExpertise && matchesHometown;
    });
  };

  const resetFilters = () => {
    setFilters({
      department: '',
      expertise: '',
      hometown: '',
    });
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading mentors..." />
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find a Mentor</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Connect with experienced alumni who can guide you on your career journey.
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
              placeholder="Search mentors by name, title, or expertise"
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
              <UserGroupIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Become a Mentor
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
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                >
                  <option value="">All Departments</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="expertise"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Expertise
                </label>
                <select
                  id="expertise"
                  name="expertise"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.expertise}
                  onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
                >
                  <option value="">All Expertise Areas</option>
                  {expertiseAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="hometown"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Hometown
                </label>
                <select
                  id="hometown"
                  name="hometown"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.hometown}
                  onChange={(e) => setFilters({ ...filters, hometown: e.target.value })}
                >
                  <option value="">All Hometowns</option>
                  {hometowns.map((hometown) => (
                    <option key={hometown} value={hometown}>
                      {hometown}
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

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors().length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No mentors found</h3>
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
          filteredMentors().map((mentor) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg flex flex-col h-full"
            >
              <div className="px-4 py-5 sm:px-6 flex-shrink-0">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={mentor.avatar || `https://ui-avatars.com/api/?name=${mentor.name}`}
                    alt={mentor.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{mentor.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {mentor.title} at {mentor.company}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6 flex-grow">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center">
                    <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {mentor.university}, {mentor.department}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {mentor.yearsOfExperience} years of experience
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{mentor.hometown}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{mentor.bio}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      {mentor.rating} ({mentor.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {mentor.availabilityPerWeek} hrs/week
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Mentoring {mentor.menteeCount} students
                  </span>
                  <Link
                    to={`/mentorship/${mentor.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <ChatBubbleLeftRightIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Connect
                  </Link>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How Mentorship Works</h2>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">1. Find a Mentor</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Browse profiles and find mentors who match your interests, department, or hometown.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">2. Connect</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Send a mentorship request with your goals and what you hope to learn from them.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">3. Grow Together</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Schedule meetings, set goals, and track your progress as you develop your skills and career.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MentorshipPage;