import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [hometown, setHometown] = useState('');
  const [error, setError] = useState('');

  const { login, register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register({
          name,
          email,
          password,
          university,
          department,
          graduationYear: graduationYear ? parseInt(graduationYear) : undefined,
          hometown,
          isVerified: false,
          skills: [],
        });
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during authentication');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <AcademicCapIcon className="h-16 w-16 text-primary-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
          >
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </motion.p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="university" className="sr-only">
                    University
                  </label>
                  <select
                    id="university"
                    name="university"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  >
                    <option value="">Select University</option>
                    <option value="University of Ghana">University of Ghana</option>
                    <option value="Kwame Nkrumah University of Science and Technology">
                      Kwame Nkrumah University of Science and Technology
                    </option>
                    <option value="University of Cape Coast">University of Cape Coast</option>
                    <option value="University of Education, Winneba">University of Education, Winneba</option>
                    <option value="Ghana Institute of Management and Public Administration">
                      Ghana Institute of Management and Public Administration
                    </option>
                    <option value="Ashesi University">Ashesi University</option>
                    <option value="University of Professional Studies, Accra">
                      University of Professional Studies, Accra
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="sr-only">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="graduationYear" className="sr-only">
                    Graduation Year
                  </label>
                  <input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    min="1950"
                    max="2050"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Graduation Year"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="hometown" className="sr-only">
                    Hometown
                  </label>
                  <input
                    id="hometown"
                    name="hometown"
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Hometown"
                    value={hometown}
                    onChange={(e) => setHometown(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoadingSpinner size="small" color="white" />
              ) : isLogin ? (
                'Sign in'
              ) : (
                'Sign up'
              )}
            </button>
          </div>

          <div className="text-center text-sm">
            <Link to="/" className="font-medium text-primary-600 hover:text-primary-500">
              Back to home
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AuthPage;