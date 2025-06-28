"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { partnerBrands } from '@/app/data';

const PartnerBrands = () => {
  const rowRef = useRef(null);

  // Extract brand names from the centralized data
  const brands = partnerBrands.map(brand => brand.name);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const totalWidth = row.scrollWidth / 2;
    const duration = 18;
    const tween = gsap.to(row, {
      x: -totalWidth,
      duration,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % -totalWidth),
      },
    });
    return () => tween.kill();
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partner Brands</h2>
        <p className="text-gray-600 mb-10 text-lg">
          We collaborate with premium brands to ensure quality and excellence in every project.
        </p>
        <div className="relative overflow-hidden w-full">
          <div
            ref={rowRef}
            className="flex gap-x-20 whitespace-nowrap will-change-transform"
            style={{ width: 'max-content' }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={brand + i}
                className="inline-block text-lg md:text-xl font-semibold text-gray-400 tracking-wider uppercase px-4"
                style={{ letterSpacing: "0.09em" }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;