"use client";

import { Star } from "lucide-react";
import type { Product } from "@/lib/products";

type ProductReviewsProps = {
  product: Product;
};

export const ProductReviews = ({ product }: ProductReviewsProps) => {
  const reviews = product.reviews;
  if (!reviews) return null;

  const rating = reviews.rating;
  const reviewCount = reviews.count;

  // Mock rating distribution (in real app, this would come from reviews data)
  const ratingDistribution = {
    5: Math.floor(reviewCount * 0.6),
    4: Math.floor(reviewCount * 0.25),
    3: Math.floor(reviewCount * 0.1),
    2: Math.floor(reviewCount * 0.03),
    1: Math.floor(reviewCount * 0.02),
  };

  const maxRatingCount = Math.max(...Object.values(ratingDistribution));

  // Mock individual review
  const sampleReview = {
    customerName: "Alex Mathio",
    rating: 5,
    date: "13 Oct 2024",
    comment: "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world.",
    avatar: "https://ui-avatars.com/api/?name=Alex+Mathio&background=FF6B35&color=fff",
  };

  return (
    <section className="mt-12 border-t border-[#E5E7EB] pt-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#222831]">Rating & Reviews</h2>
        </div>

        {/* Overall Rating */}
        <div className="flex items-start gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#222831]">{rating}</div>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.floor(rating)
                      ? "fill-[#FF6B35] text-[#FF6B35]"
                      : star <= rating
                      ? "fill-[#FF6B35]/50 text-[#FF6B35]/50"
                      : "text-[#E5E7EB]"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#555555] mt-2">({reviewCount} New Reviews)</p>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((starRating) => {
              const count = ratingDistribution[starRating as keyof typeof ratingDistribution];
              const percentage = maxRatingCount > 0 ? (count / maxRatingCount) * 100 : 0;
              
              return (
                <div key={starRating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-semibold text-[#222831]">{starRating}</span>
                    <Star className="h-4 w-4 fill-[#FF6B35] text-[#FF6B35]" />
                  </div>
                  <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF6B35] rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#555555] w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sample Review */}
        <div className="border-t border-[#E5E7EB] pt-6">
          <div className="flex gap-4">
            <img
              src={sampleReview.avatar}
              alt={sampleReview.customerName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-[#222831]">{sampleReview.customerName}</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= sampleReview.rating
                          ? "fill-[#FF6B35] text-[#FF6B35]"
                          : "text-[#E5E7EB]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#555555]">{sampleReview.date}</span>
              </div>
              <p className="text-[#555555] leading-relaxed">{sampleReview.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

