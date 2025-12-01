"use client";

import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed successfully!");
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-white/10 bg-base-dark/95">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 font-display text-2xl text-white">
              Print<span className="text-accent">Maania</span>
            </h3>
            <p className="mb-4 text-white/70">
              Your one-stop destination for premium customized gifts & apparel printing.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-white/70 transition hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-white/70 transition hover:text-white">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white/70 transition hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-white/70 transition hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/policies/privacy" className="text-white/70 transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="text-white/70 transition hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-white/70 transition hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="text-white/70 transition hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Contact & Newsletter</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-white/70">
                <Phone className="h-4 w-4" />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@printmaania.com" className="hover:text-white">
                  info@printmaania.com
                </a>
              </div>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <Button type="submit" variant="primary" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} PrintMaania. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

