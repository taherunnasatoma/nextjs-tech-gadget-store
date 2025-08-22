'use server'

import dbConnect, { collectionNameObj } from '@/lib/dbConnect'
import bcrypt from 'bcryptjs'


export async function registerUser({ name, email, password, image }) {
  try {
    const usersCollection = await dbConnect(collectionNameObj.userCollection)

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return { success: false, error: 'Email already in use' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      image: image || '/default-user.png', // fallback if no image provided
      createdAt: new Date(),
    }

    await usersCollection.insertOne(newUser)

    return { success: true }
  } catch (error) {
    console.error('Error registering user:', error)
    return { success: false, error: 'Server error' }
  }
}
