import { FaCheck, FaTimes } from 'react-icons/fa';
import { User, UserStatus, UserRole } from '@/types/user';

interface UserTableProps {
  users: User[];
  onUpdateStatus: (userId: string, status: UserStatus) => void;
  onUpdateRole: (userId: string, role: UserRole) => void;
}

export default function UserTable({ users, onUpdateStatus, onUpdateRole }: UserTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.status === 'approved' ? 'bg-green-100 text-green-800' :
                  user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <select
                  value={user.role}
                  onChange={(e) => onUpdateRole(user._id, e.target.value as UserRole)}
                  className="border rounded px-2 py-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdateStatus(user._id, 'approved')}
                    className="text-green-600 hover:text-green-900"
                    disabled={user.status === 'approved'}
                  >
                    <FaCheck className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onUpdateStatus(user._id, 'rejected')}
                    className="text-red-600 hover:text-red-900"
                    disabled={user.status === 'rejected'}
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
