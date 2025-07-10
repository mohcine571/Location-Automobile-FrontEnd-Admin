import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('token', 'dummy_token');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 px-4 sm:px-6">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Espace Admin</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M16 12H8m8 0l-4 4m4-4l-4-4" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 11c.645 0 1.24.243 1.682.639A2.5 2.5 0 0116 14v1H8v-1c0-.691.279-1.317.732-1.761A2.5 2.5 0 0112 11zm0-8a4 4 0 014 4v1H8V7a4 4 0 014-4z" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Connexion
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} CarAdmin. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Login;
