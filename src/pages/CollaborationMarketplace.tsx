import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  ClockIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Collaboration {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  deadline?: string;
  location: string;
  isVirtual: boolean;
  skills: string[];
  university: string;
  department?: string;
  teamSize: {
    min: number;
    max: number;
    current: number;
  };
  createdDate: string;
  status: 'open' | 'in-progress' | 'completed';
  creator: {
    id: string;
    name: string;
    avatar?: string;
    university: string;
    department?: string;
  };
  members: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  }[];
}

const CollaborationMarketplace = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    university: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock collaboration types
  const collaborationTypes = [
    'Hackathon',
    'Research Project',
    'Competition',
    'Class Project',
    'Startup',
    'Community Service',
    'Creative Project',
    'Other',
  ];

  // Mock categories
  const categories = [
    'Technology',
    'Business',
    'Science',
    'Engineering',
    'Arts',
    'Social Sciences',
    'Healthcare',
    'Education',
    'Environment',
    'Other',
  ];

  // Mock statuses
  const statuses = ['open', 'in-progress', 'completed'];

  // Mock universities
  const universities = [
    'University of Ghana',
    'Kwame Nkrumah University of Science and Technology',
    'University of Cape Coast',
    'Ashesi University',
    'Ghana Institute of Management and Public Administration',
    'Other',
  ];

  useEffect(() => {
    const loadCollaborations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock collaborations data
        const mockCollaborations: Collaboration[] = [
          {
            id: '1',
            title: 'Sustainable Energy Hackathon Team',
            description:
              'Looking for team members to participate in the upcoming National Sustainable Energy Hackathon. We need developers, designers, and energy experts to build a solution for rural energy monitoring.',
            type: 'Hackathon',
            category: 'Technology',
            deadline: '2023-07-15',
            location: 'Accra',
            isVirtual: false,
            skills: ['Web Development', 'UI/UX Design', 'Energy Systems', 'Data Analysis'],
            university: 'University of Ghana',
            department: 'Computer Science',
            teamSize: {
              min: 3,
              max: 5,
              current: 2,
            },
            createdDate: '2023-06-01',
            status: 'open',
            creator: {
              id: '101',
              name: 'Kofi Mensah',
              avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D8ABC&color=fff',
              university: 'University of Ghana',
              department: 'Computer Science',
            },
            members: [
              {
                id: '101',
                name: 'Kofi Mensah',
                avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D8ABC&color=fff',
                role: 'Team Lead',
              },
              {
                id: '102',
                name: 'Ama Serwaa',
                avatar: 'https://ui-avatars.com/api/?name=Ama+Serwaa&background=0D8ABC&color=fff',
                role: 'UI/UX Designer',
              },
            ],
          },
          {
            id: '2',
            title: 'Agricultural Market Analysis Research',
            description:
              'Seeking collaborators for a research project analyzing agricultural markets in Ghana. We will collect data from local markets, interview farmers, and develop policy recommendations.',
            type: 'Research Project',
            category: 'Business',
            deadline: '2023-08-30',
            location: 'Kumasi',
            isVirtual: false,
            skills: ['Market Research', 'Data Analysis', 'Agriculture Knowledge', 'Report Writing'],
            university: 'Kwame Nkrumah University of Science and Technology',
            department: 'Agricultural Economics',
            teamSize: {
              min: 4,
              max: 6,
              current: 3,
            },
            createdDate: '2023-05-15',
            status: 'open',
            creator: {
              id: '103',
              name: 'Kwame Nkrumah',
              avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
              university: 'Kwame Nkrumah University of Science and Technology',
              department: 'Agricultural Economics',
            },
            members: [
              {
                id: '103',
                name: 'Kwame Nkrumah',
                avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
                role: 'Research Lead',
              },
              {
                id: '104',
                name: 'Abena Poku',
                avatar: 'https://ui-avatars.com/api/?name=Abena+Poku&background=0D8ABC&color=fff',
                role: 'Data Analyst',
              },
              {
                id: '105',
                name: 'Yaw Mensah',
                avatar: 'https://ui-avatars.com/api/?name=Yaw+Mensah&background=0D8ABC&color=fff',
                role: 'Field Researcher',
              },
            ],
          },
          {
            id: '3',
            title: 'Mobile Health App Development',
            description:
              'Building a mobile app to connect rural communities with healthcare providers. Looking for mobile developers, healthcare professionals, and UI/UX designers.',
            type: 'Class Project',
            category: 'Healthcare',
            deadline: '2023-07-30',
            location: 'Online',
            isVirtual: true,
            skills: ['Mobile Development', 'Healthcare Knowledge', 'UI/UX Design'],
            university: 'University of Cape Coast',
            department: 'Health Sciences',
            teamSize: {
              min: 3,
              max: 5,
              current: 2,
            },
            createdDate: '2023-06-10',
            status: 'open',
            creator: {
              id: '106',
              name: 'Efua Dadzie',
              avatar: 'https://ui-avatars.com/api/?name=Efua+Dadzie&background=0D8ABC&color=fff',
              university: 'University of Cape Coast',
              department: 'Health Sciences',
            },
            members: [
              {
                id: '106',
                name: 'Efua Dadzie',
                avatar: 'https://ui-avatars.com/api/?name=Efua+Dadzie&background=0D8ABC&color=fff',
                role: 'Project Manager',
              },
              {
                id: '107',
                name: 'Kwesi Amissah',
                avatar: 'https://ui-avatars.com/api/?name=Kwesi+Amissah&background=0D8ABC&color=fff',
                role: 'Mobile Developer',
              },
            ],
          },
          {
            id: '4',
            title: 'Business Plan Competition Team',
            description:
              'Forming a team for the National Business Plan Competition. We have a concept for a sustainable fashion brand using local materials. Need business students, designers, and marketing experts.',
            type: 'Competition',
            category: 'Business',
            deadline: '2023-08-15',
            location: 'Accra',
            isVirtual: false,
            skills: ['Business Planning', 'Financial Modeling', 'Fashion Design', 'Marketing'],
            university: 'Ashesi University',
            department: 'Business Administration',
            teamSize: {
              min: 3,
              max: 4,
              current: 1,
            },
            createdDate: '2023-06-20',
            status: 'open',
            creator: {
              id: '108',
              name: 'Akua Mansa',
              avatar: 'https://ui-avatars.com/api/?name=Akua+Mansa&background=0D8ABC&color=fff',
              university: 'Ashesi University',
              department: 'Business Administration',
            },
            members: [
              {
                id: '108',
                name: 'Akua Mansa',
                avatar: 'https://ui-avatars.com/api/?name=Akua+Mansa&background=0D8ABC&color=fff',
                role: 'Team Lead',
              },
            ],
          },
          {
            id: '5',
            title: 'Community Waste Management Project',
            description:
              'Working on a community service project to improve waste management in local neighborhoods. Seeking students interested in environmental sustainability and community engagement.',
            type: 'Community Service',
            category: 'Environment',
            deadline: '2023-09-30',
            location: 'Tamale',
            isVirtual: false,
            skills: ['Project Management', 'Environmental Science', 'Community Outreach'],
            university: 'University of Ghana',
            department: 'Environmental Science',
            teamSize: {
              min: 5,
              max: 10,
              current: 3,
            },
            createdDate: '2023-06-05',
            status: 'open',
            creator: {
              id: '109',
              name: 'Ibrahim Mahama',
              avatar: 'https://ui-avatars.com/api/?name=Ibrahim+Mahama&background=0D8ABC&color=fff',
              university: 'University of Ghana',
              department: 'Environmental Science',
            },
            members: [
              {
                id: '109',
                name: 'Ibrahim Mahama',
                avatar: 'https://ui-avatars.com/api/?name=Ibrahim+Mahama&background=0D8ABC&color=fff',
                role: 'Project Coordinator',
              },
              {
                id: '110',
                name: 'Nana Ama',
                avatar: 'https://ui-avatars.com/api/?name=Nana+Ama&background=0D8ABC&color=fff',
                role: 'Community Liaison',
              },
              {
                id: '111',
                name: 'Kofi Annan',
                avatar: 'https://ui-avatars.com/api/?name=Kofi+Annan&background=0D8ABC&color=fff',
                role: 'Logistics Coordinator',
              },
            ],
          },
          {
            id: '6',
            title: 'Educational Game Development',
            description:
              'Creating an educational game to teach Ghanaian history and culture to primary school students. Looking for game developers, educators, and content creators.',
            type: 'Creative Project',
            category: 'Education',
            deadline: '2023-10-15',
            location: 'Online',
            isVirtual: true,
            skills: ['Game Development', 'Education', 'Content Creation', 'Graphic Design'],
            university: 'Ghana Institute of Management and Public Administration',
            department: 'Information Technology',
            teamSize: {
              min: 4,
              max: 6,
              current: 2,
            },
            createdDate: '2023-06-15',
            status: 'open',
            creator: {
              id: '112',
              name: 'Emmanuel Osei',
              avatar: 'https://ui-avatars.com/api/?name=Emmanuel+Osei&background=0D8ABC&color=fff',
              university: 'Ghana Institute of Management and Public Administration',
              department: 'Information Technology',
            },
            members: [
              {
                id: '112',
                name: 'Emmanuel Osei',
                avatar: 'https://ui-avatars.com/api/?name=Emmanuel+Osei&background=0D8ABC&color=fff',
                role: 'Lead Developer',
              },
              {
                id: '113',
                name: 'Akosua Mensah',
                avatar: 'https://ui-avatars.com/api/?name=Akosua+Mensah&background=0D8ABC&color=fff',
                role: 'Education Specialist',
              },
            ],
          },
        ];

        setCollaborations(mockCollaborations);
      } catch (err) {
        setError('Failed to load collaborations. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCollaborations();
  }, []);

  // Filter collaborations based on search term and filters
  const filteredCollaborations = () => {
    return collaborations.filter((collab) => {
      // Search term filter
      const matchesSearch =
        searchTerm === '' ||
        collab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collab.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        collab.creator.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Other filters
      const matchesType = filters.type === '' || collab.type === filters.type;
      const matchesCategory = filters.category === '' || collab.category === filters.category;
      const matchesStatus = filters.status === '' || collab.status === filters.status;
      const matchesUniversity =
        filters.university === '' ||
        collab.university.toLowerCase().includes(filters.university.toLowerCase());

      return matchesSearch && matchesType && matchesCategory && matchesStatus && matchesUniversity;
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      category: '',
      status: '',
      university: '',
    });
    setSearchTerm('');
  };

  const getStatusBadgeClass = (status: string) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading collaborations..." />
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Collaboration Marketplace</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Find teammates for competitions, hackathons, research projects, or creative collaborations.
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
              placeholder="Search by title, description, skills, or creator"
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
              Create Collaboration
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  {collaborationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
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
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
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

      {/* Collaborations List */}
      <div className="space-y-6">
        {filteredCollaborations().length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No collaborations found</h3>
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
          filteredCollaborations().map((collab) => (
            <motion.div
              key={collab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {collab.title}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          collab.status
                        )}`}
                      >
                        {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{collab.type}</span>
                      <span className="mx-1 text-gray-500 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{collab.category}</span>
                    </div>
                  </div>
                  <Link
                    to={`/collaborations/${collab.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {collab.description}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Team & Location
                    </h4>
                    <div className="mt-2 flex items-center">
                      <UserGroupIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {collab.members.length} / {collab.teamSize.max} members
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {collab.location} {collab.isVirtual && '(Virtual)'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      University & Timeline
                    </h4>
                    <div className="mt-2 flex items-center">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                      <span className="text-sm text-gray-900 dark:text-white">{collab.university}</span>
                    </div>
                    {collab.deadline && (
                      <div className="mt-2 flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          Deadline: {formatDate(collab.deadline)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Skills Needed
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {collab.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={
                          collab.creator.avatar ||
                          `https://ui-avatars.com/api/?name=${collab.creator.name}`
                        }
                        alt={collab.creator.name}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {collab.creator.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {collab.creator.university}
                          {collab.creator.department && `, ${collab.creator.department}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Posted {formatDate(collab.createdDate)}
                    </div>
                  </div>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How Collaboration Works</h2>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">1. Find Your Team</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Browse opportunities or create your own collaboration listing. Connect with students across
                different universities who share your interests.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <TagIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">2. Match Skills</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Specify the skills you need or offer. Our platform helps you find the perfect match for your
                project, competition, or initiative.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">3. Collaborate</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Work together on meaningful projects, build your portfolio, and create connections that last
                beyond graduation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CollaborationMarketplace;