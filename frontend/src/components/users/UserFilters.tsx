import { UserStatus, UserRole } from '@/types/user';

interface UserFiltersProps {
  selectedStatus: 'all' | UserStatus;
  selectedRole: 'all' | UserRole;
  searchTerm: string;
  onStatusChange: (status: 'all' | UserStatus) => void;
  onRoleChange: (role: 'all' | UserRole) => void;
  onSearchChange: (search: string) => void;
}

export default function UserFilters({
  selectedStatus,
  selectedRole,
  searchTerm,
  onStatusChange,
  onRoleChange,
  onSearchChange,
}: UserFiltersProps) {
  return (
    <div className="flex gap-4">
      <select
        className="border rounded-md px-3 py-2"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value as 'all' | UserStatus)}
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <select
        className="border rounded-md px-3 py-2"
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value as 'all' | UserRole)}
      >
        <option value="all">All Roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="text"
        placeholder="Search users..."
        className="border rounded-md px-3 py-2"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
