'use client';

import Navbar from '@/components/Navbar';
import { useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterForm } from '@/lib/validators';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const registerMu = useRegister();

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  async function mutate(data: RegisterForm) {
    setGeneralError(null);
    setSuccessMsg(null);
    try {
      const res = await registerMu.mutateAsync(data);
      setSuccessMsg(res.message || 'Registered successfully! Please login to continue.');
      setTimeout(() => {router.push('/login');}, 1000);
    } catch (err: any) {
      setGeneralError(err?.response?.data?.message ?? 'Registration failed');
    }
  }

  return (
    <main>
      <Navbar />
      <section className="site-container py-12 max-w-lg">
        <h1 className="form-title">Create your account</h1>

        <form
          onSubmit={handleSubmit(values => mutate(values))}
          className="form-card"
        >
          <div>
            <label className="input-label">Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Your Name"
              {...register('name')}
            />
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          <div>
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="At least 8 characters"
              {...register('password')}
            />
            {errors.password && <p className="field-error">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={registerMu.isPending}
            className="btn-primary"
          >
            {registerMu.isPending ? 'Creating account…' : 'Sign up'}
          </button>

          {/* Mutually exclusive alerts */}
          {successMsg && !generalError && (
            <p className="alert-success">{successMsg}</p>
          )}
          {generalError && !successMsg && (
            <p className="alert-error">Error: {generalError}</p>
          )}

          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="auth-link">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
