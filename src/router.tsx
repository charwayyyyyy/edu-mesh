import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import JobBoardPage from './pages/JobBoardPage';
import MentorshipPage from './pages/MentorshipPage';
import CampusChapterPage from './pages/CampusChapterPage';
import SkillExchangePage from './pages/SkillExchangePage';
import ProjectPortfolioPage from './pages/ProjectPortfolioPage';
import OrganizationProfilePage from './pages/OrganizationProfilePage';
import ApplicationTrackerPage from './pages/ApplicationTrackerPage';
import CareerStoriesPage from './pages/CareerStoriesPage';
import CollabMarketplacePage from './pages/CollabMarketplacePage';
import AuthPage from './pages/AuthPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'profile/:id', element: <ProfilePage /> },
      { path: 'jobs', element: <JobBoardPage /> },
      { path: 'mentorship', element: <MentorshipPage /> },
      { path: 'campus/:id', element: <CampusChapterPage /> },
      { path: 'skills', element: <SkillExchangePage /> },
      { path: 'portfolio/:id', element: <ProjectPortfolioPage /> },
      { path: 'organization/:id', element: <OrganizationProfilePage /> },
      { path: 'applications', element: <ApplicationTrackerPage /> },
      { path: 'stories', element: <CareerStoriesPage /> },
      { path: 'collaborate', element: <CollabMarketplacePage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);