import { useState } from 'react';
import EventCalendar from '../components/events/EventCalendar';
import { MagnifyingGlassIcon, CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'calendar' | 'featured' | 'upcoming' | 'my-events'>('calendar');

  const featuredEvents = [
    {
      id: 'featured-1',
      title: 'Annual Career Fair',
      date: 'October 15, 2023',
      location: 'Main Campus, Student Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Connect with over 50 employers from various industries looking to recruit EduMesh students and alumni.',
      attendees: 245
    },
    {
      id: 'featured-2',
      title: 'Tech Innovation Summit',
      date: 'November 5-7, 2023',
      location: 'Engineering Building, Conference Hall',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'A three-day summit featuring keynote speakers, workshops, and networking opportunities in the tech industry.',
      attendees: 180
    },
    {
      id: 'featured-3',
      title: 'Community Health Outreach',
      date: 'September 30, 2023',
      location: 'Various Locations in Accra',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Join fellow students in providing health education and basic health services to underserved communities.',
      attendees: 120
    }
  ];

  const upcomingEvents = [
    {
      id: 'upcoming-1',
      title: 'Resume Workshop',
      date: 'Tomorrow, 2:00 PM',
      location: 'Career Center, Room 102',
      category: 'career'
    },
    {
      id: 'upcoming-2',
      title: 'Guest Lecture: Sustainable Agriculture',
      date: 'Sep 28, 4:00 PM',
      location: 'Science Building, Auditorium',
      category: 'academic'
    },
    {
      id: 'upcoming-3',
      title: 'Student Association Mixer',
      date: 'Sep 29, 6:00 PM',
      location: 'Student Center, Main Hall',
      category: 'social'
    },
    {
      id: 'upcoming-4',
      title: 'Mobile App Development Workshop',
      date: 'Oct 2, 3:00 PM',
      location: 'Engineering Lab, Room 305',
      category: 'workshop'
    },
    {
      id: 'upcoming-5',
      title: 'Alumni Networking Event',
      date: 'Oct 5, 5:30 PM',
      location: 'Virtual Meeting',
      category: 'career'
    }
  ];

  const myEvents = [
    {
      id: 'my-1',
      title: 'Resume Workshop',
      date: 'Tomorrow, 2:00 PM',
      location: 'Career Center, Room 102',
      status: 'registered'
    },
    {
      id: 'my-2',
      title: 'Student Association Mixer',
      date: 'Sep 29, 6:00 PM',
      location: 'Student Center, Main Hall',
      status: 'registered'
    },
    {
      id: 'my-3',
      title: 'Tech Innovation Summit',
      date: 'November 5-7, 2023',
      location: 'Engineering Building, Conference Hall',
      status: 'interested'
    }
  ];

  const renderFeaturedEvents = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredEvents.map(event => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">{event.title}</h3>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.attendees} attending</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{event.description}</p>
            </div>
            <div className="p-4 pt-0">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderUpcomingEvents = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {upcomingEvents.map(event => (
            <li key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium dark:text-white">{event.title}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span 
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      event.category === 'academic' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                      event.category === 'career' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                      event.category === 'workshop' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                      event.category === 'social' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMyEvents = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {myEvents.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">You haven't registered for any events yet.</p>
            <button 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              onClick={() => setActiveTab('upcoming')}
            >
              Browse Events
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {myEvents.map(event => (
              <li key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium dark:text-white">{event.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span 
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        event.status === 'registered' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                      }`}
                    >
                      {event.status === 'registered' ? 'Registered' : 'Interested'}
                    </span>
                    {event.status === 'registered' ? (
                      <button className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                        Cancel
                      </button>
                    ) : (
                      <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Events</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover academic, career, and social events happening across the EduMesh community.
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg self-start">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'calendar' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'featured' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'upcoming' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'my-events' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('my-events')}
          >
            My Events
          </button>
        </div>
      </div>

      <div className="mb-8">
        {activeTab === 'calendar' && <EventCalendar />}
        {activeTab === 'featured' && renderFeaturedEvents()}
        {activeTab === 'upcoming' && renderUpcomingEvents()}
        {activeTab === 'my-events' && renderMyEvents()}
      </div>
    </div>
  );
};

export default EventsPage;