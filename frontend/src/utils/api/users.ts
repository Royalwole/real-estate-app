import { User, UserStatus, UserRole } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchUsersParams {
  status?: UserStatus | 'all';
  role?: UserRole | 'all';
  search?: string;
  page: number;
}

interface FetchUsersResponse {
  users: User[];
  totalPages: number;
}

export async function fetchUsers({
  status,
  role,
  search,
  page
}: FetchUsersParams): Promise<FetchUsersResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const queryParams = new URLSearchParams({
      ...(status !== 'all' && { status }),
      ...(role !== 'all' && { role }),
      ...(search && { search }),
      page: page.toString(),
    });

    const res = await fetch(
      `${API_URL}/api/admin/users?${queryParams}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

export async function updateUserStatus(userId: string, status: UserStatus): Promise<User> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_URL}/api/admin/users/${userId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update user status');
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Status update request timed out');
      }
      throw error;
    }
    throw new Error('An unknown error occurred while updating status');
  }
}

export async function updateUserRole(userId: string, role: UserRole): Promise<User> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update user role');
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Role update request timed out');
      }
      throw error;
    }
    throw new Error('An unknown error occurred while updating role');
  }
}
