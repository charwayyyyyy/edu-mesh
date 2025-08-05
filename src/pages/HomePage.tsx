import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BookOpenIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store';

const HomePage = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block text-primary-600">EduMesh</span>
            <span className="block">Connecting Ghanaian University Communities</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Build your network, find mentors, share skills, and discover opportunities within the Ghanaian university
            ecosystem.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/auth"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Join Now
              </Link>
            ) : (
              <Link
                to={`/profile/${user?.id}`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Profile
              </Link>
            )}
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight">
              Everything you need to succeed
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300">
              Connect with alumni, find mentors, exchange skills, and discover opportunities tailored to your journey.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<UserGroupIcon className="h-8 w-8 text-primary-600" />}
                title="Verified Alumni Profiles"
                description="Connect with authentic alumni profiles linked to university records for credibility and trust."
                link="/mentorship"
                linkText="Find Mentors"
                delay={0.1}
              />

              <FeatureCard
                icon={<ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600" />}
                title="Mentorship Matching"
                description="Find mentors based on shared departments, career paths, or hometowns for personalized guidance."
                link="/mentorship"
                linkText="Explore Mentorship"
                delay={0.2}
              />

              <FeatureCard
                icon={<BookOpenIcon className="h-8 w-8 text-primary-600" />}
                title="Career Stories"
                description="Learn from alumni journeys, including failures and wins, through engaging stories and experiences."
                link="/stories"
                linkText="Read Stories"
                delay={0.3}
              />

              <FeatureCard
                icon={<BriefcaseIcon className="h-8 w-8 text-primary-600" />}
                title="Job Board & Referrals"
                description="Discover job openings posted by alumni, get referrals, and attend virtual career talks."
                link="/jobs"
                linkText="Browse Jobs"
                delay={0.4}
              />

              <FeatureCard
                icon={<AcademicCapIcon className="h-8 w-8 text-primary-600" />}
                title="Campus Chapters"
                description="Join digital hubs for your university, department, or hall to stay connected with your community."
                link="/campus"
                linkText="Find Your Chapter"
                delay={0.5}
              />

              <FeatureCard
                icon={<LightBulbIcon className="h-8 w-8 text-primary-600" />}
                title="Skill Exchange"
                description="Trade skills with peers: 'I'll design your poster if you help me prep for my statistics exam.'"
                link="/skills"
                linkText="Exchange Skills"
                delay={0.6}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 rounded-lg shadow-xl">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-primary-200">Join the EduMesh community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-800"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, link, linkText, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute top-6 left-6">{icon}</div>
      <div className="pt-16">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-300">{description}</p>
        <div className="mt-4">
          <Link
            to={link}
            className="text-base font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {linkText} &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;