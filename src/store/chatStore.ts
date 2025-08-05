import { create } from 'zustand';

export interface ChatMessage {
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

export interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  online: boolean;
}

export interface ChatConversation {
  contactId: string;
  messages: ChatMessage[];
  isTyping: boolean;
}

interface ChatState {
  contacts: ChatContact[];
  conversations: Record<string, ChatConversation>;
  activeChats: string[];
  minimizedChats: string[];
  loadContacts: () => Promise<void>;
  loadConversation: (contactId: string) => Promise<void>;
  sendMessage: (contactId: string, content: string, attachments?: any[]) => Promise<void>;
  markAsRead: (contactId: string) => void;
  startChat: (contactId: string) => void;
  closeChat: (contactId: string) => void;
  minimizeChat: (contactId: string) => void;
  maximizeChat: (contactId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  contacts: [],
  conversations: {},
  activeChats: [],
  minimizedChats: [],

  loadContacts: async () => {
    // In a real app, this would fetch contacts from an API
    // For now, we'll use mock data
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

    set({ contacts: mockContacts });
  },

  loadConversation: async (contactId: string) => {
    // In a real app, this would fetch conversation history from an API
    // For now, we'll use mock data
    const { conversations } = get();

    // If we already have this conversation, don't reload it
    if (conversations[contactId]) return;

    // Generate mock messages
    const mockMessages = generateMockMessages(contactId);

    set({
      conversations: {
        ...conversations,
        [contactId]: {
          contactId,
          messages: mockMessages,
          isTyping: false,
        },
      },
    });
  },

  sendMessage: async (contactId: string, content: string, attachments: any[] = []) => {
    const { conversations, contacts } = get();

    // Create a new message
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      senderId: 'current-user', // In a real app, this would be the current user's ID
      receiverId: contactId,
      content,
      timestamp: new Date(),
      read: false,
      attachments: attachments.map((attachment) => ({
        id: `attachment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: attachment.name,
        url: URL.createObjectURL(attachment),
        type: attachment.type.startsWith('image/') ? 'image' : 'document',
      })),
    };

    // Get or initialize the conversation
    const conversation = conversations[contactId] || {
      contactId,
      messages: [],
      isTyping: false,
    };

    // Update the conversation with the new message
    set({
      conversations: {
        ...conversations,
        [contactId]: {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          isTyping: true, // Set typing indicator
        },
      },
      // Update the contact's last message
      contacts: contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              lastMessage: content,
              lastMessageTime: new Date(),
            }
          : contact
      ),
    });

    // Simulate a response after a delay
    setTimeout(() => {
      const { conversations, contacts } = get();
      const conversation = conversations[contactId];

      if (!conversation) return;

      // Create a response message
      const responseMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        senderId: contactId,
        receiverId: 'current-user',
        content: getRandomResponse(),
        timestamp: new Date(),
        read: false,
      };

      // Update the conversation with the response
      set({
        conversations: {
          ...conversations,
          [contactId]: {
            ...conversation,
            messages: [...conversation.messages, responseMessage],
            isTyping: false, // Clear typing indicator
          },
        },
        // Update the contact's last message and unread count
        contacts: contacts.map((contact) =>
          contact.id === contactId
            ? {
                ...contact,
                lastMessage: responseMessage.content,
                lastMessageTime: new Date(),
                unreadCount: contact.unreadCount + 1,
              }
            : contact
        ),
      });
    }, 3000);
  },

  markAsRead: (contactId: string) => {
    const { conversations, contacts } = get();
    const conversation = conversations[contactId];

    if (!conversation) return;

    // Mark all messages from this contact as read
    set({
      conversations: {
        ...conversations,
        [contactId]: {
          ...conversation,
          messages: conversation.messages.map((msg) =>
            msg.senderId === contactId && !msg.read ? { ...msg, read: true } : msg
          ),
        },
      },
      // Reset unread count for this contact
      contacts: contacts.map((contact) =>
        contact.id === contactId ? { ...contact, unreadCount: 0 } : contact
      ),
    });
  },

  startChat: (contactId: string) => {
    const { activeChats, minimizedChats, loadConversation } = get();

    // Load the conversation if it's not already loaded
    loadConversation(contactId);

    if (!activeChats.includes(contactId) && !minimizedChats.includes(contactId)) {
      // Limit to 3 active chats
      if (activeChats.length >= 3) {
        // Minimize the oldest chat
        const oldestChat = activeChats[0];
        set({
          activeChats: [...activeChats.slice(1), contactId],
          minimizedChats: [...minimizedChats, oldestChat],
        });
      } else {
        set({ activeChats: [...activeChats, contactId] });
      }
    } else if (minimizedChats.includes(contactId)) {
      // Restore minimized chat
      set({
        activeChats: [...activeChats, contactId],
        minimizedChats: minimizedChats.filter((id) => id !== contactId),
      });
    }

    // Mark messages as read when opening chat
    get().markAsRead(contactId);
  },

  closeChat: (contactId: string) => {
    const { activeChats, minimizedChats } = get();

    set({
      activeChats: activeChats.filter((id) => id !== contactId),
      minimizedChats: minimizedChats.filter((id) => id !== contactId),
    });
  },

  minimizeChat: (contactId: string) => {
    const { activeChats, minimizedChats } = get();

    if (activeChats.includes(contactId)) {
      set({
        activeChats: activeChats.filter((id) => id !== contactId),
        minimizedChats: [...minimizedChats, contactId],
      });
    }
  },

  maximizeChat: (contactId: string) => {
    const { activeChats, minimizedChats } = get();

    if (minimizedChats.includes(contactId)) {
      set({
        activeChats: [...activeChats, contactId],
        minimizedChats: minimizedChats.filter((id) => id !== contactId),
      });

      // Mark messages as read when maximizing chat
      get().markAsRead(contactId);
    }
  },
}));

// Helper functions
function generateMockMessages(contactId: string): ChatMessage[] {
  const mockMessages: ChatMessage[] = [
    {
      id: `msg-${Date.now() - 7200000}-${Math.random().toString(36).substring(2, 9)}`,
      senderId: contactId,
      receiverId: 'current-user',
      content: 'Hello! How can I help you with your career questions?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
  ];

  // Add more messages for specific contacts
  if (contactId === '101') {
    mockMessages.push(
      {
        id: `msg-${Date.now() - 3600000}-${Math.random().toString(36).substring(2, 9)}`,
        senderId: 'current-user',
        receiverId: contactId,
        content: 'Hi! I was wondering if you could share some advice about internships in your field.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        read: true,
      },
      {
        id: `msg-${Date.now() - 1800000}-${Math.random().toString(36).substring(2, 9)}`,
        senderId: contactId,
        receiverId: 'current-user',
        content:
          'Absolutely! I recommend starting with smaller companies where you can get more hands-on experience. Also, make sure to highlight your university projects in your applications.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
      }
    );
  }

  return mockMessages;
}

function getRandomResponse(): string {
  const responses = [
    'That sounds interesting! Could you tell me more?',
    'I see your point. Have you considered looking at it from this perspective?',
    'Great question! In my experience, the best approach is to start with research.',
    'I'd recommend connecting with alumni from your department who are now working in that field.',
    'The EduMesh platform has some great resources on this topic. Have you checked the Skills Exchange section?',
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}