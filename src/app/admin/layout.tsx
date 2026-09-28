'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="font-bold text-gray-900">Admin Panel</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-500 hover:text-brand text-sm">
                View Site
              </Link>
              <button
                onClick={() => {
                  import('next-auth/react').then(({ signOut }) => signOut({ callbackUrl: '/admin/login' }));
                }}
                className="text-gray-500 hover:text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
