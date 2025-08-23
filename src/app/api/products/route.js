import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// POST -> Add new product
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, category, price, description, image, userEmail } = body;

    if (!name || !category || !price || !description || !userEmail) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ directly get the products collection
    const collection = await dbConnect(collectionNameObj.productCollection);

    const result = await collection.insertOne({
      name,
      category,
      price,
      description,
      image,
      userEmail,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// GET -> Fetch products by user email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const collection = await dbConnect(collectionNameObj.productCollection);

    let query = {};
    if (email) query.userEmail = email;

    const products = await collection.find(query).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
