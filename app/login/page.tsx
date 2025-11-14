'use client';

import Navbar from '@/components/Navbar';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LoginForm = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = (data: LoginForm) => {
    setMsg('Mock login success — redirecting…');

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <main>
      <Navbar />
      <section className="site-container">
        <h1 className="form-title">Welcome back</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-card"
        >
          <div>
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          <div>
            <label className="input-label">Password</label>
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
            disabled={!!msg}
            className="btn-primary"
          >
            {msg ? 'Redirecting…' : 'Login'}
          </button>

          {msg && <p className="alert-success mt-2">{msg}</p>}

          <p className="text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline text-teal-800">Create one</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
