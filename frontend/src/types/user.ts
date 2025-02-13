export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  role: 'user' | 'admin';
  createdAt: string;
}

export type UserStatus = User['status'];
export type UserRole = User['role'];
