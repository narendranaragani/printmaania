import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="section-padding flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-white">Product Not Found</h2>
        <p className="mb-8 text-white/70">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <Button variant="primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}

