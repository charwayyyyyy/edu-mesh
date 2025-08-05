import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { AcademicCapIcon, BriefcaseIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AcademicCapIcon className="h-8 w-8 text-primary-600" />
                </motion.div>
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">EduMesh</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/jobs">
                <BriefcaseIcon className="h-5 w-5 mr-1" />
                Jobs
              </NavLink>
              <NavLink to="/mentorship">
                <UserGroupIcon className="h-5 w-5 mr-1" />
                Mentorship
              </NavLink>
              <NavLink to="/skills">
                <BookOpenIcon className="h-5 w-5 mr-1" />
                Skill Exchange
              </NavLink>
              <NavLink to="/stories">
                <BookOpenIcon className="h-5 w-5 mr-1" />
                Career Stories
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link
                  to={`/profile/${user?.id}`}
                  className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name}
                    alt={user?.name}
                  />
                  <span className="ml-2">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavLink to="/jobs">Jobs</MobileNavLink>
          <MobileNavLink to="/mentorship">Mentorship</MobileNavLink>
          <MobileNavLink to="/skills">Skill Exchange</MobileNavLink>
          <MobileNavLink to="/stories">Career Stories</MobileNavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          {isAuthenticated ? (
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name}
                  alt={user?.name}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email}</div>
              </div>
            </div>
          ) : (
            <div className="px-4">
              <Link
                to="/auth"
                className="block text-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                Sign In
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="mt-3 px-2 space-y-1">
              <Link
                to={`/profile/${user?.id}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Your Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-primary-500 transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary-500 transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
};

export default Navbar;