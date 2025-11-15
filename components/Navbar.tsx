"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="py-6 border-b">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between">
          <Link href="/" className="inline-block font-semibold text-teal-900">
            Brand
          </Link>

          {/* Center menu */}
          <ul className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
            <li><a className="text-teal-900 hover:text-teal-700" href="#">About</a></li>
            <li><a className="text-teal-900 hover:text-teal-700" href="#">Pricing</a></li>
            <li><a className="text-teal-900 hover:text-teal-700" href="#">Contact</a></li>
            <li><a className="text-teal-900 hover:text-teal-700" href="#">Blog</a></li>
          </ul>

          {/* RIGHT SIDE — Conditional rendering */}
          <div className="hidden md:flex gap-3">
            {!user ? (
              <>
                <Link href="/login" className="btn-secondary">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span className="font-semibold text-teal-900">
                  Hello, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden text-teal-900"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pt-4 pb-2">
          <div className="flex flex-col gap-3">
            {!user ? (
              <>
                <Link href="/login" className="btn-secondary">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span className="font-semibold text-teal-900">
                  Hello, {user.name}
                </span>
                <button
                  className="btn-secondary"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
