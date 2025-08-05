import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AcademicCapIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorPage = () => {
  const error = useRouteError();
  
  let errorMessage: string;
  let statusText: string = '';
  let status: number | undefined;
  
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText;
    statusText = error.statusText;
    status = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <AcademicCapIcon className="h-16 w-16 text-primary-600" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {status ? `${status} - ${statusText}` : 'Oops!'}
          </h1>
          
          <div className="mt-4 flex justify-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-accent-500" />
          </div>
          
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Sorry, an unexpected error has occurred.
          </p>
          
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {errorMessage}
          </p>
          
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Go back home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;