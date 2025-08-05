import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  UserGroupIcon,
  HeartIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Organization {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  description: string;
  mission?: string;
  vision?: string;
  industry: string;
  size: string;
  founded: string;
  location: string;
  website?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  communityImpact?: string;
  openPositions: {
    id: string;
    title: string;
    type: string;
    location: string;
    isRemote: boolean;
    department: string;
    description: string;
    requirements: string[];
    postedDate: string;
    deadline?: string;
    isCommunityImpact: boolean;
  }[];
  culture: {
    values: string[];
    benefits: string[];
    workEnvironment: string;
  };
  testimonials: {
    id: string;
    name: string;
    avatar?: string;
    position: string;
    university: string;
    text: string;
    rating: number;
  }[];
}

const OrganizationProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const loadOrganization = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock organization data
        const mockOrganization: Organization = {
          id: '1',
          name: 'Ghana Tech Innovations',
          logo: 'https://ui-avatars.com/api/?name=Ghana+Tech+Innovations&background=0D8ABC&color=fff&size=128',
          coverImage: 'https://via.placeholder.com/1200x300?text=Ghana+Tech+Innovations',
          description:
            'Ghana Tech Innovations is a leading technology company focused on developing solutions that address local challenges in Ghana and across Africa. We specialize in mobile applications, web platforms, and data analytics services that empower businesses and communities.',
          mission:
            'To leverage technology to solve pressing challenges in education, healthcare, agriculture, and financial inclusion across Ghana.',
          vision:
            'A Ghana where technology is accessible to all and serves as a catalyst for sustainable development and economic growth.',
          industry: 'Information Technology',
          size: '50-100 employees',
          founded: '2015',
          location: 'Accra, Ghana',
          website: 'https://ghanatechinnovations.example.com',
          socialMedia: {
            linkedin: 'https://linkedin.com/company/ghanatechinnovations',
            twitter: 'https://twitter.com/ghanatechinnov',
            facebook: 'https://facebook.com/ghanatechinnovations',
            instagram: 'https://instagram.com/ghanatechinnovations',
          },
          contactEmail: 'info@ghanatechinnovations.example.com',
          contactPhone: '+233 20 123 4567',
          communityImpact:
            'We are committed to fostering tech talent in Ghana through our annual internship program, coding bootcamps, and partnerships with local universities. Our "Tech for Good" initiative has supported over 20 community projects focused on education and healthcare.',
          openPositions: [
            {
              id: 'pos1',
              title: 'Frontend Developer Intern',
              type: 'Internship',
              location: 'Accra',
              isRemote: false,
              department: 'Engineering',
              description:
                'Join our engineering team to develop user interfaces for our web and mobile applications. You will work closely with experienced developers to implement designs and improve user experience.',
              requirements: [
                'Currently pursuing a degree in Computer Science or related field',
                'Knowledge of HTML, CSS, and JavaScript',
                'Familiarity with React or similar frontend frameworks',
                'Strong problem-solving skills',
                'Good communication skills',
              ],
              postedDate: '2023-05-15',
              deadline: '2023-06-30',
              isCommunityImpact: false,
            },
            {
              id: 'pos2',
              title: 'Data Analyst',
              type: 'Full-time',
              location: 'Accra',
              isRemote: true,
              department: 'Data Science',
              description:
                'Analyze large datasets to extract insights that drive business decisions. Develop data visualization tools and dashboards to communicate findings to stakeholders.',
              requirements: [
                'Bachelor\'s degree in Statistics, Mathematics, Computer Science, or related field',
                'Experience with data analysis tools (Python, R, SQL)',
                'Knowledge of data visualization techniques',
                'Strong analytical and critical thinking skills',
                'Excellent communication skills',
              ],
              postedDate: '2023-05-10',
              deadline: '2023-06-15',
              isCommunityImpact: false,
            },
            {
              id: 'pos3',
              title: 'Community Health Tech Coordinator',
              type: 'Part-time',
              location: 'Kumasi',
              isRemote: false,
              department: 'Community Outreach',
              description:
                'Coordinate our health technology initiatives in rural communities. Train community health workers on using our mobile health applications and collect feedback for product improvement.',
              requirements: [
                'Background in Public Health, Community Development, or related field',
                'Experience working with rural communities',
                'Strong communication and training skills',
                'Basic understanding of technology and mobile applications',
                'Fluency in English and at least one local language',
              ],
              postedDate: '2023-05-20',
              deadline: '2023-06-20',
              isCommunityImpact: true,
            },
          ],
          culture: {
            values: [
              'Innovation and Creativity',
              'Community Impact',
              'Collaboration',
              'Integrity',
              'Continuous Learning',
            ],
            benefits: [
              'Competitive salary',
              'Health insurance',
              'Professional development opportunities',
              'Flexible work arrangements',
              'Team building activities',
            ],
            workEnvironment:
              'We foster a collaborative and inclusive work environment where ideas are valued and innovation is encouraged. Our open office space promotes teamwork, while flexible work policies support work-life balance.',
          },
          testimonials: [
            {
              id: 'test1',
              name: 'Kwame Osei',
              avatar: 'https://ui-avatars.com/api/?name=Kwame+Osei&background=0D8ABC&color=fff',
              position: 'Former Software Engineering Intern',
              university: 'University of Ghana',
              text: 'My internship at Ghana Tech Innovations was an incredible learning experience. I worked on real projects that impacted users, and the mentorship I received helped me grow as a developer. The team was supportive and the culture was amazing.',
              rating: 5,
            },
            {
              id: 'test2',
              name: 'Ama Serwaa',
              avatar: 'https://ui-avatars.com/api/?name=Ama+Serwaa&background=0D8ABC&color=fff',
              position: 'Data Science Intern',
              university: 'Kwame Nkrumah University of Science and Technology',
              text: 'The data science team at GTI gave me the opportunity to work on challenging problems that had real impact on local businesses. I learned how to apply my theoretical knowledge to practical situations and improved my technical skills significantly.',
              rating: 4,
            },
            {
              id: 'test3',
              name: 'Kofi Mensah',
              avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D8ABC&color=fff',
              position: 'Product Management Intern',
              university: 'Ashesi University',
              text: 'Working at Ghana Tech Innovations exposed me to the entire product development lifecycle. I appreciated how the company values innovation and encourages everyone to contribute ideas, regardless of their position or experience level.',
              rating: 5,
            },
          ],
        };

        setOrganization(mockOrganization);
      } catch (err) {
        setError('Failed to load organization details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadOrganization();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading organization profile..." />
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {error || 'Organization not found'}
        </h2>
        <Link
          to="/organizations"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Back to Organizations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/organizations"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Organizations
        </Link>
      </div>

      {/* Organization Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        {/* Cover Image */}
        {organization.coverImage && (
          <div className="h-48 md:h-64 w-full rounded-lg overflow-hidden">
            <img
              src={organization.coverImage}
              alt={`${organization.name} cover`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Organization Info */}
        <div
          className={`${
            organization.coverImage ? '-mt-16 relative z-10' : ''
          } flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 px-4`}
        >
          {/* Logo */}
          <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 shadow-lg">
            <img
              src={organization.logo || `https://ui-avatars.com/api/?name=${organization.name}`}
              alt={organization.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{organization.name}</h1>
            <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
              <span className="flex items-center">
                <BuildingOfficeIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                {organization.industry}
              </span>
              <span className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                {organization.location}
              </span>
              <span className="flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                {organization.size}
              </span>
              {organization.website && (
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <GlobeAltIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Website
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 self-start md:self-end">
            {user && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <HeartIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Follow
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('about')}
            className={`${
              activeTab === 'about'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('positions')}
            className={`${
              activeTab === 'positions'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Open Positions
          </button>
          <button
            onClick={() => setActiveTab('culture')}
            className={`${
              activeTab === 'culture'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Culture & Values
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`${
              activeTab === 'testimonials'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Testimonials
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About Us</h2>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {organization.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mission</h2>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                  <p className="text-gray-700 dark:text-gray-300">{organization.mission}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vision</h2>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                  <p className="text-gray-700 dark:text-gray-300">{organization.vision}</p>
                </div>
              </div>
            </div>

            {organization.communityImpact && (
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Community Impact</h2>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {organization.communityImpact}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  {organization.contactEmail && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                      <dd className="mt-1 text-gray-900 dark:text-white">
                        <a
                          href={`mailto:${organization.contactEmail}`}
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          {organization.contactEmail}
                        </a>
                      </dd>
                    </div>
                  )}

                  {organization.contactPhone && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                      <dd className="mt-1 text-gray-900 dark:text-white">
                        <a
                          href={`tel:${organization.contactPhone}`}
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          {organization.contactPhone}
                        </a>
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{organization.location}</dd>
                  </div>

                  {organization.website && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                      <dd className="mt-1 text-gray-900 dark:text-white">
                        <a
                          href={organization.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          {organization.website.replace(/^https?:\/\//, '')}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                {organization.socialMedia && Object.values(organization.socialMedia).some(Boolean) && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Social Media</h3>
                    <div className="mt-2 flex space-x-4">
                      {organization.socialMedia.linkedin && (
                        <a
                          href={organization.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}

                      {organization.socialMedia.twitter && (
                        <a
                          href={organization.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}

                      {organization.socialMedia.facebook && (
                        <a
                          href={organization.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <span className="sr-only">Facebook</span>
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}

                      {organization.socialMedia.instagram && (
                        <a
                          href={organization.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <span className="sr-only">Instagram</span>
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Open Positions Tab */}
        {activeTab === 'positions' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Open Positions</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {organization.openPositions.length} Available
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                {organization.openPositions.length === 0 ? (
                  <div className="px-4 py-5 sm:px-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No open positions available at the moment.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {organization.openPositions.map((position) => (
                      <li key={position.id}>
                        <div className="px-4 py-5 sm:px-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                {position.title}
                                {position.isCommunityImpact && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                    Community Impact
                                  </span>
                                )}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-x-4 gap-y-2">
                                <span className="flex items-center">
                                  <BriefcaseIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                  {position.type}
                                </span>
                                <span className="flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                  {position.location}
                                  {position.isRemote && ' (Remote)'}
                                </span>
                                <span className="flex items-center">
                                  <BuildingOfficeIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                  {position.department}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                              <Link
                                to={`/jobs/${position.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                View Details
                              </Link>
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Posted: {formatDate(position.postedDate)}
                                {position.deadline && (
                                  <span className="ml-2">
                                    • Deadline: {formatDate(position.deadline)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              {position.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Culture & Values Tab */}
        {activeTab === 'culture' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Work Environment</h2>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <p className="text-gray-700 dark:text-gray-300">{organization.culture.workEnvironment}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Our Values</h2>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                  <ul className="space-y-3">
                    {organization.culture.values.map((value, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Benefits</h2>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                  <ul className="space-y-3">
                    {organization.culture.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Student Testimonials</h2>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                {organization.testimonials.length === 0 ? (
                  <div className="px-4 py-5 sm:px-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No testimonials available at the moment.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {organization.testimonials.map((testimonial) => (
                      <li key={testimonial.id} className="px-4 py-6 sm:px-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-full"
                              src={
                                testimonial.avatar ||
                                `https://ui-avatars.com/api/?name=${testimonial.name}`
                              }
                              alt={testimonial.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {testimonial.name}
                              </h3>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.position} • {testimonial.university}
                            </p>
                            <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                              <p>"{testimonial.text}"</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {user && (
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Share Your Experience</h2>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Have you interned or worked at {organization.name}? Share your experience to help other
                    students.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Write a Testimonial
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrganizationProfilePage;