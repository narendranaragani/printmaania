"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award, Truck, Palette, Users, Clock, Shield } from "lucide-react";

export const AboutSectionNew = () => {
  const features = [
    {
      icon: Palette,
      title: "Premium Printing",
      description: "High-quality printing with premium materials and finishes",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick turnaround times with reliable nationwide shipping",
    },
    {
      icon: Users,
      title: "Personalization",
      description: "Fully customizable products to match your unique vision",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all our products",
    },
  ];

  const achievements = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: Award, value: "50,000+", label: "Bulk Orders Served" },
    { icon: Clock, value: "24/7", label: "Customer Support" },
  ];

  return (
    <section id="about" className="section-padding bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#555555]">About PrintMaania</p>
          <h2 className="mt-4 font-display text-4xl text-[#222831] lg:text-5xl font-bold">
            Your One-Stop Destination for Premium Customized Gifts
          </h2>
        </motion.div>

        {/* Brand Story */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full p-8 bg-gradient-to-br from-[#FFD369]/10 to-white border-[#FFD369]/30">
              <h3 className="mb-4 text-2xl font-bold text-[#222831]">Our Story</h3>
              <p className="mb-4 text-[#555555] leading-relaxed">
                PrintMaania is your one-stop destination for premium customized gifts & apparel printing.
                We specialize in personalized mugs, t-shirts, hoodies, frames, polaroid prints & more.
              </p>
              <p className="mb-4 text-[#555555] leading-relaxed">
                Our mission is to turn your memories into timeless products through high-quality printing.
                We believe that every gift should tell a story, and every product should reflect your
                unique personality.
              </p>
              <p className="text-[#555555] leading-relaxed">
                Fast delivery, premium materials, and bulk printing support available for events,
                colleges & corporates. We've been serving customers nationwide with dedication and
                passion for creating memorable products.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full p-8 bg-gradient-to-br from-[#FF6B35]/10 to-white border-[#FF6B35]/30">
              <h3 className="mb-6 text-2xl font-bold text-[#222831]">Why Choose Us</h3>
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="rounded-full bg-[#FFD369]/20 p-3">
                        <feature.icon className="h-6 w-6 text-[#FF6B35]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#222831]">{feature.title}</h4>
                      <p className="text-sm text-[#555555]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {achievements.map((achievement, idx) => (
            <Card key={idx} className="text-center p-6 bg-gradient-to-br from-white to-[#FFD369]/5 border-[#FFD369]/20">
              <achievement.icon className="mx-auto mb-4 h-12 w-12 text-[#FF6B35]" />
              <p className="text-4xl font-bold text-[#222831]">{achievement.value}</p>
              <p className="mt-2 text-sm text-[#555555]">{achievement.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

