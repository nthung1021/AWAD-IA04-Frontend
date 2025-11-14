'use client';
import { ReactNode, useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Protected({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push('/login');
    }
  }, [isLoading, data, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null; // redirecting

  return <>{children}</>;
}
