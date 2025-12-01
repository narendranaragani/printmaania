export type Review = {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  photoUrls?: string[];
  isVerifiedPurchase: boolean;
  createdAt: Date;
  helpful: number;
  reported: boolean;
};

export type ProductReviews = {
  productId: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
};

/**
 * Generate review ID
 */
export const generateReviewId = (): string => {
  return `REV-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`.toUpperCase();
};

/**
 * Calculate average rating from reviews
 */
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

/**
 * Get rating distribution
 */
export const getRatingDistribution = (reviews: Review[]) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  return distribution;
};

