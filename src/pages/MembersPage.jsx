import React from 'react';
import { Users } from 'lucide-react';

const MembersPage = () => {
    // Mock members data
    const members = [
        { id: 1, name: 'Alice', rank: 'Diamond', joined: '2023-01-15' },
        { id: 2, name: 'Bob', rank: 'Gold', joined: '2023-02-20' },
        { id: 3, name: 'Charlie', rank: 'Silver', joined: '2023-03-05' },
    ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
          <Users className="text-blue-500" /> Community Members
      </h2>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-750 text-gray-400 border-b border-gray-700">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Rank</th>
              <th className="p-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-300">
             {members.map(m => (
                 <tr key={m.id} className="hover:bg-gray-700/50">
                     <td className="p-4 font-medium text-white">{m.name}</td>
                     <td className="p-4 text-purple-400">{m.rank}</td>
                     <td className="p-4 text-gray-500">{m.joined}</td>
                 </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersPage;
