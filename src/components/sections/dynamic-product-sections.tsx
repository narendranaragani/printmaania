"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TrendingUp, Award, Sparkles, Zap, Gift, Shirt, Palette } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { ProductCardCompact } from "@/components/product/product-card-compact";

// Extend product for ranking logic
type ExtendedProduct = Product & { orderCount?: number; createdAt?: number };

// Ranking/Sorting
const enrich = (p:Product[]):ExtendedProduct[] =>
  p.map((x,i)=>({
    ...x,
    createdAt:p.length-i,
    orderCount:(x.isBestSeller?60:0)+(x.isTrending?45:0)+(x.reviews?.count||0)*3,
  }));

const enrichedProducts = enrich(products);

// Sections → always fill full
const sections = [
  {id:"trending",title:"Trending",icon:<TrendingUp/>,filter:(p:ExtendedProduct[])=>p.sort((a,b)=>(b.orderCount||0)-(a.orderCount||0))},
  {id:"best",title:"Best Sellers",icon:<Award/>,filter:(p:ExtendedProduct[])=>p.filter(x=>x.isBestSeller).concat(p)},
  {id:"popular",title:"Popular Picks",icon:<Sparkles/>,filter:(p:ExtendedProduct[])=>p.sort((a,b)=>(b.reviews?.count||0)-(a.reviews?.count||0))},
  {id:"new",title:"New Arrivals",icon:<Zap/>,filter:(p:ExtendedProduct[])=>p.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0))},
  {id:"gifts",title:"Gift Collections",icon:<Gift/>,filter:(p:ExtendedProduct[])=>p.filter(x=>["Gifts","Accessories","Frames","Drinkware"].includes(x.category)).concat(p)},
  {id:"apparel",title:"Apparel Zone",icon:<Shirt/>,filter:(p:ExtendedProduct[])=>p.filter(x=>x.category==="Apparel").concat(p)},
  {id:"creative",title:"Creative Prints",icon:<Palette/>,filter:(p:ExtendedProduct[])=>p.filter(x=>["Prints","Stationery"].includes(x.category)).concat(p)},
];

const CARD_W = 250;
const GAP = 10;

export const DynamicProductSections=()=>{

  const [active,setActive]=useState(sections[0]);

  const filtered = useMemo(()=>{
    const output = active.filter(enrichedProducts);
    return output.length? output : enrichedProducts;
  },[active]);

  return(
<div className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-3">

    <div className="pb-6 border-b">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-[#222]">Curated Product Collections</h2>
        <Link href={`/category/${active.id}`} className="text-[#FF6B35] font-semibold hover:text-black">
          View All →
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar mt-4 border-b">
        {sections.map(s=>(
          <button key={s.id}
            onClick={()=>setActive(s)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition
              ${active.id===s.id? "text-[#FF6B35] border-[#FF6B35]" : "text-gray-500 border-transparent hover:text-black"}`}>
            {s.icon}{s.title}
          </button>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-center mt-8">
      <div className="flex overflow-x-scroll no-scrollbar gap-[8px] snap-x snap-mandatory px-2 py-3 cursor-grab active:cursor-grabbing"
        style={{scrollBehavior:"smooth"}}>

        {filtered.map(p=>(
          <div key={p.id} className="snap-center" style={{width:CARD_W}}>
            <div className="bg-white rounded-xl shadow p-2 hover:shadow-lg transition">
              <ProductCardCompact product={p} showBadges/>

              <p className="font-semibold text-gray-800 text-[14px] mt-2">{p.title}</p>
              <p className="text-[12px] text-gray-500 truncate">{p.shortDescription||"Custom Prints & Gifts"}</p>

              {p.pricing?.basePrice && (
                <p className="mt-1 text-[#FF6B35] font-bold">₹{p.pricing.basePrice}<span className="text-xs text-gray-500">
                  {" "}onwards</span></p>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>

    <h3 className="mt-14 mb-3 text-2xl font-bold text-center text-[#111]">Why Choose PrintMania?</h3>

    <div className="overflow-hidden w-full"
         style={{maskImage:"linear-gradient(to right,transparent,black 12%,black 88%,transparent)"}}>

      <div className="flex gap-8 w-[200%] animate-[scrollLinear_18s_linear_infinite] hover:[animation-play-state:paused]">

        <Feature icon="🎨" title="Premium Colour Print"/>
        <Feature icon="⚡" title="Fast Delivery"/>
        <Feature icon="📦" title="Bulk Custom Orders"/>
        <Feature icon="🧵" title="Premium Finishing"/>
        <Feature icon="💳" title="Easy Secure Payments"/>

        {/* duplicate for seamless loop */}
        <Feature icon="🎨" title="Premium Colour Print"/>
        <Feature icon="⚡" title="Fast Delivery"/>
        <Feature icon="📦" title="Bulk Custom Orders"/>
        <Feature icon="🧵" title="Premium Finishing"/>
        <Feature icon="💳" title="Easy Secure Payments"/>
      </div>
    </div>

    {/* Animation Keyframe */}
    <style jsx>{`
      @keyframes scrollLinear {
        from {transform:translateX(0);}
        to {transform:translateX(-50%);}
      }
    `}</style>

  </div>
</div>
)};


// Feature Component
function Feature({icon,title}:{icon:string,title:string}){
  return(
    <div className="flex items-center gap-2 text-[17px] font-semibold text-gray-700">
      <span className="text-3xl">{icon}</span>{title}
    </div>
  );
}
