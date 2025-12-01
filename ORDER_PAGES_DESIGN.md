# Order Pages Design Documentation

## 🎨 Color Palette

### Primary Colors
- **Primary Orange**: `#FF6B35` - Main CTA buttons, highlights, accents
- **Primary Dark**: `#222831` - Headings, important text
- **Accent Yellow**: `#FFD369` - Secondary highlights

### Neutral Colors
- **Background Gray**: `#F5F5F5` / `#F8F8F8` - Page backgrounds
- **Card White**: `#FFFFFF` - Card backgrounds
- **Text Gray**: `#555555` - Secondary text
- **Border Gray**: `#E5E7EB` - Borders, dividers

### Status Colors
- **Success Green**: `#4CAF50` / `#10B981` - In stock, success states
- **Warning Orange**: `#FF9800` - Low stock, warnings
- **Error Red**: `#EF4444` - Errors, cancellations
- **Info Blue**: `#3B82F6` - Information, delivery estimates

---

## 📐 Layout & Design System

### Normal Order Page (`/order/normal`)

**Design Style**: Modern e-commerce (Flipkart/Amazon inspired)
- **Layout**: 2-column grid (Product details left, Order summary right)
- **Card Style**: White cards with subtle shadows, rounded corners (rounded-2xl)
- **Spacing**: Generous padding (p-6), consistent gaps (gap-6)
- **Typography**: Bold headings (font-bold), clear hierarchy

**Key Sections**:
1. **Product Image Gallery** - Large product image with zoom
2. **Product Info Card** - Title, rating, price, variants
3. **Variant Selectors** - Color swatches, size buttons, material options
4. **Quantity Selector** - +/- buttons with number input
5. **Action Buttons** - "Add to Cart" (outline) + "Buy Now" (filled)
6. **Delivery Estimate** - Blue info card with truck icon
7. **Product Details** - Full description, specifications
8. **Reviews Section** - Star ratings, review count
9. **Recommended Products** - 4-item carousel grid
10. **Order Summary** - Sticky sidebar with cart preview, pricing breakdown

**Order Summary Card Includes**:
- Product thumbnail + details
- Quantity breakdown
- Price calculation
- Shipping charges (Free over ₹500)
- Final payable amount (highlighted)
- Security badges
- Checkout button

---

### Bulk Order Page (`/order/bulk`)

**Design Style**: Premium B2B/Industrial feel
- **Layout**: 3-column grid (Form left 2/3, Pricing/Trust right 1/3)
- **Background**: Dark gradient (gray-900 to gray-800)
- **Card Style**: White/translucent cards with bold borders, industrial feel
- **Typography**: Bold, uppercase labels (font-black, uppercase)

**Key Sections**:
1. **Header** - Bold title, B2B badge, compelling description
2. **Order Form** - Comprehensive fields with icons
3. **Bulk Pricing Table** - Professional table with quantity tiers
4. **Trust Badges** - 4 key benefits with icons
5. **Quick Contact Card** - Gradient CTA card

**Form Fields**:
- Product Type (dropdown)
- Quantity (number input with pricing preview)
- Material (dropdown)
- Artwork Upload (drag & drop zone)
- Custom Requirements (textarea)
- Delivery Location (text input with icon)
- Delivery Date (date picker)
- Contact Number (tel input with icon)
- Email (email input with icon)
- Company Name (optional text input)

**CTA Buttons**:
- 🔵 **Request Quote** - Blue button (primary action)
- 🟢 **WhatsApp Enquiry** - Green button (instant contact)
- 🟡 **Call Sales Team** - Orange button (phone call)

**Trust Badges**:
- 24/7 Support (Headphones icon)
- Fast Dispatch (Truck icon)
- GST Billing (Receipt icon)
- Corporate Branding (Award icon)

---

## 📝 UI Copywriting

### Normal Order Page

**Headings**:
- "Order Summary"
- "Product Details"
- "Customer Reviews"
- "Recommended for You"
- "Delivery Estimate"

**Buttons**:
- "Add to Cart" (with cart icon)
- "Buy Now" (with lightning icon)
- "Proceed to Checkout"
- "View all reviews →"

**Labels**:
- "Color: [Selected]"
- "Size"
- "Material"
- "Quantity"
- "Price (X items)"
- "Shipping"
- "Total Payable"

**Status Messages**:
- "In Stock" (green)
- "Low Stock - Only X left!" (orange)
- "Free" (shipping)
- "Add ₹X more for free shipping"
- "Secure payment • 7-day return policy"
- "Free delivery on orders above ₹500"

