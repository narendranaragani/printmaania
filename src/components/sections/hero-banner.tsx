"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const HeroBanner = () => {

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000); // ⏳ delay = 2 seconds
  }, []);

  return (
    <section className="relative w-full h-[88vh] overflow-hidden bg-black">

      {/* Background Video (instant display) */}
      <video
        src="https://www.dropbox.com/scl/fi/p696jtjo3y4c56hdjwxv4/E_commerce_Hero_Banner_Video_Generation.mp4?rlkey=nukobnyhpfj7bt31agknqq81n&st=0p3sm8x0&raw=1"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-85"
      />

      {/* Overlay (still visible immediately) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT — delayed fade-in */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-start ml-10 mt-10 text-white px-5 
        transition-all duration-700 
        ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <h1 className="text-4xl sm:text-3xl font-extrabold drop-shadow-xl tracking-wide">
  WELCOME TO <span className="text-[orange]">PRINTMANIA</span>
</h1>

{/* Paragraph */}
<p className="mt-4 max-w-2xl text-sm uppercase tracking-[0.3em] text-[#0BF4C9] font-bold">
  Turn Moments Into Memories — Turn Memories Into Gifts.<br />
  Custom Mugs • T-Shirts • Polaroids • Frames • Desk Gifts <br /> 
  Designed With Emotion, Printed With Perfection.
</p>


        {/* Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">

          <Link href="/products">
            <button className="px-7 py-3 text-sm font-semibold border border-[#FFD369] text-[#FFD369] rounded-full 
            hover:bg-[#FFD369] hover:text-black transition">
              Shop Now
            </button>
          </Link>

          <Link href="#products">
            <button className="px-7 py-3 text-sm font-semibold border border-white text-white rounded-full
            hover:bg-white hover:text-black transition">
              View Products
            </button>
          </Link>

          <Link href="/order">
            <button className="px-7 py-3 text-sm font-semibold border border-white text-white rounded-full 
            hover:bg-[#00B5D7] hover:text-black transition">
              Bulk Orders
            </button>
          </Link>

        </div>
      </div>

    </section>
  );
};
