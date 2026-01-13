import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // Loading state kept for future async expansions, though not heavily used now
  const [loading] = useState(false);

  const signup = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(u => u.username === username)) {
          return reject('Username already exists');
        }

        // Logic: First user is OWNER and APPROVED. Others are USER and PENDING.
        const isFirstUser = users.length === 0;
        const role = isFirstUser ? 'OWNER' : 'USER';
        const status = isFirstUser ? 'APPROVED' : 'PENDING';

        const newUser = {
          id: Date.now().toString(),
          username,
          password, // In a real app, hash this!
          role,
          status
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        if (isFirstUser) {
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            setUser(newUser);
        }

        resolve(newUser);
      }, 500);
    });
  };

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.username === username && u.password === password);

        if (!foundUser) {
          return reject('Invalid credentials');
        }

        if (foundUser.status !== 'APPROVED') {
          return reject('Your account is pending approval by an admin.');
        }

        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        setUser(foundUser);
        resolve(foundUser);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUserStatus = (userId, newStatus) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => {
        if (u.id === userId) return { ...u, status: newStatus };
        return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter(u => u.id !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  const getAllUsers = () => {
      return JSON.parse(localStorage.getItem('users') || '[]');
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUserStatus, getAllUsers, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
