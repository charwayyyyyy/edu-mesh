import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizer: string;
  category: 'academic' | 'career' | 'workshop' | 'social' | 'other';
  url?: string;
  imageUrl?: string;
}

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [filter, setFilter] = useState<string>('all');

  // Get current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get first day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    // In a real app, this would fetch events from an API
    // For now, we'll use mock data
    setLoading(true);
    setTimeout(() => {
      setEvents(generateMockEvents(currentDate));
      setLoading(false);
    }, 500);
  }, [currentDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const changeView = (newView: 'month' | 'week' | 'day') => {
    setView(newView);
  };

  const filterEvents = (category: string) => {
    setFilter(category);
  };

  const getEventsForDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear &&
        (filter === 'all' || event.category === filter)
      );
    });
  };

  const renderMonthView = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Render weekday headers
    const weekdayHeaders = weekdays.map(day => (
      <div key={day} className="text-center font-semibold p-2">
        {day}
      </div>
    ));

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday = 
        day === new Date().getDate() && 
        currentMonth === new Date().getMonth() && 
        currentYear === new Date().getFullYear();

      days.push(
        <div 
          key={day} 
          className={`p-2 border border-gray-200 dark:border-gray-700 min-h-[100px] ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        >
          <div className={`text-right ${isToday ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}>{day}</div>
          <div className="mt-1">
            {dayEvents.slice(0, 3).map(event => (
              <div 
                key={event.id} 
                className={`text-xs p-1 mb-1 rounded truncate cursor-pointer ${
                  event.category === 'academic' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                  event.category === 'career' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                  event.category === 'workshop' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                  event.category === 'social' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0">
        {weekdayHeaders}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay);

    return (
      <div className="grid grid-cols-1 gap-4">
        {weekdays.map((weekday, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          const dayEvents = events.filter(event => {
            const eventDate = new Date(event.startDate);
            return (
              eventDate.getDate() === day &&
              eventDate.getMonth() === month &&
              eventDate.getFullYear() === year &&
              (filter === 'all' || event.category === filter)
            );
          });

          const isToday = 
            day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear();

          return (
            <div key={weekday} className="border rounded-lg overflow-hidden dark:border-gray-700">
              <div className={`p-3 ${isToday ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                <h3 className="font-medium">{weekday}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{`${month + 1}/${day}/${year}`}</p>
              </div>
              <div className="p-3">
                {dayEvents.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No events</p>
                ) : (
                  dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className={`p-2 mb-2 rounded cursor-pointer ${
                        event.category === 'academic' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                        event.category === 'career' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                        event.category === 'workshop' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                        event.category === 'social' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm">
                        {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' - '}
                        {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-sm truncate">{event.location}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear() &&
        (filter === 'all' || event.category === filter)
      );
    });

    return (
      <div className="border rounded-lg overflow-hidden dark:border-gray-700">
        <div className="p-4 bg-gray-100 dark:bg-gray-800">
          <h2 className="font-semibold text-lg">
            {currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {hours.map(hour => {
            const hourEvents = dayEvents.filter(event => {
              const eventHour = new Date(event.startDate).getHours();
              return eventHour === hour;
            });

            return (
              <div key={hour} className="flex p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="w-20 text-right pr-4 text-gray-500 dark:text-gray-400">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                <div className="flex-1">
                  {hourEvents.map(event => (
                    <div 
                      key={event.id} 
                      className={`p-2 mb-1 rounded cursor-pointer ${
                        event.category === 'academic' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                        event.category === 'career' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                        event.category === 'workshop' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                        event.category === 'social' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm">
                        {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' - '}
                        {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-sm">{event.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => navigateMonth('next')}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <button 
            onClick={navigateToToday}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            Today
          </button>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => changeView('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => changeView('week')}
            >
              Week
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => changeView('day')}
            >
              Day
            </button>
          </div>
          
          <select
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={filter}
            onChange={(e) => filterEvents(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="academic">Academic</option>
            <option value="career">Career</option>
            <option value="workshop">Workshop</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {view === 'month' && renderMonthView()}
            {view === 'week' && renderWeekView()}
            {view === 'day' && renderDayView()}
          </>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold dark:text-white">{selectedEvent.title}</h3>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {selectedEvent.imageUrl && (
                <div className="mt-4">
                  <img 
                    src={selectedEvent.imageUrl} 
                    alt={selectedEvent.title} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</h4>
                  <p className="dark:text-white">
                    {new Date(selectedEvent.startDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="dark:text-white">
                    {new Date(selectedEvent.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {' - '}
                    {new Date(selectedEvent.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                  <p className="dark:text-white">{selectedEvent.location}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Organizer</h4>
                <p className="dark:text-white">{selectedEvent.organizer}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h4>
                <span 
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    selectedEvent.category === 'academic' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                    selectedEvent.category === 'career' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                    selectedEvent.category === 'workshop' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                    selectedEvent.category === 'social' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
                </span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedEvent.description}</p>
              </div>
              
              {selectedEvent.url && (
                <div className="mt-6">
                  <a 
                    href={selectedEvent.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    More Information
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to generate mock events
function generateMockEvents(date: Date): Event[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const events: Event[] = [];
  const categories: Array<'academic' | 'career' | 'workshop' | 'social' | 'other'> = [
    'academic', 'career', 'workshop', 'social', 'other'
  ];
  
  const eventTitles = {
    academic: [
      'Guest Lecture: AI in Healthcare',
      'Research Symposium',
      'Department Open House',
      'Thesis Defense',
      'Faculty Panel Discussion'
    ],
    career: [
      'Resume Workshop',
      'Industry Networking Event',
      'Job Fair',
      'Interview Skills Workshop',
      'Career Development Seminar'
    ],
    workshop: [
      'Python for Data Science',
      'Grant Writing Workshop',
      'Public Speaking Skills',
      'Design Thinking Workshop',
      'Mobile App Development'
    ],
    social: [
      'Student Association Mixer',
      'Cultural Festival',
      'Alumni Reunion',
      'Game Night',
      'Community Service Day'
    ],
    other: [
      'Campus Tour',
      'Wellness Day',
      'Book Club Meeting',
      'Sustainability Initiative',
      'Tech Showcase'
    ]
  };
  
  const locations = [
    'Main Auditorium',
    'Science Building, Room 101',
    'Student Center',
    'Library Conference Room',
    'Engineering Lab',
    'Virtual Meeting',
    'Campus Quad',
    'Career Center',
    'Innovation Hub'
  ];
  
  const organizers = [
    'Student Government',
    'Computer Science Department',
    'Career Services',
    'Alumni Association',
    'Engineering Society',
    'International Student Office',
    'Research Center',
    'Entrepreneurship Club',
    'Faculty of Arts'
  ];
  
  // Generate 15-25 random events for the month
  const numEvents = Math.floor(Math.random() * 11) + 15; // 15-25 events
  
  for (let i = 0; i < numEvents; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const titles = eventTitles[category];
    const title = titles[Math.floor(Math.random() * titles.length)];
    
    const startHour = 8 + Math.floor(Math.random() * 10); // 8 AM to 6 PM
    const durationHours = Math.floor(Math.random() * 3) + 1; // 1-3 hours
    
    const startDate = new Date(year, month, day, startHour, 0, 0);
    const endDate = new Date(year, month, day, startHour + durationHours, 0, 0);
    
    const location = locations[Math.floor(Math.random() * locations.length)];
    const organizer = organizers[Math.floor(Math.random() * organizers.length)];
    
    // Generate a random description
    const descriptions = [
      `Join us for this exciting ${category} event where you'll learn valuable skills and connect with peers.`,
      `Don't miss this opportunity to enhance your knowledge in ${category} and network with professionals.`,
      `This ${category} event is perfect for students looking to expand their horizons and gain practical experience.`,
      `A must-attend ${category} session for anyone interested in advancing their academic and professional journey.`,
      `Participate in this interactive ${category} event designed to provide hands-on experience and valuable insights.`
    ];
    
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Add image URLs for some events (about 30% of events)
    let imageUrl;
    if (Math.random() < 0.3) {
      const imageUrls = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // conference
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // workshop
        'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // networking
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // campus event
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // lecture
      ];
      imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    }
    
    // Add URL for some events (about 50% of events)
    let url;
    if (Math.random() < 0.5) {
      url = 'https://example.com/event-details';
    }
    
    events.push({
      id: `event-${i}`,
      title,
      description,
      startDate,
      endDate,
      location,
      organizer,
      category,
      url,
      imageUrl
    });
  }
  
  return events;
}

export default EventCalendar;