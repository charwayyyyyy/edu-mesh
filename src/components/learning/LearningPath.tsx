import { useState } from 'react';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon, BookOpenIcon, AcademicCapIcon, DocumentTextIcon, PlayIcon } from '@heroicons/react/24/outline';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'article' | 'quiz' | 'project';
  completed: boolean;
  locked: boolean;
}

interface Section {
  id: string;
  title: string;
  modules: Module[];
  completed: boolean;
}

interface LearningPathProps {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  progress: number;
  sections: Section[];
}

const LearningPath: React.FC<LearningPathProps> = ({
  title,
  description,
  level,
  duration,
  author,
  progress,
  sections,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0]?.id || '']);
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const openModule = (module: Module) => {
    if (!module.locked) {
      setActiveModule(module);
    }
  };

  const closeModule = () => {
    setActiveModule(null);
  };

  const markModuleComplete = (moduleId: string) => {
    // In a real app, this would call an API to update the user's progress
    console.log(`Marking module ${moduleId} as complete`);
    closeModule();
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayIcon className="h-5 w-5 text-blue-500" />;
      case 'article':
        return <DocumentTextIcon className="h-5 w-5 text-green-500" />;
      case 'quiz':
        return <AcademicCapIcon className="h-5 w-5 text-purple-500" />;
      case 'project':
        return <BookOpenIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                {level}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {duration}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{author.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{author.title}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your progress</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {sections.map((section) => (
          <div key={section.id} className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center">
                {section.completed ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <div className="h-5 w-5 border-2 border-gray-300 dark:border-gray-600 rounded-full mr-2"></div>
                )}
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{section.title}</h3>
              </div>
              <ArrowRightIcon 
                className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.includes(section.id) ? 'rotate-90' : ''}`} 
              />
            </button>
            
            {expandedSections.includes(section.id) && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {section.modules.map((module) => (
                  <button
                    key={module.id}
                    className={`w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${module.locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => openModule(module)}
                    disabled={module.locked}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {module.completed ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : module.locked ? (
                        <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      ) : (
                        getModuleIcon(module.type)
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{module.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{module.description}</p>
                    </div>
                    <div className="flex-shrink-0 ml-3 flex items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{module.duration}</span>
                      {!module.locked && !module.completed && (
                        <ArrowRightIcon className="h-4 w-4 ml-2 text-gray-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Module content modal */}
      {activeModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    {getModuleIcon(activeModule.type)}
                    <span className="ml-2 text-sm font-medium uppercase text-gray-500 dark:text-gray-400">
                      {activeModule.type}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">{activeModule.title}</h2>
                </div>
                <button 
                  onClick={closeModule}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Module content would go here */}
              <div className="py-4">
                {activeModule.type === 'video' && (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <PlayIcon className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                      <span className="ml-2 text-gray-500 dark:text-gray-400">Video Player Placeholder</span>
                    </div>
                  </div>
                )}
                
                {activeModule.type === 'quiz' && (
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2 dark:text-white">Question 1</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">What is the main purpose of this learning path?</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="radio" id="q1-a" name="q1" className="h-4 w-4 text-blue-600" />
                          <label htmlFor="q1-a" className="ml-2 text-gray-700 dark:text-gray-300">To provide theoretical knowledge only</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="q1-b" name="q1" className="h-4 w-4 text-blue-600" />
                          <label htmlFor="q1-b" className="ml-2 text-gray-700 dark:text-gray-300">To offer practical skills and theoretical knowledge</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="q1-c" name="q1" className="h-4 w-4 text-blue-600" />
                          <label htmlFor="q1-c" className="ml-2 text-gray-700 dark:text-gray-300">To entertain students</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2 dark:text-white">Question 2</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">Which of the following is NOT a module type in this learning path?</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="radio" id="q2-a" name="q2" className="h-4 w-4 text-blue-600" />
                          <label htmlFor="q2-a" className="ml-2 text-gray-700 dark:text-gray-300">Video</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="q2-b" name="q2" className="h-4 w-4 text-blue-600" />
                          <label htmlFor="q2-b" className="ml-2 text-gray-700 dark:text-gray-300">Exam</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="q2-c" name="q2" className="h-4 w-4 text-blue-600" />
                          <label htmlFor="q2-c" className="ml-2 text-gray-700 dark:text-gray-300">Project</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeModule.type === 'article' && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
                    <p>Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
                    <h3>Key Concepts</h3>
                    <ul>
                      <li>Concept 1: Lorem ipsum dolor sit amet</li>
                      <li>Concept 2: Consectetur adipiscing elit</li>
                      <li>Concept 3: Nullam euismod, nisl eget aliquam ultricies</li>
                    </ul>
                    <p>Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
                  </div>
                )}
                
                {activeModule.type === 'project' && (
                  <div>
                    <div className="prose dark:prose-invert max-w-none mb-4">
                      <h3>Project Description</h3>
                      <p>In this project, you will apply the concepts you've learned to create a real-world solution. Follow the steps below to complete your project.</p>
                      
                      <h4>Objectives</h4>
                      <ul>
                        <li>Apply theoretical knowledge to a practical scenario</li>
                        <li>Develop problem-solving skills</li>
                        <li>Create a portfolio-worthy project</li>
                      </ul>
                      
                      <h4>Requirements</h4>
                      <ol>
                        <li>Complete the project analysis document</li>
                        <li>Develop the solution based on the provided specifications</li>
                        <li>Test your solution thoroughly</li>
                        <li>Submit your project with documentation</li>
                      </ol>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-750">
                      <h4 className="font-medium mb-2 dark:text-white">Project Submission</h4>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Files</label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <p className="pt-1 text-sm text-gray-500 dark:text-gray-400">Drag and drop files or click to upload</p>
                            </div>
                            <input type="file" className="hidden" multiple />
                          </label>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comments</label>
                        <textarea 
                          className="w-full px-3 py-2 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                          rows={3}
                          placeholder="Add any comments about your project..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={closeModule}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => markModuleComplete(activeModule.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPath;