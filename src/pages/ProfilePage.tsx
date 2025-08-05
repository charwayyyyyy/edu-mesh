import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | null;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in a real app, this would come from an API
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    university: string;
    department: string;
    graduationYear: number;
    hometown: string;
    isVerified: boolean;
    bio: string;
    skills: Skill[];
    education: Education[];
    experience: Experience[];
  } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if this is the current user's profile
        const isSelfProfile = currentUser?.id === id;
        setIsCurrentUser(isSelfProfile);

        // Mock data
        setUser({
          id: id || '1',
          name: 'Kofi Mensah',
          email: 'kofi.mensah@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D8ABC&color=fff',
          university: 'University of Ghana',
          department: 'Computer Science',
          graduationYear: 2022,
          hometown: 'Accra',
          isVerified: true,
          bio: 'Software engineer passionate about building technology solutions for African challenges. I specialize in web development and machine learning applications.',
          skills: [
            { name: 'JavaScript', level: 'expert' },
            { name: 'React', level: 'advanced' },
            { name: 'Python', level: 'intermediate' },
            { name: 'Machine Learning', level: 'beginner' },
            { name: 'UI/UX Design', level: 'intermediate' },
          ],
          education: [
            {
              institution: 'University of Ghana',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              startYear: 2018,
              endYear: 2022,
            },
          ],
          experience: [
            {
              company: 'Tech Ghana',
              position: 'Frontend Developer',
              startDate: '2022-06',
              endDate: null,
              description:
                'Developing and maintaining web applications using React and TypeScript. Working with a team to deliver high-quality software products.',
            },
            {
              company: 'Student Innovation Hub',
              position: 'Intern',
              startDate: '2021-06',
              endDate: '2021-08',
              description:
                'Worked on various projects to improve campus technology. Developed a mobile app for student services.',
            },
          ],
        });
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, currentUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {error || 'Profile not found'}
        </h2>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
      >
        <div className="relative h-48 bg-gradient-to-r from-primary-600 to-secondary-600">
          {isCurrentUser && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          )}
        </div>

        <div className="relative px-4 py-5 sm:px-6 -mt-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&size=96`}
                alt={user.name}
              />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                {user.name}
                {user.isVerified && (
                  <CheckBadgeIcon
                    className="ml-2 h-6 w-6 text-primary-600"
                    title="Verified Alumni"
                    aria-label="Verified Alumni"
                  />
                )}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <div className="flex items-center mr-4">
                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                  {user.experience[0]?.position || 'Student'} at {user.experience[0]?.company || user.university}
                </div>
                <div className="flex items-center mr-4">
                  <AcademicCapIcon className="h-4 w-4 mr-1" />
                  {user.university}, {user.department}
                </div>
                <div className="flex items-center mr-4">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Class of {user.graduationYear}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {user.hometown}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bio</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{user.bio}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skills</h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                    skill.level === 'expert'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : skill.level === 'advanced'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : skill.level === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Education</h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <ul className="space-y-4">
              {user.education.map((edu, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0">
                    <AcademicCapIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {edu.startYear} - {edu.endYear || 'Present'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg lg:col-span-3"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Experience</h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <ul className="space-y-6">
              {user.experience.map((exp, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0">
                    <BriefcaseIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{exp.position}</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{exp.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(exp.startDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Present'}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{exp.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      {!isCurrentUser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Request Mentorship
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Send Message
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;