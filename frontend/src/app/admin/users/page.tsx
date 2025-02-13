'use client';

import { useUsers } from '@/hooks/useUsers';
import UserTable from '@/components/users/UserTable';
import UserFilters from '@/components/users/UserFilters';
import Pagination from '@/components/common/Pagination';

export default function UsersPage() {
  const {
    users,
    selectedStatus,
    selectedRole,
    searchTerm,
    page,
    totalPages,
    handleUpdateStatus,
    handleUpdateRole,
    updateFilters,
    handleSearch,
  } = useUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <UserFilters
          selectedStatus={selectedStatus}
          selectedRole={selectedRole}
          searchTerm={searchTerm}
          onStatusChange={(status) => updateFilters(status, selectedRole, searchTerm)}
          onRoleChange={(role) => updateFilters(selectedStatus, role, searchTerm)}
          onSearchChange={handleSearch}
        />
      </div>

      <UserTable
        users={users}
        onUpdateStatus={handleUpdateStatus}
        onUpdateRole={handleUpdateRole}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => updateFilters(selectedStatus, selectedRole, searchTerm, newPage)}
      />
    </div>
  );
}
