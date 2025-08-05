import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load components for better performance
const PluginLoader = lazy(() => import('./plugins/PluginLoader'));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <PluginLoader />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;