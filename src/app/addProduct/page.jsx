"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AddProductForm() {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const category = form.category.value;
    const price = form.price.value;
    const description = form.description.value;

    if (!session?.user) {
      toast.error("You must be logged in");
      return;
    }

    // Image handling – temporary URL for preview/demo
    const imageUrl = image ? URL.createObjectURL(image) : "/default-device.png";

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          price,
          description,
          image: imageUrl,
           userEmail: session.user.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product added successfully!");
        form.reset();
        setImage(null);
      } else {
        toast.error(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="flex justify-center mt-6 items-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-purple-700">
          Add New Product
        </h2>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            name="name"
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Computer">Computer</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            name="price"
            type="number"
            min="1"
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
