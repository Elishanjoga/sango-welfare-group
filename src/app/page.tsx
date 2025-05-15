"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user?.role) {
        // Redirect to a role-specific default or a general dashboard landing
        // For simplicity, let's redirect to a generic dashboard page first
        // which can then handle role-specific views or further redirects.
        // router.push('/dashboard'); 
        // Or, directly to their role-specific page:
        switch (user.role) {
          case 'SACCO_MEMBER':
            router.push('/dashboard/member');
            break;
          case 'LOAN_OFFICER':
            router.push('/dashboard/loan-officer');
            break;
          case 'WELFARE_OFFICER':
            router.push('/dashboard/welfare-officer');
            break;
          case 'SUPER_ADMIN':
            router.push('/dashboard/admin');
            break;
          default:
            router.push('/login'); // Fallback if role is unknown
        }
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-lg text-foreground">Loading SaccoCentral...</p>
    </div>
  );
}
