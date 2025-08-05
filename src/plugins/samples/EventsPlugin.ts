/**
 * Events Plugin for EduMesh
 * 
 * This plugin adds events and networking features to the EduMesh platform,
 * allowing users to discover, join, and create educational and networking events.
 */

import React from 'react';
import { PluginContext, MenuItem, DashboardWidget, ProfileSection } from '../index';

// Define the event types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  meetingUrl?: string;
  organizer: {
    id: string;
    name: string;
  };
  attendees: Array<{
    id: string;
    name: string;
    status: 'registered' | 'attending' | 'waitlisted' | 'cancelled';
  }>;
  tags: string[];
  maxAttendees?: number;
}

// Mock data for events
const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Web Development Workshop',
    description: 'Learn the latest techniques in modern web development with React and Node.js.',
    startDate: '2023-06-15T10:00:00Z',
    endDate: '2023-06-15T14:00:00Z',
    location: 'Online',
    isVirtual: true,
    meetingUrl: 'https://zoom.us/j/123456789',
    organizer: {
      id: 'user-1',
      name: 'John Smith',
    },
    attendees: [
      { id: 'user-2', name: 'Alice Johnson', status: 'registered' },
      { id: 'user-3', name: 'Bob Williams', status: 'registered' },
      { id: 'user-4', name: 'Carol Davis', status: 'waitlisted' },
    ],
    tags: ['Web Development', 'React', 'Node.js'],
    maxAttendees: 50,
  },
  {
    id: 'event-2',
    title: 'Tech Industry Networking Mixer',
    description: 'Connect with professionals from leading tech companies in a casual networking environment.',
    startDate: '2023-06-20T18:00:00Z',
    endDate: '2023-06-20T21:00:00Z',
    location: 'Tech Hub, 123 Innovation Street, San Francisco, CA',
    isVirtual: false,
    organizer: {
      id: 'user-5',
      name: 'Emily Chen',
    },
    attendees: [
      { id: 'user-1', name: 'John Smith', status: 'registered' },
      { id: 'user-2', name: 'Alice Johnson', status: 'registered' },
      { id: 'user-6', name: 'David Wilson', status: 'registered' },
      { id: 'user-7', name: 'Eva Martinez', status: 'waitlisted' },
    ],
    tags: ['Networking', 'Career Development', 'Tech Industry'],
    maxAttendees: 100,
  },
];

// Define the upcoming events dashboard widget component
const UpcomingEventsWidget: React.FC = () => {
  // Sort events by start date (ascending)
  const sortedEvents = [...mockEvents].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Upcoming Events</h3>
      <div className="space-y-3">
        {sortedEvents.map(event => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          
          return (
            <div key={event.id} className="border-b pb-2">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-gray-600">
                {startDate.toLocaleDateString()} at {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-xs text-gray-500">
                {event.isVirtual ? 'Online' : event.location}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <div className="text-xs">
                  {event.attendees.filter(a => a.status === 'registered').length} attending
                </div>
                <button className="text-xs text-indigo-600 hover:text-indigo-800">
                  Register
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-800">
        View All Events
      </button>
    </div>
  );
};

// Define the events profile section component
const EventsProfileSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Events</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          Create Event
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h4 className="font-medium">Events I'm Attending</h4>
        </div>
        
        <div className="divide-y">
          {mockEvents.map(event => (
            <div key={event.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium">{event.title}</h5>
                  <div className="text-sm text-gray-600">
                    {new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {event.isVirtual ? 'Online' : event.location}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Registered
                  </span>
                  <button className="text-xs text-red-600 hover:text-red-800">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h4 className="font-medium">Events I'm Organizing</h4>
        </div>
        
        <div className="p-8 text-center text-gray-500">
          <p>You're not organizing any events yet.</p>
          <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">
            Create an Event
          </button>
        </div>
      </div>
    </div>
  );
};

// Plugin initialization function
export const initialize = (context: PluginContext) => {
  console.log('Initializing Events Plugin...');
  
  // Register menu item
  const menuItem: MenuItem = {
    id: 'events',
    label: 'Events',
    icon: 'calendar-icon.svg',
    route: '/events',
    position: 'sidebar',
    order: 40,
  };
  context.extensionPoints.registerMenuItem(menuItem);
  
  // Register dashboard widget
  const dashboardWidget: DashboardWidget = {
    id: 'upcoming-events-widget',
    title: 'Upcoming Events',
    component: UpcomingEventsWidget as any,
    width: 'half',
    height: 'medium',
    order: 30,
  };
  context.extensionPoints.registerDashboardWidget(dashboardWidget);
  
  // Register profile section
  const profileSection: ProfileSection = {
    id: 'events-section',
    title: 'Events',
    component: EventsProfileSection as any,
    order: 40,
  };
  context.extensionPoints.registerProfileSection(profileSection);
  
  console.log('Events Plugin initialized successfully');
};

// Plugin cleanup function
export const cleanup = () => {
  console.log('Cleaning up Events Plugin...');
  // In a real implementation, we would unregister all extensions and clean up resources
};