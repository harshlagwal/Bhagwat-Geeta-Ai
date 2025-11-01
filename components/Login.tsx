import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name);
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-orange-200/50 text-center">
        <h2 className="text-3xl font-bold text-orange-900 font-laila mb-2">🕉️</h2>
        <h2 className="text-2xl font-bold text-orange-900 font-laila mb-4">Welcome, Seeker</h2>
        <p className="text-gray-600 mb-6">
          Enter your name to begin your personal spiritual journey with the Gita.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="आपका शुभ नाम?"
            className="p-3 border border-orange-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 font-laila text-center"
            required
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 font-bold text-lg"
          >
            Start Your Journey 🙏
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;