"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HeroBanner } from "@/components/sections/hero-banner";
import { AboutSectionNew } from "@/components/sections/about-section-new";
import { ProductCategories } from "@/components/sections/product-categories";
import { DynamicProductSections } from "@/components/sections/dynamic-product-sections";
import { SlidingAdsBanner } from "@/components/sections/sliding-ads-banner";
import { GallerySection } from "@/components/sections/gallery";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);
  
  // Show loading state instead of null to prevent hydration mismatch
  if (loading || !user) {
    return (
      <main className="relative overflow-x-hidden min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF6B35]" />
      </main>
    );
  }
  return (
    <main className="relative overflow-x-hidden">
      {/* Hero Banner */}
      <HeroBanner />
      {/* About Section */}
      <AboutSectionNew />
      {/* Product Categories - 19 Cards */}
      <ProductCategories />
      {/* Sliding Ads Banner */}
      <SlidingAdsBanner />
      {/* Dynamic Product Sections */}
      <DynamicProductSections />
      {/* Gallery */}
      <GallerySection />
      {/* Contact */}
      <ContactSection />
      {/* Footer */}
      <Footer />
    </main>
  );
}
