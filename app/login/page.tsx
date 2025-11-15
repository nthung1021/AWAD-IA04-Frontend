'use client';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type LoginForm = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const loginMu = useLogin();

  async function onSubmit(data: LoginForm) {
    try {
      await loginMu.mutateAsync(data);
      router.push('');
    } catch (err: any) {
      // show error message
      alert(err?.response?.data?.message ?? 'Login failed');
    }
  }

  return (
    <main>
      <Navbar />
      <section className="site-container py-12 max-w-lg">
        <h1 className="form-title">Welcome back</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-card"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Your password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="field-error">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loginMu.isPending} 
            className="btn-primary"
          >
            {loginMu.isPending ? 'Signing in…' : 'Login'}
          </button>
          
          <p className="text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline text-teal-800">Create one</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
