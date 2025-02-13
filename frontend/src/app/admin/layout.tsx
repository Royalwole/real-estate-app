import AdminLayout from '@/components/AdminLayout';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <Toaster position="top-right" />
    </>
  );
}
