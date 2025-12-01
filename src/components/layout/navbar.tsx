"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import AuthButton from "@/components/AuthButton";
import { useAuth } from "@/context/auth-context";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show Dashboard link after hydration to prevent mismatch
  const navLinks = mounted && user && !loading
    ? [...baseLinks, { label: "Dashboard", href: "/dashboard" }]
    : baseLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base-dark/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-xl text-white">
          Print<span className="text-accent">Maania</span>
        </Link>

        <nav className="hidden gap-6 text-sm text-white/80 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "transition hover:text-white",
                pathname === link.href && "text-white font-semibold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-white/70 transition hover:text-white" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
};


