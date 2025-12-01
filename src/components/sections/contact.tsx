"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactItems = [
  { icon: Phone, label: "Call us", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "hello@printmaania.com" },
  { icon: MapPin, label: "Studio", value: "Hyderabad, India" },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-[#F8F8F8]">
      <div className="mx-auto max-w-5xl space-y-10 px-4">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#555555]">Contact</p>
          <h2 className="mt-4 font-display text-3xl text-[#222831] lg:text-4xl font-bold">
            Need mockups, samples, or pricing decks? Let&apos;s talk.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {contactItems.map((item) => (
            <motion.div
              key={item.label}
              className="flex flex-col gap-2 p-6 text-center rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <item.icon className="mx-auto h-6 w-6 text-[#FF6B35]" />
              <p className="text-sm text-[#555555]">{item.label}</p>
              <p className="text-lg font-bold text-[#222831]">{item.value}</p>
            </motion.div>
          ))}
        </div>
        <Card className="flex flex-col gap-6 rounded-[32px] border-[#FFD369]/30 bg-gradient-to-br from-[#FFD369]/10 to-white p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#555555]">Ready to produce?</p>
          <h3 className="text-2xl font-bold text-[#222831]">
            Share your brief and we&apos;ll turn it into WhatsApp-ready proofs within 24 hours.
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild>
              <a href="/order">Start Order</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

