import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AcademicCapIcon, ClockIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import LearningPath from '../components/learning/LearningPath';

interface LearningPathData {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrolledCount: number;
  category: string;
  tags: string[];
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  progress?: number;
}

const LearningPathsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [learningPaths, setLearningPaths] = useState<LearningPathData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch learning paths from an API
    // For now, we'll use mock data
    setLoading(true);
    setTimeout(() => {
      setLearningPaths([
        {
          id: 'path-1',
          title: 'Introduction to Web Development',
          description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
          level: 'Beginner',
          duration: '8 weeks',
          enrolledCount: 1245,
          category: 'Technology',
          tags: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
          thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          author: {
            name: 'Dr. Kofi Mensah',
            avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D8ABC&color=fff',
            title: 'Senior Web Developer & Instructor'
          },
          progress: 35
        },
        {
          id: 'path-2',
          title: 'Community Health Fundamentals',
          description: 'Explore the principles of community health, public health interventions, and health education.',
          level: 'Beginner',
          duration: '6 weeks',
          enrolledCount: 890,
          category: 'Health',
          tags: ['Public Health', 'Community Health', 'Health Education'],
          thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          author: {
            name: 'Dr. Ama Boateng',
            avatar: 'https://ui-avatars.com/api/?name=Ama+Boateng&background=0D8ABC&color=fff',
            title: 'Public Health Specialist'
          },
          progress: 0
        },
        {
          id: 'path-3',
          title: 'Advanced Data Science with Python',
          description: 'Master advanced data science techniques using Python, including machine learning and data visualization.',
          level: 'Advanced',
          duration: '12 weeks',
          enrolledCount: 567,
          category: 'Technology',
          tags: ['Python', 'Data Science', 'Machine Learning', 'Data Visualization'],
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          author: {
            name: 'Prof. Kwame Nkrumah',
            avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
            title: 'Data Science Professor'
          },
          progress: 0
        },
        {
          id: 'path-4',
          title: 'Sustainable Agriculture Practices',
          description: 'Learn modern sustainable farming techniques, crop management, and agricultural business principles.',
          level: 'Intermediate',
          duration: '10 weeks',
          enrolledCount: 723,
          category: 'Agriculture',
          tags: ['Sustainable Farming', 'Crop Management', 'Agricultural Business'],
          thumbnail: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          author: {
            name: 'Dr. Yaa Asantewaa',
            avatar: 'https://ui-avatars.com/api/?name=Yaa+Asantewaa&background=0D8ABC&color=fff',
            title: 'Agricultural Scientist'
          },
          progress: 0
        },
        {
          id: 'path-5',
          title: 'Business Entrepreneurship',
          description: 'Develop the skills needed to start and grow a successful business in the African context.',
          level: 'Intermediate',
          duration: '8 weeks',
          enrolledCount: 1056,
          category: 'Business',
          tags: ['Entrepreneurship', 'Business Development', 'Marketing', 'Finance'],
          thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          author: {
            name: 'Kofi Annan',
            avatar: 'https://ui-avatars.com/api/?name=Kofi+Annan&background=0D8ABC&color=fff',
            title: 'Business Consultant & Entrepreneur'
          },
          progress: 0
        },
        {
          id: 'path-6',
          title: 'Mobile App Development with React Native',
          description: 'Build cross-platform mobile applications using React Native framework.',
          level: 'Intermediate',
          duration: '10 weeks',
          enrolledCount: 789,
          category: 'Technology',
          tags: ['React Native', 'Mobile Development', 'JavaScript', 'Cross-platform'],
          thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          author: {
            name: 'Efua Sutherland',
            avatar: 'https://ui-avatars.com/api/?name=Efua+Sutherland&background=0D8ABC&color=fff',
            title: 'Mobile App Developer'
          },
          progress: 0
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'technology', name: 'Technology' },
    { id: 'health', name: 'Health' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'business', name: 'Business' },
    { id: 'education', name: 'Education' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           path.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesLevel = selectedLevel === 'all' || 
                        path.level.toLowerCase() === selectedLevel.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const openLearningPath = (pathId: string) => {
    setSelectedPath(pathId);
  };

  const closeLearningPath = () => {
    setSelectedPath(null);
  };

  const selectedPathData = selectedPath ? learningPaths.find(path => path.id === selectedPath) : null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Learning Paths</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover structured learning paths designed to help you master new skills and advance your career.
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search learning paths..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <select
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          
          <select
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPaths.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No learning paths found matching your criteria.</p>
          <button 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map(path => (
            <div key={path.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative h-48">
                <img 
                  src={path.thumbnail} 
                  alt={path.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 m-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    {path.level}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{path.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{path.description}</p>
                
                <div className="flex items-center mb-3">
                  <img 
                    src={path.author.avatar} 
                    alt={path.author.name} 
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{path.author.name}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {path.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {path.tags.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                      +{path.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    <span>{path.enrolledCount.toLocaleString()} enrolled</span>
                  </div>
                </div>
                
                {path.progress !== undefined && path.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Your progress</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 pt-0">
                <button 
                  className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  onClick={() => openLearningPath(path.id)}
                >
                  {path.progress !== undefined && path.progress > 0 ? 'Continue Learning' : 'View Path'}
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Learning Path Detail Modal */}
      {selectedPathData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPathData.title}</h2>
              <button 
                onClick={closeLearningPath}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <LearningPath 
                id={selectedPathData.id}
                title={selectedPathData.title}
                description={selectedPathData.description}
                level={selectedPathData.level}
                duration={selectedPathData.duration}
                author={selectedPathData.author}
                progress={selectedPathData.progress || 0}
                sections={[
                  {
                    id: 'section-1',
                    title: 'Getting Started',
                    completed: false,
                    modules: [
                      {
                        id: 'module-1',
                        title: 'Introduction to the Course',
                        description: 'Overview of what you will learn in this path',
                        duration: '10 min',
                        type: 'video',
                        completed: selectedPathData.progress ? selectedPathData.progress > 10 : false,
                        locked: false
                      },
                      {
                        id: 'module-2',
                        title: 'Setting Up Your Environment',
                        description: 'Prepare your tools and workspace',
                        duration: '20 min',
                        type: 'article',
                        completed: selectedPathData.progress ? selectedPathData.progress > 20 : false,
                        locked: false
                      },
                      {
                        id: 'module-3',
                        title: 'Knowledge Check',
                        description: 'Test your understanding of the basics',
                        duration: '15 min',
                        type: 'quiz',
                        completed: selectedPathData.progress ? selectedPathData.progress > 30 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 20 : true
                      }
                    ]
                  },
                  {
                    id: 'section-2',
                    title: 'Core Concepts',
                    completed: false,
                    modules: [
                      {
                        id: 'module-4',
                        title: 'Fundamental Principles',
                        description: 'Learn the key concepts and principles',
                        duration: '30 min',
                        type: 'video',
                        completed: selectedPathData.progress ? selectedPathData.progress > 40 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 30 : true
                      },
                      {
                        id: 'module-5',
                        title: 'Practical Applications',
                        description: 'See how concepts apply in real-world scenarios',
                        duration: '25 min',
                        type: 'article',
                        completed: selectedPathData.progress ? selectedPathData.progress > 50 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 40 : true
                      },
                      {
                        id: 'module-6',
                        title: 'Hands-on Exercise',
                        description: 'Apply what you\'ve learned in a practical exercise',
                        duration: '45 min',
                        type: 'project',
                        completed: selectedPathData.progress ? selectedPathData.progress > 60 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 50 : true
                      }
                    ]
                  },
                  {
                    id: 'section-3',
                    title: 'Advanced Topics',
                    completed: false,
                    modules: [
                      {
                        id: 'module-7',
                        title: 'Advanced Techniques',
                        description: 'Explore more sophisticated approaches and methods',
                        duration: '40 min',
                        type: 'video',
                        completed: selectedPathData.progress ? selectedPathData.progress > 70 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 60 : true
                      },
                      {
                        id: 'module-8',
                        title: 'Case Studies',
                        description: 'Analyze real-world examples and case studies',
                        duration: '35 min',
                        type: 'article',
                        completed: selectedPathData.progress ? selectedPathData.progress > 80 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 70 : true
                      },
                      {
                        id: 'module-9',
                        title: 'Final Assessment',
                        description: 'Demonstrate your mastery of the subject',
                        duration: '60 min',
                        type: 'quiz',
                        completed: selectedPathData.progress ? selectedPathData.progress > 90 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 80 : true
                      },
                      {
                        id: 'module-10',
                        title: 'Capstone Project',
                        description: 'Create a comprehensive project applying all learned concepts',
                        duration: '120 min',
                        type: 'project',
                        completed: selectedPathData.progress ? selectedPathData.progress >= 100 : false,
                        locked: selectedPathData.progress ? selectedPathData.progress < 90 : true
                      }
                    ]
                  }
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathsPage;