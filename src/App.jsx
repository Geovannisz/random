import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WidgetsPage from './pages/WidgetsPage';
import { WidgetProvider } from './context/WidgetContext';

// Placeholder Pages for now
const RadioPage = () => <div className="text-2xl">Radio Station</div>;
const RavenPage = () => <div className="text-2xl">Raven AI</div>;
const DiscordPage = () => <div className="text-2xl">Discord Bot Manager</div>;
const MembersPage = () => <div className="text-2xl">Members List</div>;
const ManageUsersPage = () => <div className="text-2xl">Manage Users</div>;

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user || (user.role !== 'ADMIN' && user.role !== 'OWNER')) return <Navigate to="/" />;
    return children;
}

function App() {
  return (
    <AuthProvider>
      <WidgetProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/" element={<WidgetsPage />} />
            <Route path="/radio" element={<RadioPage />} />
            <Route path="/raven" element={<RavenPage />} />
            <Route path="/discord" element={<DiscordPage />} />
            <Route path="/members" element={<MembersPage />} />

            <Route path="/admin/users" element={<AdminRoute><ManageUsersPage /></AdminRoute>} />
          </Route>
        </Routes>
      </Router>
      </WidgetProvider>
    </AuthProvider>
  );
}

export default App;
