'use client';
import { useLogout } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
  const logout = useLogout();
  const router = useRouter();

  const handle = async () => {
    try {
      await logout.mutateAsync();
    } finally {
      router.push('/login');
    }
  };

  return <button onClick={handle} className="btn-secondary">Logout</button>;
}
