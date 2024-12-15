"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Chatbot from "@/components/Chatbot/chatbot";
import productsData from '@/data/products.json';



export default function Home() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    setProducts(productsData);
  }, []);
 

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl">AI Seach - Beta</h1>
      <br />
      <h3 className="text-2xl">Let AI be your shopping partner!</h3>
      <br />
      <p className="w-3/4">This AI feature will help you find products based on product descriptions you want. Its unlike normal search engines which search through keywords. This seach engine is powered by open AI LLM and the model we are using is gpt-4o-mini. This bot is in early stages but will be improvised further. Right now its working with JSON file, but later I will use Database connection to make it more realistic. </p>
      <br />
      <br />
      <p>Click on the Chatbot Icon at the bottom right corner to begin!</p>
      <br />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map(product => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>

      <Chatbot />
    </main>
  );
}
