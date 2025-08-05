import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  location: string;
  isRemote: boolean;
  type: 'internship' | 'full-time' | 'part-time' | 'contract';
  dateApplied: string;
  status: ApplicationStatus;
  nextStep?: {
    type: 'interview' | 'assessment' | 'follow-up' | 'decision';
    date: string;
    notes?: string;
  };
  notes?: string;
  feedback?: string;
  isCommunityImpact: boolean;
}

const statusColors: Record<ApplicationStatus, { bg: string; text: string; icon: React.ReactNode }> = {
  applied: {
    bg: 'bg-blue-100 dark:bg-blue-900',
    text: 'text-blue-800 dark:text-blue-200',
    icon: <ClockIcon className="h-5 w-5" />,
  },
  interview: {
    bg: 'bg-yellow-100 dark:bg-yellow-900',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: <CalendarIcon className="h-5 w-5" />,
  },
  offer: {
    bg: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-800 dark:text-green-200',
    icon: <CheckCircleIcon className="h-5 w-5" />,
  },
  rejected: {
    bg: 'bg-red-100 dark:bg-red-900',
    text: 'text-red-800 dark:text-red-200',
    icon: <XCircleIcon className="h-5 w-5" />,
  },
  withdrawn: {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-200',
    icon: <TrashIcon className="h-5 w-5" />,
  },
};

