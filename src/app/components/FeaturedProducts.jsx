"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          console.log("Product image:", product.image); // debug

          return (
            <div
              key={product._id}
              className="border rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              {/* Full Image */}
              <div className="w-full h-56 relative mb-3">
                <Image
                  src={product.image || "/default-device.png"}
                  alt={product.name}
                  fill
                  className="rounded-lg object-contain" // object-contain to show full image
                />
              </div>

              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-purple-600 font-bold">${product.price}</p>

              {/* Show Details Button */}
              <Link
                href={`/product/${product._id}`}
                className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Show Details
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
