'use client';

import Navbar from '@/components/Navbar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterForm } from '@/lib/validators';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      setSuccessMsg(null);
      setGeneralError(null);
      clearErrors();
    },
    onSuccess: (data) => {
      setSuccessMsg(data.message || 'Registered successfully!');
      clearErrors();
      reset();
    },
    onError: (err: any) => {
      setSuccessMsg(null); // hide success if an error occurs
      if (err?.field && err?.message) {
        setError(err.field as keyof RegisterForm, { type: 'server', message: err.message });
      } else {
        setGeneralError(err?.message || 'Registration failed');
      }
    },
  });

  return (
    <main>
      <Navbar />
      <section className="container mx-auto px-4 py-12 max-w-lg">
        <h1 className="text-3xl font-semibold mb-6">Create your account</h1>

        <form
          onSubmit={handleSubmit(values => mutate(values))}
          className="space-y-4 bg-white p-6 rounded-2xl shadow"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Your Name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1 font-bold">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1 font-bold">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="At least 8 characters"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1 font-bold">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex items-center justify-center rounded-full bg-teal-900 text-white py-2.5 hover:bg-black transition disabled:opacity-60"
          >
            {isPending ? 'Creating account…' : 'Sign up'}
          </button>

          {successMsg && !generalError && (
            <p className="text-sm text-green-700 font-bold">{successMsg}</p>
          )}
          {generalError && !successMsg && (
            <p className="text-sm text-red-600 font-bold">Error: {generalError}</p>
          )}

          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-teal-800">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
