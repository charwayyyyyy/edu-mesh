import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store';

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: 'image' | 'document' | 'other';
  }[];
}

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  online: boolean;
}

interface ChatConversation {
  contactId: string;
  messages: ChatMessage[];
  isTyping: boolean;
}

interface UseChatReturn {
  contacts: ChatContact[];
  conversations: Record<string, ChatConversation>;
  activeChats: string[];
  minimizedChats: string[];
  totalUnreadCount: number;
  sendMessage: (contactId: string, content: string, attachments?: any[]) => Promise<void>;
  markAsRead: (contactId: string) => void;
  startChat: (contactId: string) => void;
  closeChat: (contactId: string) => void;
  minimizeChat: (contactId: string) => void;
  maximizeChat: (contactId: string) => void;
  getContactById: (contactId: string) => ChatContact | undefined;
}

export const useChat = (): UseChatReturn => {
  const { isAuthenticated, user } = useAuthStore();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [conversations, setConversations] = useState<Record<string, ChatConversation>>({});
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [minimizedChats, setMinimizedChats] = useState<string[]>([]);

  // Load mock contacts
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

      // Initialize conversations with mock data
      const mockConversations: Record<string, ChatConversation> = {};
      mockContacts.forEach((contact) => {
        mockConversations[contact.id] = {
          contactId: contact.id,
          messages: generateMockMessages(contact.id),
          isTyping: false,
        };
      });

      setConversations(mockConversations);
    }
  }, [isAuthenticated]);

  // Generate mock messages for a conversation
  const generateMockMessages = (contactId: string): ChatMessage[] => {
    const mockMessages: ChatMessage[] = [
      {
        id: `${contactId}-1`,
        senderId: contactId,
        receiverId: user?.id || '',
        content: 'Hello! How can I help you with your career questions?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
      },
    ];

    // Add more messages for specific contacts
    if (contactId === '101') {
      mockMessages.push(
        {
          id: `${contactId}-2`,
          senderId: user?.id || '',
          receiverId: contactId,
          content: 'Hi! I was wondering if you could share some advice about internships in your field.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          read: true,
        },
        {
          id: `${contactId}-3`,
          senderId: contactId,
          receiverId: user?.id || '',
          content:
            'Absolutely! I recommend starting with smaller companies where you can get more hands-on experience. Also, make sure to highlight your university projects in your applications.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
        }
      );
    }

    return mockMessages;
  };

  const totalUnreadCount = contacts.reduce((sum, contact) => sum + contact.unreadCount, 0);

  const sendMessage = useCallback(
    async (contactId: string, content: string, attachments: any[] = []) => {
      if (!isAuthenticated || !user) return;

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        receiverId: contactId,
        content,
        timestamp: new Date(),
        read: false,
        attachments: attachments.map((attachment) => ({
          id: `attachment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: attachment.name,
          url: URL.createObjectURL(attachment),
          type: attachment.type.startsWith('image/') ? 'image' : 'document',
        })),
      };

      // Update conversation
      setConversations((prev) => {
        const conversation = prev[contactId] || { contactId, messages: [], isTyping: false };
        return {
          ...prev,
          [contactId]: {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            isTyping: true, // Set typing indicator
          },
        };
      });

      // Update contact's last message
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId
            ? {
                ...contact,
                lastMessage: content,
                lastMessageTime: new Date(),
              }
            : contact
        )
      );

      // Simulate response after delay
      setTimeout(() => {
        // Stop typing indicator
        setConversations((prev) => ({
          ...prev,
          [contactId]: {
            ...prev[contactId],
            isTyping: false,
          },
        }));

        // Add response message
        const responseMessage: ChatMessage = {
          id: `response-${Date.now()}`,
          senderId: contactId,
          receiverId: user.id,
          content: getRandomResponse(),
          timestamp: new Date(),
          read: true,
        };

        setConversations((prev) => ({
          ...prev,
          [contactId]: {
            ...prev[contactId],
            messages: [...prev[contactId].messages, responseMessage],
          },
        }));

        // Update contact's last message
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === contactId
              ? {
                  ...contact,
                  lastMessage: responseMessage.content,
                  lastMessageTime: new Date(),
                  unreadCount: contact.unreadCount + 1,
                }
              : contact
          )
        );
      }, 3000);
    },
    [isAuthenticated, user]
  );

  const getRandomResponse = () => {
    const responses = [
      'That sounds interesting! Could you tell me more?',
      'I see your point. Have you considered looking at it from this perspective?',
      'Great question! In my experience, the best approach is to start with research.',
      'I'd recommend connecting with alumni from your department who are now working in that field.',
      'The EduMesh platform has some great resources on this topic. Have you checked the Skills Exchange section?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const markAsRead = useCallback(
    (contactId: string) => {
      // Mark all messages as read
      setConversations((prev) => {
        const conversation = prev[contactId];
        if (!conversation) return prev;

        return {
          ...prev,
          [contactId]: {
            ...conversation,
            messages: conversation.messages.map((msg) =>
              msg.senderId === contactId && !msg.read ? { ...msg, read: true } : msg
            ),
          },
        };
      });

      // Reset unread count
      setContacts((prev) =>
        prev.map((contact) => (contact.id === contactId ? { ...contact, unreadCount: 0 } : contact))
      );
    },
    []
  );

  const startChat = useCallback(
    (contactId: string) => {
      if (!activeChats.includes(contactId) && !minimizedChats.includes(contactId)) {
        // Limit to 3 active chats
        if (activeChats.length >= 3) {
          // Minimize the oldest chat
          const oldestChat = activeChats[0];
          setMinimizedChats((prev) => [...prev, oldestChat]);
          setActiveChats((prev) => prev.slice(1).concat(contactId));
        } else {
          setActiveChats((prev) => [...prev, contactId]);
        }
      } else if (minimizedChats.includes(contactId)) {
        // Restore minimized chat
        setMinimizedChats((prev) => prev.filter((id) => id !== contactId));
        setActiveChats((prev) => [...prev, contactId]);
      }

      // Mark messages as read when opening chat
      markAsRead(contactId);
    },
    [activeChats, minimizedChats, markAsRead]
  );

  const closeChat = useCallback(
    (contactId: string) => {
      setActiveChats((prev) => prev.filter((id) => id !== contactId));
      setMinimizedChats((prev) => prev.filter((id) => id !== contactId));
    },
    []
  );

  const minimizeChat = useCallback(
    (contactId: string) => {
      setActiveChats((prev) => prev.filter((id) => id !== contactId));
      if (!minimizedChats.includes(contactId)) {
        setMinimizedChats((prev) => [...prev, contactId]);
      }
    },
    [minimizedChats]
  );

  const maximizeChat = useCallback(
    (contactId: string) => {
      setMinimizedChats((prev) => prev.filter((id) => id !== contactId));
      if (!activeChats.includes(contactId)) {
        setActiveChats((prev) => [...prev, contactId]);
      }
      // Mark messages as read when maximizing chat
      markAsRead(contactId);
    },
    [activeChats, markAsRead]
  );

  const getContactById = useCallback(
    (contactId: string) => {
      return contacts.find((contact) => contact.id === contactId);
    },
    [contacts]
  );

  return {
    contacts,
    conversations,
    activeChats,
    minimizedChats,
    totalUnreadCount,
    sendMessage,
    markAsRead,
    startChat,
    closeChat,
    minimizeChat,
    maximizeChat,
    getContactById,
  };
};