const ApplicationTracker = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    withdrawn: 0,
    responseRate: 0,
    successRate: 0,
  });

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockApplications: Application[] = [
          {
            id: '1',
            jobTitle: 'Software Engineering Intern',
            company: 'Ghana Tech Innovations',
            companyLogo: 'https://ui-avatars.com/api/?name=Ghana+Tech+Innovations&background=0D8ABC&color=fff',
            location: 'Accra, Ghana',
            isRemote: false,
            type: 'internship',
            dateApplied: '2023-05-15',
            status: 'interview',
            nextStep: {
              type: 'interview',
              date: '2023-06-05',
              notes: 'Technical interview with the engineering team',
            },
            notes: 'Applied through university career portal. Received confirmation email.',
            isCommunityImpact: false,
          },
          {
            id: '2',
            jobTitle: 'Data Analyst',
            company: 'Ashesi Innovation Hub',
            companyLogo: 'https://ui-avatars.com/api/?name=Ashesi+Innovation&background=5F2EEA&color=fff',
            location: 'Berekuso, Ghana',
            isRemote: true,
            type: 'part-time',
            dateApplied: '2023-05-10',
            status: 'applied',
            notes: 'Submitted portfolio of previous data visualization projects.',
            isCommunityImpact: false,
          },
          {
            id: '3',
            jobTitle: 'Community Health Tech Coordinator',
            company: 'Health Access Ghana',
            companyLogo: 'https://ui-avatars.com/api/?name=Health+Access&background=16A34A&color=fff',
            location: 'Kumasi, Ghana',
            isRemote: false,
            type: 'full-time',
            dateApplied: '2023-04-28',
            status: 'offer',
            nextStep: {
              type: 'decision',
              date: '2023-06-10',
              notes: 'Need to respond to offer by this date',
            },
            notes: 'Went through 3 rounds of interviews. Final interview was with the CEO.',
            feedback: 'Strong communication skills and passion for community health initiatives.',
            isCommunityImpact: true,
          },
          {
            id: '4',
            jobTitle: 'Frontend Developer',
            company: 'Accra Digital Solutions',
            companyLogo: 'https://ui-avatars.com/api/?name=Accra+Digital&background=DC2626&color=fff',
            location: 'Accra, Ghana',
            isRemote: false,
            type: 'full-time',
            dateApplied: '2023-04-15',
            status: 'rejected',
            notes: 'Applied through company website.',
            feedback: 'Looking for candidates with more experience in React and TypeScript.',
            isCommunityImpact: false,
          },
          {
            id: '5',
            jobTitle: 'Project Coordinator Intern',
            company: 'Ghana Education Initiative',
            companyLogo: 'https://ui-avatars.com/api/?name=Ghana+Education&background=F59E0B&color=fff',
            location: 'Tamale, Ghana',
            isRemote: false,
            type: 'internship',
            dateApplied: '2023-05-05',
            status: 'withdrawn',
            notes: 'Withdrew application after receiving another offer.',
            isCommunityImpact: true,
          },
        ];

        setApplications(mockApplications);
        setFilteredApplications(mockApplications);

        // Calculate stats
        const total = mockApplications.length;
        const applied = mockApplications.filter((app) => app.status === 'applied').length;
        const interview = mockApplications.filter((app) => app.status === 'interview').length;
        const offer = mockApplications.filter((app) => app.status === 'offer').length;
        const rejected = mockApplications.filter((app) => app.status === 'rejected').length;
        const withdrawn = mockApplications.filter((app) => app.status === 'withdrawn').length;

        // Response rate: (interviews + offers + rejections) / total
        const responseRate = total > 0 ? ((interview + offer + rejected) / total) * 100 : 0;

        // Success rate: offers / (offers + rejections)
        const successRate = offer + rejected > 0 ? (offer / (offer + rejected)) * 100 : 0;

        setStats({
          total,
          applied,
          interview,
          offer,
          rejected,
          withdrawn,
          responseRate,
          successRate,
        });
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    // Filter applications based on activeFilter and searchQuery
    let filtered = [...applications];

    if (activeFilter !== 'all') {
      filtered = filtered.filter((app) => app.status === activeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(query) ||
          app.company.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query)
      );
    }

    setFilteredApplications(filtered);
  }, [applications, activeFilter, searchQuery]);

  const handleFilterChange = (filter: ApplicationStatus | 'all') => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddApplication = () => {
    setShowAddModal(true);
  };

  const handleEditApplication = (application: Application) => {
    setCurrentApplication(application);
    setShowEditModal(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading your applications..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <AcademicCapIcon className="mx-auto h-16 w-16 text-gray-400" aria-hidden="true" />
          <h2 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            Sign in to track your applications
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create an account or sign in to keep track of your job and internship applications.
          </p>
          <div className="mt-6">
            <a
              href="/auth"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              Application Tracker
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Keep track of your job and internship applications in one place
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={handleAddApplication}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Application
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardDocumentListIcon
                    className="h-6 w-6 text-gray-400 dark:text-gray-300"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Applications
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Active Interviews
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stats.interview}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Response Rate
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stats.responseRate.toFixed(0)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Success Rate
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stats.successRate.toFixed(0)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${activeFilter === 'all' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  All
                </button>
                {Object.entries(statusColors).map(([status, { bg, text, icon }]) => (
                  <button
                    key={status}
                    onClick={() => handleFilterChange(status as ApplicationStatus)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${activeFilter === status ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : `${bg} ${text} hover:bg-opacity-80 dark:hover:bg-opacity-80`}`}
                  >
                    <span className="mr-1.5">{icon}</span>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className="ml-1.5 text-xs">
                      {stats[status as keyof typeof stats] as number}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative rounded-md shadow-sm max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  placeholder="Search applications"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
            <ClipboardDocumentCheckIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No applications found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {applications.length > 0
                ? 'Try adjusting your filters or search query.'
                : 'Get started by adding your first application.'}
            </p>
            {applications.length === 0 && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleAddApplication}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add Application
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredApplications.map((application) => (
                <motion.li
                  key={application.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0 space-x-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            application.companyLogo ||
                            `https://ui-avatars.com/api/?name=${application.company}&background=random`
                          }
                          alt={application.company}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {application.jobTitle}
                          </p>
                          {application.isCommunityImpact && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              Community Impact
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            <span className="font-medium">{application.company}</span>
                          </p>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center">
                            <MapPinIcon className="flex-shrink-0 mr-1 h-4 w-4" aria-hidden="true" />
                            {application.location}
                            {application.isRemote && ' (Remote)'}
                          </p>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center">
                            <BriefcaseIcon className="flex-shrink-0 mr-1 h-4 w-4" aria-hidden="true" />
                            {application.type}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status].bg} ${statusColors[application.status].text}`}
                      >
                        <span className="mr-1">{statusColors[application.status].icon}</span>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </div>
                      <button
                        onClick={() => handleEditApplication(application)}
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                          aria-hidden="true"
                        />
                        Applied on {formatDate(application.dateApplied)}
                      </p>
                    </div>
                    {application.nextStep && (
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <CalendarIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                          aria-hidden="true"
                        />
                        Next: {application.nextStep.type.charAt(0).toUpperCase() + application.nextStep.type.slice(1)} on {formatDate(application.nextStep.date)}
                      </div>
                    )}
                  </div>

                  {(application.notes || application.feedback) && (
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {application.notes && (
                        <p className="line-clamp-1">
                          <span className="font-medium text-gray-900 dark:text-white">Notes:</span> {application.notes}
                        </p>
                      )}
                      {application.feedback && (
                        <p className="line-clamp-1">
                          <span className="font-medium text-gray-900 dark:text-white">Feedback:</span> {application.feedback}
                        </p>
                      )}
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Add Application Modal Placeholder */}
        {showAddModal && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Add New Application
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        This is a placeholder for the add application form. In a real implementation, this
                        would contain a form to add a new application.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setShowAddModal(false)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Application Modal Placeholder */}
        {showEditModal && currentApplication && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Edit Application
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        This is a placeholder for the edit application form. In a real implementation,
                        this would contain a form to edit the application for {currentApplication.jobTitle} at {currentApplication.company}.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setShowEditModal(false)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* How to Use Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
      >
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            How to Make the Most of Your Application Tracker
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Tips to help you stay organized and improve your job search process
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Stay Organized
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                Track all your applications in one place. Add notes about each application to remember key
                details about the position and company.
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Prepare for Interviews
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                Use the next steps feature to keep track of upcoming interviews and assessments. Set
                reminders to prepare adequately for each stage.
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <ChartBarIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Analyze Your Progress
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                Review your application statistics to identify patterns and areas for improvement. Adjust
                your strategy based on your response and success rates.
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <PencilSquareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Learn from Feedback
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                Record feedback from interviews and rejections. Use this information to improve your
                applications, resume, and interview skills for future opportunities.
              </dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationTracker;