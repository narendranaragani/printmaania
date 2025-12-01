// src/components/AuthButton.tsx
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function AuthButton() {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted || loading || !user) {
    return null;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-1.5 text-xs text-white hover:bg-white/10 border border-white/10"
      >
        {user.photo && (
          <img
            src={user.photo}
            alt={user.name}
            className="h-7 w-7 rounded-full border border-white/30 object-cover"
          />
        )}
        <span className="max-w-[110px] truncate font-medium">{user.name}</span>
        <span className="text-[10px] opacity-70">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white py-1 text-sm text-gray-800 shadow-lg border border-gray-100">
          <Link
            href="/dashboard"
            className="block px-3 py-2 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            My Account
          </Link>
          <Link
            href="/dashboard"
            className="block px-3 py-2 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>
          <button
            className="block w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
            onClick={() => {
              setOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
