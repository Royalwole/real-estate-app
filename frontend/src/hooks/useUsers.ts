import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { User, UserStatus, UserRole } from '@/types/user';
import { fetchUsers, updateUserStatus, updateUserRole } from '@/utils/api/users';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | UserStatus>('all');
  const [selectedRole, setSelectedRole] = useState<'all' | UserRole>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status') as UserStatus | 'all' || 'all';
    const role = searchParams.get('role') as UserRole | 'all' || 'all';
    const search = searchParams.get('search') || '';
    const currentPage = parseInt(searchParams.get('page') || '1');

    setSelectedStatus(status);
    setSelectedRole(role);
    setSearchTerm(search);
    setPage(currentPage);

    loadUsers(status, role, search, currentPage);
  }, [searchParams]);

  const loadUsers = async (
    status: 'all' | UserStatus,
    role: 'all' | UserRole,
    search: string,
    currentPage: number
  ) => {
    try {
      const data = await fetchUsers({ status, role, search, page: currentPage });
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: UserStatus) => {
    try {
      await updateUserStatus(userId, newStatus);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
      toast.success('User status updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      toast.success('User role updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const updateFilters = (
    status: 'all' | UserStatus = selectedStatus,
    role: 'all' | UserRole = selectedRole,
    search: string = searchTerm,
    currentPage: number = 1
  ) => {
    const params = new URLSearchParams({
      ...(status !== 'all' && { status }),
      ...(role !== 'all' && { role }),
      ...(search && { search }),
      page: currentPage.toString(),
    });

    router.push(`/admin/users?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      updateFilters(selectedStatus, selectedRole, value);
    }, 500);
    
    setSearchTimeout(timeout);
  };

  return {
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
  };
}
