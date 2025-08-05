import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store';
import { formatDistanceToNow } from 'date-fns';

interface Message {
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

interface ChatInterfaceProps {
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  onClose?: () => void;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const ChatInterface = ({
  recipientId,
  recipientName,
  recipientAvatar,
  onClose,
  isMinimized = false,
  onMinimize,
  onMaximize,
}: ChatInterfaceProps) => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for initial messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: recipientId,
        receiverId: user?.id || '',
        content: 'Hello! How can I help you with your career questions?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
      },
      {
        id: '2',
        senderId: user?.id || '',
        receiverId: recipientId,
        content: 'Hi! I was wondering if you could share some advice about internships in your field.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        read: true,
      },
      {
        id: '3',
        senderId: recipientId,
        receiverId: user?.id || '',
        content:
          'Absolutely! I recommend starting with smaller companies where you can get more hands-on experience. Also, make sure to highlight your university projects in your applications.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: true,
      },
    ];

    setMessages(mockMessages);
  }, [recipientId, user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: recipientId,
      content: newMessage,
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate recipient typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate response
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: recipientId,
        receiverId: user?.id || '',
        content: getRandomResponse(),
        timestamp: new Date(),
        read: true,
      };
      setMessages((prev) => [...prev, response]);
    }, 3000);
  };

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

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-64 z-50 overflow-hidden"
      >
        <div
          className="p-3 bg-primary-600 text-white flex justify-between items-center cursor-pointer"
          onClick={onMaximize}
        >
          <div className="flex items-center">
            <img
              src={recipientAvatar || `https://ui-avatars.com/api/?name=${recipientName}&background=0D8ABC&color=fff`}
              alt={recipientName}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span className="font-medium truncate">{recipientName}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onClose && onClose(); }} className="text-white hover:text-gray-200">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 sm:w-96 z-50 flex flex-col"
      style={{ height: '500px', maxHeight: '80vh' }}
    >
      <div className="p-3 bg-primary-600 text-white flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={recipientAvatar || `https://ui-avatars.com/api/?name=${recipientName}&background=0D8ABC&color=fff`}
            alt={recipientName}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <span className="font-medium">{recipientName}</span>
            <div className="text-xs text-primary-100">
              {isTyping ? 'Typing...' : 'Online'}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={onMinimize} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            {message.senderId !== user?.id && (
              <img
                src={recipientAvatar || `https://ui-avatars.com/api/?name=${recipientName}&background=0D8ABC&color=fff`}
                alt={recipientName}
                className="h-8 w-8 rounded-full mr-2 self-end"
              />
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${message.senderId === user?.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
            >
              <div className="text-sm">{message.content}</div>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2">
                  {message.attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs underline mt-1"
                    >
                      {attachment.name}
                    </a>
                  ))}
                </div>
              )}
              <div className="text-xs mt-1 opacity-70">
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </div>
            </div>
            {message.senderId === user?.id && (
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`}
                alt={user?.name}
                className="h-8 w-8 rounded-full ml-2 self-end"
              />
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <img
              src={recipientAvatar || `https://ui-avatars.com/api/?name=${recipientName}&background=0D8ABC&color=fff`}
              alt={recipientName}
              className="h-8 w-8 rounded-full mr-2 self-end"
            />
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-2">
            <PaperClipIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className="ml-2 text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;