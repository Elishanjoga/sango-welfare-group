"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.role) {
      switch (user.role) {
        case 'SACCO_MEMBER':
          router.replace('/dashboard/member');
          break;
        case 'LOAN_OFFICER':
          router.replace('/dashboard/loan-officer');
          break;
        case 'WELFARE_OFFICER':
          router.replace('/dashboard/welfare-officer');
          break;
        case 'SUPER_ADMIN':
          router.replace('/dashboard/admin');
          break;
        default:
          router.replace('/login'); // Fallback
      }
    } else if (!loading && !user) {
        router.replace('/login');
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="ml-2">Loading your dashboard...</p>
    </div>
  );
}
