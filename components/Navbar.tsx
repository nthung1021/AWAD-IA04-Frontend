'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="py-6 border-b">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between">
          <Link href="/" className="inline-block font-semibold text-teal-900">Brand</Link>
          <ul className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
            <li><a className="text-teal-900 hover:text-teal-700" href="#">About</a></li>
            <li><a className="text-teal-900 hover:text-teal-700" href="#">Pricing</a></li>
            <li><a className="text-teal-900 hover:text-teal-700" href="#">Contact</a></li>
            <li><a className="text-teal-900 hover:text-teal-700" href="#">Blog</a></li>
          </ul>
          <div className="hidden md:flex gap-3">
            <Link href="/login" className="inline-flex py-2.5 px-4 text-sm border border-teal-900 rounded-full hover:bg-teal-900 hover:text-white transition">
              Login
            </Link>
            <Link href="/register" className="inline-flex py-2.5 px-4 text-sm rounded-full bg-teal-900 text-white hover:bg-black transition">
              Sign up
            </Link>
          </div>
          <button className="md:hidden text-teal-900" onClick={() => setOpen(v => !v)}>
            <span className="sr-only">Toggle</span>☰
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pt-4 pb-2">
          <div className="flex flex-col gap-3">
            <Link href="/login" className="py-2.5 px-4 border border-teal-900 rounded-full">Login</Link>
            <Link href="/register" className="py-2.5 px-4 rounded-full bg-teal-900 text-white">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
