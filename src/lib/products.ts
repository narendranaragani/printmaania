export type ProductImage = {
  url: string;
  alt: string;
  type: "mockup" | "real";
};

export type ProductColor = {
  name: string;
  hex?: string;
  image?: string;
};

export type ProductSize = string;
export type ProductMaterial = string;

export type ProductOption = {
  label: string;
  values: string[];
};

import type { ProductPricing } from "./pricing";

export type Product = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  images: ProductImage[];
  printingMethods: string[];
  estimatedDelivery: string;
  colors?: ProductColor[];
  sizes?: ProductSize[];
  materials?: ProductMaterial[];
  customOptions?: ProductOption[];
  minQuantity?: number;
  bulkMinQuantity?: number;
  reviews?: {
    rating: number;
    count: number;
  };
  category: string;
  pricing?: ProductPricing;
  isBestSeller?: boolean;
  isTrending?: boolean;
  tags?: string[];
};

export const products: Product[] = [
  {
    id: "custom-mugs",
    title: "Custom Mugs",
    slug: "custom-mugs",
    shortDescription: "Matte, metallic, temperature, inner-color mugs with high-resolution sublimation printing.",
    fullDescription: "Premium quality mugs available in multiple finishes including matte, metallic, and temperature-changing variants. Perfect for personalized gifts and promotional items.",
    images: [
      { url: "https://i.pinimg.com/1200x/db/20/07/db200736a5e337bb06ef3e6a6c2a40ce.jpg", alt: "Custom Matte Mug", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/27/89/11/278911e7a0c78b9e5ed4b84781ad608b.jpg", alt: "Mug Side View", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/58/4b/62/584b625cbe204538153e90dc45cd6a45.jpg", alt: "Mug Close-up", type: "real" },
      { url: "https://i.pinimg.com/1200x/01/55/b5/0155b5fb8443bdc78684d8d8447d6bc9.jpg", alt: "Color Variations", type: "real" },
    ],
    printingMethods: ["Sublimation", "UV Print", "Screen Print"],
    estimatedDelivery: "3-7 days",
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
      { name: "Matte White", hex: "#ffffff" },
      { name: "Metallic Gold", hex: "#d4af37" },
      { name: "Metallic Silver", hex: "#c0c0c0" },
      { name: "Temperature Changing", hex: "#ff6b6b" },
    ],
    minQuantity: 1,
    bulkMinQuantity: 25,
    reviews: { rating: 4.5, count: 128 },
    category: "Drinkware",
    pricing: {
      basePrice: 299,
      bulkPricing: [
        { minQuantity: 25, pricePerUnit: 249, discountPercent: 17 },
        { minQuantity: 50, pricePerUnit: 229, discountPercent: 23 },
        { minQuantity: 100, pricePerUnit: 199, discountPercent: 33 },
      ],
      setupFee: 50,
    },
    isBestSeller: true,
    isTrending: true,
    tags: ["gifts", "customizable", "premium"],
  },
  {
    id: "photo-frames",
    title: "Photo Frames",
    slug: "photo-frames",
    shortDescription: "Acrylic, wood, glass frames with table/wall mount options for your precious memories.",
    images: [
      { url: "https://i.pinimg.com/1200x/e1/3c/4c/e13c4cf7897169f0a098028871601947.jpg", alt: "Photo Frame", type: "mockup" },
      { url: "https://i.pinimg.com/736x/e3/97/26/e397261ab08d892792462f725f729055.jpg", alt: "Frame Variants", type: "real" },
      { url: "https://i.pinimg.com/1200x/e0/c7/4c/e0c74c56588763e505a6d6ced00b74d9.jpg", alt: "Frame Variants", type: "real" },
      { url: "https://i.pinimg.com/1200x/85/e3/5f/85e35f9d66a6474923e4381c32d5950d.jpg", alt: "Frame Variants", type: "real" },  
    ],
    printingMethods: ["Print", "Engraving"],
    estimatedDelivery: "5-10 days",
    materials: ["Acrylic", "Wood", "Glass"],
    customOptions: [
      { label: "Mount Type", values: ["Table Mount", "Wall Mount", "Stand"] },
      { label: "Size", values: ["4x6", "5x7", "8x10", "11x14"] },
    ],
    pricing: {
      basePrice: 249,
    },
    category: "Frames",
  },
  {
    id: "polaroids",
    title: "Polaroids",
    slug: "polaroids",
    shortDescription: "Retro mini prints in matte/glossy finish, available in bundles for special moments.",
    images: [
      { url: "https://i.pinimg.com/736x/ef/f4/ec/eff4ec686229809b7833d75194812f04.jpg", alt: "Polaroid Prints", type: "mockup"},
      { url: "https://i.pinimg.com/736x/d5/6e/49/d56e49c80f057ae406d01aa2176372bc.jpg", alt: "Polaroid Prints", type: "real"},
      { url: "https://i.pinimg.com/1200x/31/34/d9/3134d9b3d581d8a7438db0dad278aadf.jpg", alt: "Polaroid Prints", type: "real"},
      { url: "https://i.pinimg.com/1200x/86/b6/d4/86b6d46ea6ccae316184ef03e3f405b3.jpg", alt: "Polaroid Prints", type: "real"},
    ],
    printingMethods: ["Instant Print"],
    estimatedDelivery: "3-5 days",
    materials: ["Matte Paper", "Glossy Paper"],
    customOptions: [
      { label: "Bundle Size", values: ["Single", "Pack of 10", "Pack of 25", "Pack of 50"] },
    ],
    pricing: {
      basePrice: 10,
    },
    category: "Prints",
  },
  {
    id: "keychains",
    title: "Keychains",
    slug: "keychains",
    shortDescription: "Acrylic, metal, and leather keychains with custom engraving options.",
    images: [
      { url: "https://i.pinimg.com/1200x/a4/f6/a6/a4f6a6b49fe5d44b5adb25d22ef27f88.jpg", alt: "Custom Keychains", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/9d/bc/c5/9dbcc5f7b23416817570949e2b703830.jpg", alt: "Custom Keychains", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/07/e0/a8/07e0a823f5ffffb437ee0d5fdb6e8077.jpg", alt: "Custom Keychains", type: "mockup" },
    ],
    printingMethods: ["Engraving", "Print", "UV Print"],
    estimatedDelivery: "3-7 days",

    materials: ["Acrylic", "Metal", "Leather"],
    bulkMinQuantity: 25,
    category: "Accessories",
  },
  {
    id: "banners",
    title: "Banners",
    slug: "banners",
    shortDescription: "Vinyl/fabric banners with roll-up, die-cut options for large format printing.",
    images: [
      { url: "https://i.pinimg.com/1200x/1c/68/0f/1c680f898d3c620e22bff1c1e2533e35.jpg", alt: "Custom Banner", type: "mockup" },
      { url: "https://i.pinimg.com/736x/6a/79/6e/6a796e268143c8c75f2aa253b10e95e0.jpg", alt: "Custom Banner", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/bd/c1/eb/bdc1eb753a9c45d352df7a2be04defd7.jpg", alt: "Custom Banner", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/13/86/1f/13861f1f988cf14d4cb3cf1e34a520db.jpg", alt: "Custom Banner", type: "mockup" },
      
    ],
    printingMethods: ["Large Format Print", "Vinyl Print", "Fabric Print"],
    estimatedDelivery: "5-10 days",
    materials: ["Vinyl", "Fabric", "Mesh"],
    customOptions: [
      { label: "Type", values: ["Roll-up", "Hanging", "Die-cut", "Retractable"] },
      { label: "Size", values: ["Custom", "3x6ft", "4x8ft", "6x10ft"] },
    ],
    category: "Signage",
  },
  {
    id: "t-shirts",
    title: "T-Shirts",
    slug: "t-shirts",
    shortDescription: "Round-neck, oversized, collar T-shirts in cotton and dry-fit fabrics.",
    images: [
      { url: "https://i.pinimg.com/736x/08/11/df/0811dfcd6951969a18e4d80069203f51.jpg", alt: "Custom T-Shirt", type: "mockup" },
      { url: "https://i.pinimg.com/736x/37/a9/08/37a9083a1e9eba4e17c962a5f9b21949.jpg", alt: "T-Shirt Variants", type: "real" },
    ],
    printingMethods: ["Screen Print", "DTG Print", "Heat Transfer"],
    estimatedDelivery: "5-10 days",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Navy Blue", hex: "#1a237e" },
      { name: "Gray", hex: "#616161" },
      { name: "Red", hex: "#d32f2f" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    materials: ["Cotton", "Dry-Fit", "Polyester Blend"],
    bulkMinQuantity: 25,
    category: "Apparel",
    pricing: {
      basePrice: 499,
      variants: [
        { size: "S", price: 499 },
        { size: "M", price: 499 },
        { size: "L", price: 549 },
        { size: "XL", price: 599 },
        { size: "XXL", price: 649 },
      ],
      bulkPricing: [
        { minQuantity: 25, pricePerUnit: 449, discountPercent: 10 },
        { minQuantity: 50, pricePerUnit: 399, discountPercent: 20 },
        { minQuantity: 100, pricePerUnit: 349, discountPercent: 30 },
      ],
      setupFee: 100,
    },
    isBestSeller: true,
    isTrending: true,
    tags: ["apparel", "customizable", "fashion"],
  },
  {
    id: "hoodies",
    title: "Hoodies",
    slug: "hoodies",
    shortDescription: "Printed and embroidered hoodies with front/back pocket options.",
    images: [
      { url: "https://i.pinimg.com/1200x/13/75/72/13757206e946c088e1de7a9975313e84.jpg", alt: "Custom Hoodie", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/2b/ba/bc/2bbabc9698e2d2f26d522968922e972c.jpg", alt: "Custom Hoodie", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/0d/6f/d3/0d6fd342226ab7963c155d4e4c71caf2.jpg", alt: "Custom Hoodie", type: "mockup" },
      
    ],
    printingMethods: ["Screen Print", "Embroidery", "DTG Print"],
    estimatedDelivery: "7-12 days",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1a237e" },
      { name: "Gray", hex: "#616161" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    customOptions: [
      { label: "Pocket", values: ["Front Pocket", "Back Pocket", "None"] },
    ],
    bulkMinQuantity: 25,
    category: "Apparel",
  },
  {
    id: "sweat-shirts",
    title: "Sweat Shirts",
    slug: "sweat-shirts",
    shortDescription: "Winter cotton and fleece sweat shirts with custom sleeve printing.",
    images: [
      { url: "https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160", alt: "Sweatshirt", type: "mockup" },
      { url: "https://i.pinimg.com/736x/32/8e/f9/328ef93f19d6b02761aad4b00dda4fd1.jpg", alt: "Sweatshirt", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/65/94/be/6594be3ba574c3fcee5e9bc7ee99736e.jpg", alt: "Sweatshirt", type: "mockup" },
    ],
    printingMethods: ["Screen Print", "DTG Print"],
    estimatedDelivery: "7-12 days",
    materials: ["Cotton", "Fleece", "French Terry"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    bulkMinQuantity: 25,
    category: "Apparel",
  },
  {
    id: "full-hand-tees",
    title: "Full-Hand Tees",
    slug: "full-hand-tees",
    shortDescription: "Varsity-style prints with custom sleeve designs and full-hand graphics.",
    images: [
      { url: "https://i.pinimg.com/1200x/ba/9d/ae/ba9daebdd3702ecce69c12cb72d56aa9.jpg", alt: "Full Hand Tee", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/2a/21/85/2a21852d5ac933275b4d73c5faff246a.jpg", alt: "Full Hand Tee", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/a7/70/e9/a770e92915446e18caac1b83a2e832d8.jpg", alt: "Full Hand Tee", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/f8/33/8f/f8338fa9a8ce5a4ff42ec3e781069839.jpg", alt: "Full Hand Tee", type: "mockup" },
    ],
    printingMethods: ["Screen Print", "DTG Print"],
    estimatedDelivery: "7-12 days",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bulkMinQuantity: 25,
    category: "Apparel",
  },
  {
    id: "posters",
    title: "Posters",
    slug: "posters",
    shortDescription: "High-quality A3, A2, A1 posters in matte and gloss finishes.",
    images: [
      { url: "https://i.pinimg.com/736x/03/21/bc/0321bc261d39aac0aa787216ff3c080e.jpg", alt: "Custom Poster", type: "mockup" },
      { url: "https://i.pinimg.com/736x/1b/4a/30/1b4a302f20590770da1e59e871720a9e.jpg", alt: "Custom Poster", type: "mockup" },
      { url: "https://quapri.in/wp-content/uploads/2024/04/1-9-1.webp", alt: "Custom Poster", type: "mockup" },
      { url: "https://s1-ecp.signs.com/3331/Standard-Poster-460x350-16050.jpg", alt: "Custom Poster", type: "mockup" },
    ],
    printingMethods: ["Digital Print", "Offset Print"],
    estimatedDelivery: "3-7 days",
    customOptions: [
      { label: "Size", values: ["A3", "A2", "A1", "Custom"] },
      { label: "Finish", values: ["Matte", "Gloss"] },
    ],
    category: "Prints",
  },
  {
    id: "id-cards",
    title: "ID Cards",
    slug: "id-cards",
    shortDescription: "PVC ID cards with lanyard options and QR code printing.",
    images: [
      { url: "https://i.pinimg.com/736x/d7/a7/4e/d7a74e857301f436f7d9bbb183952a68.jpg", alt: "ID Card", type: "mockup" },
      { url: "https://i.pinimg.com/736x/e2/f7/0d/e2f70d648574a56daf11c336bf41f551.jpg", alt: "ID Card", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/42/8e/03/428e03baa836ee9c39c086e6d3e5a2e9.jpg", alt: "ID Card", type: "mockup" },
    ],
    printingMethods: ["PVC Print", "QR Code Print"],
    estimatedDelivery: "5-10 days",
    customOptions: [
      { label: "Lanyard", values: ["Included", "Not Included"] },
    ],
    bulkMinQuantity: 25,
    category: "Cards",
  },
  {
    id: "signature-day-tees",
    title: "Signature Day Tees",
    slug: "signature-day-tees",
    shortDescription: "Names printed on back with batch year and custom designs.",
    images: [
      { url: "https://i.pinimg.com/1200x/13/85/51/138551851084a35c585a46b04cd98752.jpg", alt: "Signature Tee", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/c3/b0/cc/c3b0ccbf06035e656b6a7ee4d082565a.jpg", alt: "Signature Tee", type: "mockup" },
      { url: "https://i.pinimg.com/736x/51/e1/1b/51e11bb2f613996c8953464f52d9b90e.jpg", alt: "Signature Tee", type: "mockup" },
    ],
    printingMethods: ["Screen Print", "DTG Print"],
    estimatedDelivery: "7-14 days",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bulkMinQuantity: 25,
    category: "Apparel",
  },
  {
    id: "puzzle-boards",
    title: "Puzzle Boards",
    slug: "puzzle-boards",
    shortDescription: "Photo puzzles with 30-100 pieces, perfect for personalized gifts.",
    images: [
      { url: "https://i.pinimg.com/474x/4d/f2/10/4df2107a60840bf4902a995afedff142.jpg", alt: "Photo Puzzle", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/50/f5/5d/50f55db01b5f2aa1f6519b1b1efe798a.jpg", alt: "Photo Puzzle", type: "mockup" },
      { url: "https://i.pinimg.com/736x/5c/d0/f0/5cd0f099e363cafd02b7d12a2bd716b8.jpg", alt: "Photo Puzzle", type: "mockup" },
    ],
    printingMethods: ["Print on Board"],
    estimatedDelivery: "7-14 days",
    customOptions: [
      { label: "Pieces", values: ["30 pieces", "60 pieces", "100 pieces"] },
    ],
    category: "Gifts",
  },
  {
    id: "stickers",
    title: "Stickers",
    slug: "stickers",
    shortDescription: "Vinyl, transparent, and die-cut stickers for any application.",
    images: [
      { url: "https://i.pinimg.com/736x/b5/89/78/b589785291f5b6cfeadbb4615e0fe1d8.jpg", alt: "Custom Stickers", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/55/49/ef/5549eff038bb4bdc753ad7ace0045fea.jpg", alt: "Custom Stickers", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/90/5d/f0/905df088960c3186c4e13ff13e00cffc.jpg", alt: "Custom Stickers", type: "mockup" },
    ],
    printingMethods: ["Vinyl Print", "Die-cut"],
    estimatedDelivery: "3-7 days",
    materials: ["Vinyl", "Transparent", "Paper"],
    bulkMinQuantity: 25,
    category: "Accessories",
  },
  {
    id: "diaries",
    title: "Diaries",
    slug: "diaries",
    shortDescription: "Customized diaries with name embossing and custom cover designs.",
    images: [
      { url: "https://i.pinimg.com/1200x/5d/0f/b8/5d0fb8e105b2f4d424bdeca094a325f1.jpg", alt: "Custom Diary", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/d5/47/63/d54763fdf0bc4f994d25d8d581327bec.jpg", alt: "Custom Diary", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/b7/96/84/b796843762a71bf00339adccfb2110e6.jpg", alt: "Custom Diary", type: "mockup" },
    ],
    printingMethods: ["Embossing", "Print", "Foil Stamping"],
    estimatedDelivery: "7-14 days",
    customOptions: [
      { label: "Cover", values: ["Hard Cover", "Soft Cover", "Leather"] },
    ],
    category: "Stationery",
  },
  {
    id: "bags",
    title: "Bags",
    slug: "bags",
    shortDescription: "Tote bags and fabric bags with custom printing and designs.",
    images: [
      { url: "https://i.pinimg.com/736x/7a/0d/04/7a0d0464e4339b2c9973b14d9ffd2427.jpg", alt: "Tote Bag", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/da/0c/98/da0c9831a6f4052fbdfab6e918dd7b87.jpg", alt: "Tote Bag", type: "mockup" },
      { url: "https://i.pinimg.com/736x/84/a4/e2/84a4e2a0266bab20addd3b4613ac9d6a.jpg", alt: "Tote Bag", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/63/2b/68/632b689f586d5a33c033927cd0be7073.jpg", alt: "Tote Bag", type: "mockup" },
    ],
    printingMethods: ["Screen Print", "DTG Print", "Embroidery"],
    estimatedDelivery: "7-12 days",
    materials: ["Canvas", "Cotton", "Jute"],
    bulkMinQuantity: 25,
    category: "Accessories",
  },
  {
    id: "pens",
    title: "Pens",
    slug: "pens",
    shortDescription: "Engraved and printed pens with logo customization options.",
    images: [
      { url: "https://i.pinimg.com/1200x/21/a2/60/21a26051543f1ef009be49b932c22ac9.jpg", alt: "Custom Pen", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/0f/5f/5b/0f5f5b6b03b3e2bdb459dad20d22bcba.jpg", alt: "Custom Pen", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/9c/c4/72/9cc472beb3b6fb1f74d09d1c9db4714f.jpg", alt: "Custom Pen", type: "mockup" },
    ],
    printingMethods: ["Engraving", "Print", "Laser Engraving"],
    estimatedDelivery: "5-10 days",
    bulkMinQuantity: 25,
    category: "Stationery",
  },
  {
    id: "certificates",
    title: "Certificates",
    slug: "certificates",
    shortDescription: "Laminated certificates with frame add-on options.",
    images: [
      { url: "https://i.pinimg.com/736x/80/f3/25/80f3259ad9bb993d87fc373709ce6698.jpg", alt: "Certificate", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/4e/5a/5f/4e5a5f4a37820a689a6a73c3182473d4.jpg", alt: "Certificate", type: "mockup" },
      { url: "https://i.pinimg.com/1200x/a1/94/e2/a194e27e87e3cc3051bca98db98fff3e.jpg", alt: "Certificate", type: "mockup" },
    ],
    printingMethods: ["Print", "Lamination"],
    estimatedDelivery: "5-10 days",
    customOptions: [
      { label: "Frame", values: ["Included", "Not Included"] },
    ],
    category: "Documents",
  },
  {
    id: "other-gifts",
    title: "Other Gifts",
    slug: "other-gifts",
    shortDescription: "Mixed gift items and custom request form for unique printing needs.",
    images: [
      { url: "https://i.pinimg.com/1200x/e7/53/fd/e753fda8f294d83d9b5e4a329a033192.jpg", alt: "Gift Items", type: "mockup" },
    ],
    printingMethods: ["Various"],
    estimatedDelivery: "5-14 days",
    category: "Gifts",
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

