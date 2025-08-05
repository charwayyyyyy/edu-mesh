import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FolderIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  tags: string[];
  category: string;
  createdDate: string;
  lastUpdated: string;
  endorsements: number;
  comments: number;
  collaborators: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  }[];
  owner: {
    id: string;
    name: string;
    avatar?: string;
    university: string;
    department: string;
  };
}

const ProjectPortfolioPage = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    university: '',
    tag: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock categories
  const categories = [
    'Web Development',
    'Mobile App',
    'Data Science',
    'Design',
    'Research',
    'Business',
    'Engineering',
    'Art & Media',
    'Social Impact',
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

  // Mock popular tags
  const popularTags = [
    'React',
    'Python',
    'Machine Learning',
    'UI/UX',
    'Mobile',
    'Sustainability',
    'Healthcare',
    'Education',
    'Agriculture',
    'Fintech',
  ];

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock projects data
        const mockProjects: Project[] = [
          {
            id: '1',
            title: 'EduConnect - Learning Management System',
            description:
              'A web-based learning management system designed specifically for Ghanaian universities. Features include course management, assignment submission, and virtual classrooms.',
            thumbnailUrl: 'https://via.placeholder.com/300x200?text=EduConnect',
            projectUrl: 'https://educonnect-demo.example.com',
            githubUrl: 'https://github.com/example/educonnect',
            tags: ['React', 'Node.js', 'MongoDB', 'Education', 'Web App'],
            category: 'Web Development',
            createdDate: '2023-03-15',
            lastUpdated: '2023-05-10',
            endorsements: 24,
            comments: 8,
            collaborators: [
              {
                id: '101',
                name: 'Ama Serwaa',
                avatar: 'https://ui-avatars.com/api/?name=Ama+Serwaa&background=0D8ABC&color=fff',
                role: 'Frontend Developer',
              },
              {
                id: '102',
                name: 'Kwame Nkrumah',
                avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
                role: 'Backend Developer',
              },
            ],
            owner: {
              id: '103',
              name: 'Kofi Mensah',
              avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D8ABC&color=fff',
              university: 'University of Ghana',
              department: 'Computer Science',
            },
          },
          {
            id: '2',
            title: 'FarmInsight - Agricultural Data Analytics',
            description:
              'A mobile application that helps farmers track crop growth, predict yields, and optimize resource usage using machine learning algorithms.',
            thumbnailUrl: 'https://via.placeholder.com/300x200?text=FarmInsight',
            projectUrl: 'https://farminsight.example.com',
            githubUrl: 'https://github.com/example/farminsight',
            tags: ['Flutter', 'Python', 'Machine Learning', 'Agriculture', 'Mobile App'],
            category: 'Mobile App',
            createdDate: '2023-02-20',
            lastUpdated: '2023-05-05',
            endorsements: 32,
            comments: 12,
            collaborators: [
              {
                id: '104',
                name: 'Ibrahim Mahama',
                avatar: 'https://ui-avatars.com/api/?name=Ibrahim+Mahama&background=0D8ABC&color=fff',
                role: 'Data Scientist',
              },
            ],
            owner: {
              id: '105',
              name: 'Efua Dadzie',
              avatar: 'https://ui-avatars.com/api/?name=Efua+Dadzie&background=0D8ABC&color=fff',
              university: 'Kwame Nkrumah University of Science and Technology',
              department: 'Agricultural Engineering',
            },
          },
          {
            id: '3',
            title: 'HealthPulse - Community Health Monitoring',
            description:
              'A data visualization platform that tracks health metrics across communities in Ghana, helping identify disease outbreaks and healthcare needs.',
            thumbnailUrl: 'https://via.placeholder.com/300x200?text=HealthPulse',
            projectUrl: 'https://healthpulse.example.com',
            githubUrl: 'https://github.com/example/healthpulse',
            tags: ['React', 'D3.js', 'Firebase', 'Healthcare', 'Data Visualization'],
            category: 'Data Science',
            createdDate: '2023-04-05',
            lastUpdated: '2023-05-15',
            endorsements: 18,
            comments: 6,
            collaborators: [
              {
                id: '106',
                name: 'Dr. Yaa Asantewaa',
                avatar: 'https://ui-avatars.com/api/?name=Yaa+Asantewaa&background=0D8ABC&color=fff',
                role: 'Healthcare Advisor',
              },
              {
                id: '107',
                name: 'Kwesi Amissah',
                avatar: 'https://ui-avatars.com/api/?name=Kwesi+Amissah&background=0D8ABC&color=fff',
                role: 'Data Analyst',
              },
            ],
            owner: {
              id: '108',
              name: 'Abena Poku',
              avatar: 'https://ui-avatars.com/api/?name=Abena+Poku&background=0D8ABC&color=fff',
              university: 'University of Cape Coast',
              department: 'Public Health',
            },
          },
          {
            id: '4',
            title: 'EcoMarket - Sustainable Products Marketplace',
            description:
              'An e-commerce platform connecting artisans who create sustainable, eco-friendly products with environmentally conscious consumers.',
            thumbnailUrl: 'https://via.placeholder.com/300x200?text=EcoMarket',
            projectUrl: 'https://ecomarket.example.com',
            githubUrl: 'https://github.com/example/ecomarket',
            tags: ['React', 'Node.js', 'MongoDB', 'E-commerce', 'Sustainability'],
            category: 'Web Development',
            createdDate: '2023-01-10',
            lastUpdated: '2023-04-28',
            endorsements: 29,
            comments: 15,
            collaborators: [
              {
                id: '109',
                name: 'Akua Mansa',
                avatar: 'https://ui-avatars.com/api/?name=Akua+Mansa&background=0D8ABC&color=fff',
                role: 'UI/UX Designer',
              },
            ],
            owner: {
              id: '110',
              name: 'Fiifi Baidoo',
              avatar: 'https://ui-avatars.com/api/?name=Fiifi+Baidoo&background=0D8ABC&color=fff',
              university: 'Ashesi University',
              department: 'Business Administration',
            },
          },
          {
            id: '5',
            title: 'TransitTrack - Public Transportation App',
            description:
              'A mobile application that tracks public transportation in real-time, helping commuters plan their journeys efficiently in major Ghanaian cities.',
            thumbnailUrl: 'https://via.placeholder.com/300x200?text=TransitTrack',
            projectUrl: 'https://transittrack.example.com',
            githubUrl: 'https://github.com/example/transittrack',
            tags: ['React Native', 'Firebase', 'Google Maps API', 'Transportation', 'Mobile App'],
            category: 'Mobile App',
            createdDate: '2023-03-01',
            lastUpdated: '2023-05-12',
            endorsements: 21,
            comments: 9,
            collaborators: [
              {
                id: '111',
                name: 'Kofi Annan',
                avatar: 'https://ui-avatars.com/api/?name=Kofi+Annan&background=0D8ABC&color=fff',
                role: 'Mobile Developer',
              },
              {
                id: '112',
                name: 'Nana Ama',
                avatar: 'https://ui-avatars.com/api/?name=Nana+Ama&background=0D8ABC&color=fff',
                role: 'UI Designer',
              },
            ],
            owner: {
              id: '113',
              name: 'Emmanuel Osei',
              avatar: 'https://ui-avatars.com/api/?name=Emmanuel+Osei&background=0D8ABC&color=fff',
              university: 'Ghana Institute of Management and Public Administration',
              department: 'Information Technology',
            },
          },
          {
            id: '6',
            title: 'LegalEase - Legal Document Assistant',
            description:
              'An AI-powered tool that helps users understand and create basic legal documents, making legal services more accessible to Ghanaians.',
            thumbnailUrl: 'https://via.placeholder.com/300x200?text=LegalEase',
            projectUrl: 'https://legalease.example.com',
            githubUrl: 'https://github.com/example/legalease',
            tags: ['Python', 'NLP', 'Machine Learning', 'Legal Tech', 'Web App'],
            category: 'Data Science',
            createdDate: '2023-02-15',
            lastUpdated: '2023-04-20',
            endorsements: 15,
            comments: 7,
            collaborators: [
              {
                id: '114',
                name: 'Justice Amankwah',
                avatar: 'https://ui-avatars.com/api/?name=Justice+Amankwah&background=0D8ABC&color=fff',
                role: 'Legal Advisor',
              },
            ],
            owner: {
              id: '115',
              name: 'Akosua Mensah',
              avatar: 'https://ui-avatars.com/api/?name=Akosua+Mensah&background=0D8ABC&color=fff',
              university: 'University of Ghana',
              department: 'Law',
            },
          },
        ];

        setProjects(mockProjects);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on search term and filters
  const filteredProjects = () => {
    return projects.filter((project) => {
      // Search term filter
      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.owner.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Other filters
      const matchesCategory = filters.category === '' || project.category === filters.category;
      const matchesUniversity =
        filters.university === '' ||
        project.owner.university.toLowerCase().includes(filters.university.toLowerCase());
      const matchesTag =
        filters.tag === '' || project.tags.some((tag) => tag.toLowerCase() === filters.tag.toLowerCase());

      return matchesSearch && matchesCategory && matchesUniversity && matchesTag;
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      university: '',
      tag: '',
    });
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading projects..." />
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Portfolios</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Discover and showcase student projects, from class assignments to side hustles and innovations.
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
              placeholder="Search projects by title, description, or tags"
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
              Add Project
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
                <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tag
                </label>
                <select
                  id="tag"
                  name="tag"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.tag}
                  onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                >
                  <option value="">All Tags</option>
                  {popularTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
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

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects().length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No projects found</h3>
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
          filteredProjects().map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg flex flex-col h-full"
            >
              {project.thumbnailUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="px-4 py-5 sm:px-6 flex-grow">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{project.title}</h3>
                <div className="mt-2 flex items-center">
                  <img
                    className="h-8 w-8 rounded-full mr-2"
                    src={
                      project.owner.avatar ||
                      `https://ui-avatars.com/api/?name=${project.owner.name}`
                    }
                    alt={project.owner.name}
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 dark:text-white font-medium">{project.owner.name}</p>
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-gray-500 dark:text-gray-400">
                        {project.owner.university}, {project.owner.department}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="mr-4 flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    {project.endorsements} endorsements
                  </span>
                  <span className="flex items-center">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-400 mr-1" />
                    {project.comments} comments
                  </span>
                </div>

                {project.collaborators.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Collaborators
                    </h4>
                    <div className="mt-1 flex -space-x-2 overflow-hidden">
                      {project.collaborators.map((collaborator) => (
                        <img
                          key={collaborator.id}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                          src={
                            collaborator.avatar ||
                            `https://ui-avatars.com/api/?name=${collaborator.name}`
                          }
                          alt={collaborator.name}
                          title={`${collaborator.name} - ${collaborator.role}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {formatDate(project.lastUpdated)}
                  </span>
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    View Project
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Build Your Portfolio</h2>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <FolderIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">1. Showcase Your Work</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Add projects from class assignments, club activities, or personal initiatives to build your
                professional portfolio.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">2. Collaborate</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Find teammates for projects, hackathons, or competitions. Build connections with students
                across different universities.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                <StarIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">3. Get Recognized</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Receive endorsements from peers and mentors. Build credibility and stand out to potential
                employers or collaborators.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectPortfolioPage;