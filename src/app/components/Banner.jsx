import React from 'react'

export default function Banner() {
  return (
    <section 
  className="relative h-[600px] mt-6 flex items-center justify-center bg-cover bg-center" 
  style={{ backgroundImage: "url('/assets/banner2.jpg')" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative text-center text-white px-6">
    <h1 className="text-4xl md:text-6xl font-bold">Upgrade Your Tech, Upgrade Your Life</h1>
    <p className="mt-4 text-lg md:text-xl max-w-2xl text-[#f4ff19] mx-auto">
      Discover the latest laptops, smartphones, and accessories at unbeatable prices.
    </p>
    
  </div>
</section>

  )
}
