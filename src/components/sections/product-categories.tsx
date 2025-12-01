"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";

export const ProductCategories = () => {
  return (
    <section id="products" className="section-padding bg-base-dark overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Browse Our Collection</p>
          <h2 className="mt-4 font-display text-4xl text-white lg:text-5xl">
            20 Product Categories
          </h2>
          <p className="mt-2 text-white/70">
            Explore our complete range of customizable products
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

