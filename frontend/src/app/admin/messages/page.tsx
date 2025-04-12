'use client';

import { useState, useEffect } from 'react';
import { Search, Trash2, Mail, Clock, Eye, AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  subject: string;
}

interface Alert {
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; messageId: number | null }>({
    show: false,
    messageId: null
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (type: Alert['type'], message: string) => {
    setAlert({ type, message });
  };

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages...');
      const response = await fetch('http://localhost:8000/api/messages');
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      console.log('Received data:', data);
      const messagesList = Array.isArray(data) ? data : data.messages || [];
      console.log('Setting messages:', messagesList);
      setMessages(messagesList);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initiateDelete = (id: number) => {
    setDeleteConfirm({ show: true, messageId: id });
  };

  const handleDelete = async () => {
    if (!deleteConfirm.messageId) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/messages/${deleteConfirm.messageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMessages(messages.filter(message => message.id !== deleteConfirm.messageId));
        showAlert('success', 'Message deleted successfully');
      } else {
        throw new Error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      showAlert('error', 'Failed to delete message');
    } finally {
      setDeleteConfirm({ show: false, messageId: null });
    }
  };

  const handleReply = async (email: string, subject: string) => {
    try {
      const response = await fetch('http://localhost:3001/message/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: `Re: ${subject}`,
          text: 'Thank you for your message. We will get back to you shortly.',
        }),
      });

      if (response.ok) {
        showAlert('success', 'Reply sent successfully');
      } else {
        throw new Error('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      showAlert('error', 'Failed to send reply');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1f4b] rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-white">Delete Message?</h3>
              </div>
              <p className="text-gray-300 mb-6">
                This action cannot be undone. The message will be permanently removed from the system.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm({ show: false, messageId: null })}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete Message
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Alert Component */}
        <AnimatePresence mode="wait">
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50 ${
                alert.type === 'success' ? 'bg-green-500' :
                alert.type === 'error' ? 'bg-red-500' :
                'bg-blue-500'
              }`}
            >
              {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-white" />}
              {alert.type === 'error' && <XCircle className="w-5 h-5 text-white" />}
              {alert.type === 'info' && <AlertCircle className="w-5 h-5 text-white" />}
              <p className="text-white font-medium">{alert.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Messages</h1>
            <p className="text-gray-400">Manage incoming messages and inquiries</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 pl-10 bg-[#1a1f4b] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-white">No messages found</h3>
            <p className="text-gray-400">No messages match your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#1a1f4b] rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white">{message.name}</h3>
                      <p className="text-blue-400 hover:text-blue-300 transition-colors">
                        <a href={`mailto:${message.email}`} className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {message.email}
                        </a>
                      </p>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {new Date(message.created_at).toLocaleString()}
                      </div>
                      <p className="text-gray-300">{message.message}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleReply(message.email, message.subject)}
                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        title="Reply to message"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => initiateDelete(message.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 hover:scale-105"
                        title="Delete message"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
