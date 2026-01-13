import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const user = await signup(username, password);
      if (user.status === 'APPROVED') {
        // First user (Owner) gets auto-logged in or redirected to login to confirm
        // The auth context currently auto-logs in the first user in the signup function,
        // but let's redirect to dashboard if approved, or show message if pending.
        navigate('/');
      } else {
        setSuccess('Account created! Please wait for an admin to approve your account.');
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Sign Up</h2>
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-500/20 text-green-300 p-3 rounded mb-4 text-sm">{success}</div>}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition"
            >
              Create Account
            </button>
          </form>
        )}
        <div className="mt-4 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-green-400 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
