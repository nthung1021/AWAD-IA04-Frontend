'use client';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type LoginForm = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const loginMu = useLogin();

  async function onSubmit(data: LoginForm) {
    try {
      await loginMu.mutateAsync(data);
      // success: redirect to protected dashboard
      router.push('/dashboard');
    } catch (err: any) {
      // show error message
      alert(err?.response?.data?.message ?? 'Login failed');
    }
  }

  return (
    <main>
      {/* your Navbar */}
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <input {...register('email', { required: 'Email required' })} />
        {errors.email && <span>{errors.email.message}</span>}

        <input {...register('password', { required: 'Password required' })} />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit" disabled={loginMu.isPending} className="btn-primary">
          {loginMu.isPending ? 'Signing in…' : 'Login'}
        </button>
      </form>
    </main>
  );
}
