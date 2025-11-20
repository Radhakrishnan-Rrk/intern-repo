import React, { useState } from 'react';
import { AlertCircle, Send, Menu, Plus, Settings, Bell, Palette, Globe, Key, Shield, HelpCircle, Info, LogOut, Eye, EyeOff, Mic, X } from 'lucide-react';

// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Demo credentials - in production, this would call an API
    if (employeeId === 'EMP001' && password === 'password123') {
      onLogin({ employeeId, name: 'Aria Chen', email: 'aria.chen@internal.co' });
    } else {
      setError('Invalid Employee ID or Password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter your employee ID"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-400 text-sm">Password</label>
              <button type="button" className="text-blue-400 text-sm hover:underline">
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Log In
          </button>

          <div className="mt-6 text-center text-gray-500 text-xs">
            © 2024 Corporate Analytics Inc. All Rights Reserved.
          </div>
          
          <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded text-blue-200 text-xs">
            <strong>Demo Credentials:</strong><br />
            Employee ID: EMP001<br />
            Password: password123
          </div>
        </div>
      </div>
    </div>
  );
};

// LLM Chat Page Component
const LLMChatPage = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    'Summarize the latest sales report',
    'Draft an email to the marketing team',
    'Explain the concept of quantum computing'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant',
        content: `I understand you're asking about "${input}". This is a simulated response from the Internal LLM Platform. In a production environment, this would connect to your company's AI model to provide intelligent responses based on your internal data and context.`
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
          <h1 className="text-white font-semibold">Q3 Marketing Strategy Brainstorm</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-white p-2">
            <Plus size={24} />
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white p-2"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-gray-800 rounded-lg p-6 mb-8 inline-block">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to the Internal LLM Platform
            </h2>
            <p className="text-gray-400 mb-8">
              How can I assist you today? Start by typing a prompt below or use one of the suggestions.
            </p>
            <div className="space-y-3">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestion(suggestion)}
                  className="block w-full bg-gray-800 hover:bg-gray-700 text-left text-gray-300 px-6 py-4 rounded-lg transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-4 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-200'
                }`}>
                  {msg.role === 'assistant' && (
                    <div className="text-sm font-semibold mb-2">AI Assistant</div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-400 hover:text-white p-3">
            <Mic size={24} />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      {/* Settings Sidebar */}
      {showSettings && (
        <SettingsPage 
          user={user} 
          onClose={() => setShowSettings(false)} 
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

// Settings Page Component
const SettingsPage = ({ user, onClose, onLogout }) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-gray-900 h-full overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-white text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-6 text-center border-b border-gray-800">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <h3 className="text-white text-xl font-semibold mb-1">{user.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{user.email}</p>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Preferences Section */}
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-gray-400 text-sm font-semibold mb-4">Preferences</h3>
          
          <button className="w-full flex items-center justify-between py-3 text-white hover:bg-gray-800 px-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="text-blue-400" size={20} />
              <span>Notifications</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between py-3 text-white hover:bg-gray-800 px-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Palette className="text-blue-400" size={20} />
              <span>Appearance</span>
            </div>
            <span className="text-gray-400 text-sm">System</span>
          </button>

          <button className="w-full flex items-center justify-between py-3 text-white hover:bg-gray-800 px-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="text-blue-400" size={20} />
              <span>Language</span>
            </div>
            <span className="text-gray-400 text-sm">English</span>
          </button>
        </div>

        {/* Security & Account Section */}
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-gray-400 text-sm font-semibold mb-4">Security & Account</h3>
          
          <button className="w-full flex items-center justify-between py-3 text-white hover:bg-gray-800 px-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Key className="text-blue-400" size={20} />
              <span>Change Password</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <div className="w-full flex items-center justify-between py-3 px-3">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-400" size={20} />
              <span className="text-white">Two-Factor Auth</span>
            </div>
            <button
              onClick={() => setTwoFactorAuth(!twoFactorAuth)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                twoFactorAuth ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        </div>

        {/* Application Section */}
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-gray-400 text-sm font-semibold mb-4">Application</h3>
          
          <button className="w-full flex items-center justify-between py-3 text-white hover:bg-gray-800 px-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-blue-400" size={20} />
              <span>Help & Support</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between py-3 text-white hover:bg-gray-800 px-3 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Info className="text-blue-400" size={20} />
              <span>About</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={onLogout}
            className="w-full bg-red-900/30 hover:bg-red-900/50 text-red-400 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="font-sans">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <LLMChatPage user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App; 