---

### Bulk Order Page

**Headings**:
- "Corporate & Bulk Printing Solutions"
- "Bulk Pricing"
- "Why Choose Us"
- "Need Immediate Help?"

**Form Labels**:
- "Product Type *"
- "Quantity *"
- "Material *"
- "Upload Artwork / Logo / Design"
- "Custom Requirements *"
- "Delivery Location *"
- "Required Delivery Date *"
- "Contact Number *"
- "Email Address *"
- "Company Name (Optional)"

**Placeholders**:
- "Select Product Type"
- "Minimum 10 units"
- "Select Material"
- "Click to upload or drag & drop"
- "PNG, JPG, PDF, AI, PSD (Max 10MB)"
- "Specify print type, colors, sizes, special instructions..."
- "Enter complete delivery address"
- "+91 90000 00000"
- "your@email.com"
- "Your company name"

**Buttons**:
- "Request Quote" (with quote icon)
- "WhatsApp Enquiry" (with message icon)
- "Call Sales Team" (with phone icon)

**Trust Badge Text**:
- "24/7 Support"
- "Fast Dispatch"
- "GST Billing"
- "Corporate Branding"

**Pricing Table Headers**:
- "Quantity"
- "Price/Unit"
- "Discount"

**Helper Text**:
- "💡 For orders 1000+, contact us for custom pricing and volume discounts"
- "Our sales team is ready to assist you with custom quotes and bulk order solutions."

---

## 🔄 Order Tracking Flow

### Normal Order Flow:
1. **Browse Products** → `/products`
2. **View Product** → `/products/[slug]`
3. **Add to Cart** → Cart state updated
4. **Checkout** → `/checkout`
5. **Address & Payment** → Form submission
6. **Order Confirmation** → `/order/confirmation/[id]`
7. **Track Order** → `/dashboard/orders/[id]`

### Bulk Order Flow:
1. **Bulk Order Page** → `/order/bulk`
2. **Fill Form** → All required fields
3. **Submit** → WhatsApp/Email enquiry sent
4. **Sales Team Contact** → Phone/email follow-up
5. **Quote Received** → Custom pricing
6. **Order Confirmation** → Invoice generated
7. **Track Order** → `/dashboard/orders/[id]` (if logged in)

---

## 🎯 Key Features Implemented

### Normal Order:
✅ Product image + title + price display
✅ Quantity selector (+ / -)
✅ Add to Cart button
✅ Buy Now button
✅ Delivery estimate card
✅ Reviews + Ratings display
✅ Recommended products carousel
✅ Modern white card design
✅ Stock availability indicator
✅ Variants: size, color, material
✅ Order summary card with:
  - Product + Quantity
  - Total price
  - Shipping charge
  - Final Payable amount

### Bulk Order:
✅ Premium B2B industrial design
✅ Bold text + construction card style
✅ Product type dropdown
✅ Quantity input (10-10,000+)
✅ Artwork upload functionality
✅ Material selection
✅ Custom requirements textarea
✅ Delivery location + date
✅ Contact number + email
✅ Bulk pricing table
✅ Request Quote button
✅ Instant WhatsApp Enquiry
✅ Call Sales Team button
✅ Trust badges (24/7 Support, Fast Dispatch, GST Billing, Corporate Branding)

---

## 📱 Responsive Design

- **Mobile**: Single column, stacked layout
- **Tablet**: 2-column grid for product details
- **Desktop**: Full 3-column layout with sticky sidebar

All components are fully responsive with Tailwind's responsive utilities.

---

## 🚀 Next Steps

1. **Connect to Real Product Data**: Replace mock product with dynamic data from URL params
2. **Integrate Cart Store**: Connect "Add to Cart" to actual cart functionality
3. **Payment Integration**: Add payment gateway to checkout flow
4. **File Upload Backend**: Implement actual file upload for bulk order artwork
5. **Email/WhatsApp Integration**: Connect form submissions to backend services
6. **Order Tracking**: Link orders to Firestore database
7. **Address Management**: Add saved addresses functionality
8. **Coupon Codes**: Add discount code input in order summary

---

## 📄 File Structure

```
src/app/order/
├── page.tsx              # Order type selection page
├── normal/
│   └── page.tsx          # Normal order page (Flipkart-style)
└── bulk/
    └── page.tsx          # Bulk order page (B2B-style)
```

---

**Design System**: Tailwind CSS
**Icons**: Lucide React
**Form Handling**: React Hook Form + Zod
**State Management**: Zustand (cart store)
**Styling**: Modern, clean, professional e-commerce design

