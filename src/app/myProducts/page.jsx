'use client';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyProducts() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/products?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch(console.error);
    }
  }, [session]);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Device Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.category}</td>
                <td className="border px-4 py-2">${p.price}</td>
                <td className="border px-4 py-2">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-20 h-20 object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
