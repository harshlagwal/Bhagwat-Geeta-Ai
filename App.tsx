import React, { useState } from 'react';
import { User } from './types';
import Login from './components/Login';
import Chat from './components/Chat';
import { GitaIcon } from './components/ui';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (name: string) => {
    if (name.trim()) {
      setUser({ name: name.trim() });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100">
      <header className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 shadow-lg flex items-center justify-center space-x-4">
        <GitaIcon className="w-9 h-9" />
        <h1 className="text-2xl md:text-3xl font-bold font-laila tracking-wider">Gita Guide AI</h1>
      </header>
      
      {user ? (
        <Chat user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;