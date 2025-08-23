import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function ProductDetails({ params }) {
  const collection = await dbConnect(collectionNameObj.productCollection);
  const product = await collection.findOne({ _id: new ObjectId(params.id) });

  if (!product) {
    return <h2 className="text-center mt-10 text-red-500">Product not found</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        {/* Full Image */}
        <img
          src={product.image || "/default-device.png"}
          alt={product.name}
          className="w-full max-h-[600px] object-contain rounded-lg mb-6 bg-gray-100"
        />

        <h1 className="text-3xl font-bold text-purple-700 mb-3">
          {product.name}
        </h1>

        <p className="text-lg text-gray-700 mb-2">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="text-lg text-purple-600 font-bold mb-4">
          Price: ${product.price}
        </p>

        <p className="text-gray-800 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
