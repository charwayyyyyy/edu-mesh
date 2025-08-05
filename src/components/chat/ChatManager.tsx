import { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import ChatInterface from './ChatInterface';
import { useAuthStore } from '../../store';

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  online: boolean;
}

const ChatManager = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [minimizedChats, setMinimizedChats] = useState<string[]>([]);
  const [showContactsList, setShowContactsList] = useState(false);
  const [contacts, setContacts] = useState<ChatContact[]>([]);

  // Mock data for contacts
  useEffect(() => {
    if (isAuthenticated) {
      const mockContacts: ChatContact[] = [
        {
          id: '101',
          name: 'Ama Serwaa',
          avatar: 'https://ui-avatars.com/api/?name=Ama+Serwaa&background=0D8ABC&color=fff',
          lastMessage: 'Let me know if you have any questions about the job posting.',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          unreadCount: 2,
          online: true,
        },
        {
          id: '102',
          name: 'Dr. Kwame Nkrumah',
          avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
          lastMessage: 'I can mentor you on community health initiatives.',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          unreadCount: 0,
          online: false,
        },
        {
          id: '103',
          name: 'Prof. Yaa Asantewaa',
          avatar: 'https://ui-avatars.com/api/?name=Yaa+Asantewaa&background=0D8ABC&color=fff',
          lastMessage: 'Your application for the internship has been received.',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          unreadCount: 1,
          online: true,
        },
        {
          id: '104',
          name: 'Kofi Annan',
          avatar: 'https://ui-avatars.com/api/?name=Kofi+Annan&background=0D8ABC&color=fff',
          lastMessage: 'Thanks for connecting! I look forward to our mentorship sessions.',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
          unreadCount: 0,
          online: false,
        },
        {
          id: '105',
          name: 'Efua Sutherland',
          avatar: 'https://ui-avatars.com/api/?name=Efua+Sutherland&background=0D8ABC&color=fff',
          lastMessage: 'I can help you with your creative writing skills.',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
          unreadCount: 0,
          online: true,
        },
      ];

      setContacts(mockContacts);
    }
  }, [isAuthenticated]);

  const openChat = (contactId: string) => {
    if (!activeChats.includes(contactId) && !minimizedChats.includes(contactId)) {
      // Limit to 3 active chats
      if (activeChats.length >= 3) {
        // Minimize the oldest chat
        const oldestChat = activeChats[0];
        minimizeChat(oldestChat);
      }
      setActiveChats([...activeChats, contactId]);
    } else if (minimizedChats.includes(contactId)) {
      // Restore minimized chat
      setMinimizedChats(minimizedChats.filter((id) => id !== contactId));
      setActiveChats([...activeChats, contactId]);
    }
    setShowContactsList(false);

    // Mark messages as read
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? { ...contact, unreadCount: 0 } : contact
      )
    );
  };

  const closeChat = (contactId: string) => {
    setActiveChats(activeChats.filter((id) => id !== contactId));
    setMinimizedChats(minimizedChats.filter((id) => id !== contactId));
  };

  const minimizeChat = (contactId: string) => {
    setActiveChats(activeChats.filter((id) => id !== contactId));
    if (!minimizedChats.includes(contactId)) {
      setMinimizedChats([...minimizedChats, contactId]);
    }
  };

  const maximizeChat = (contactId: string) => {
    setMinimizedChats(minimizedChats.filter((id) => id !== contactId));
    if (!activeChats.includes(contactId)) {
      setActiveChats([...activeChats, contactId]);
    }
  };

  const toggleContactsList = () => {
    setShowContactsList(!showContactsList);
  };

  if (!isAuthenticated) return null;

  const totalUnreadCount = contacts.reduce((sum, contact) => sum + contact.unreadCount, 0);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {/* Active chat windows */}
      {activeChats.map((contactId, index) => {
        const contact = contacts.find((c) => c.id === contactId);
        if (!contact) return null;

        return (
          <div key={contactId} style={{ right: `${(index) * 20}px`, bottom: '0' }}>
            <ChatInterface
              recipientId={contact.id}
              recipientName={contact.name}
              recipientAvatar={contact.avatar}
              onClose={() => closeChat(contactId)}
              onMinimize={() => minimizeChat(contactId)}
            />
          </div>
        );
      })}

      {/* Minimized chat windows */}
      <div className="flex flex-row-reverse space-x-reverse space-x-2">
        {minimizedChats.map((contactId) => {
          const contact = contacts.find((c) => c.id === contactId);
          if (!contact) return null;

          return (
            <ChatInterface
              key={contactId}
              recipientId={contact.id}
              recipientName={contact.name}
              recipientAvatar={contact.avatar}
              isMinimized={true}
              onClose={() => closeChat(contactId)}
              onMaximize={() => maximizeChat(contactId)}
            />
          );
        })}
      </div>

      {/* Contacts list */}
      {showContactsList && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-72 mb-2 overflow-hidden">
          <div className="p-3 bg-primary-600 text-white">
            <h3 className="font-medium">Messages</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {contacts.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No contacts found
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => openChat(contact.id)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 flex items-center"
                >
                  <div className="relative">
                    <img
                      src={contact.avatar || `https://ui-avatars.com/api/?name=${contact.name}&background=0D8ABC&color=fff`}
                      alt={contact.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    {contact.online && (
                      <span className="absolute bottom-0 right-3 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{contact.name}</h4>
                      {contact.lastMessageTime && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(contact.lastMessageTime).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    {contact.lastMessage && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                    )}
                  </div>
                  {contact.unreadCount > 0 && (
                    <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={toggleContactsList}
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center relative"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
        {totalUnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalUnreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatManager;