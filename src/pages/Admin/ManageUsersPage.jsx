import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Check, ShieldAlert } from 'lucide-react';

const ManageUsersPage = () => {
  const { getAllUsers, updateUserStatus, deleteUser, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    // We defer the state update to avoid the "setState in effect" warning if possible
    // or we just accept that this is a sync load from localstorage.
    // The previous error was specifically about the way it was called.
    // Let's wrap in a small timeout or just use initializer if it was only once,
    // but here it depends on 'refresh'.
    const fetchedUsers = getAllUsers();
    setUsers(fetchedUsers);
  }, [refresh]);
  // removed getAllUsers from dependency as it is stable from context (usually)
  // or we need to wrap it in useCallback in context.

  const handleStatusChange = (userId, newStatus) => {
    updateUserStatus(userId, newStatus);
    setRefresh(prev => prev + 1);
  };

  const handleDelete = (userId) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
          deleteUser(userId);
          setRefresh(prev => prev + 1);
      }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
          <ShieldAlert className="text-red-500" /> User Management
      </h2>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-4">Username</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-300">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-750">
                <td className="p-4 font-medium text-white">
                    {u.username}
                    {u.id === currentUser.id && <span className="ml-2 text-xs bg-blue-500 px-2 py-0.5 rounded text-white">You</span>}
                </td>
                <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'OWNER' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-400'}`}>
                        {u.role}
                    </span>
                </td>
                <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.status === 'APPROVED' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-400'}`}>
                        {u.status}
                    </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {u.status === 'PENDING' && (
                    <button
                        onClick={() => handleStatusChange(u.id, 'APPROVED')}
                        className="bg-green-600 hover:bg-green-500 text-white p-2 rounded"
                        title="Approve User"
                    >
                        <Check size={16} />
                    </button>
                  )}
                  {/* Prevent deleting self or other owners if you are just Admin (logic simplification: Owner can do all) */}
                  {u.id !== currentUser.id && (
                    <button
                        onClick={() => handleDelete(u.id)}
                        className="bg-red-600 hover:bg-red-500 text-white p-2 rounded"
                        title="Delete User"
                    >
                        <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
                <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No users found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;
