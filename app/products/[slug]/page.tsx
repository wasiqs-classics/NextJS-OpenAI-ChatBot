"use client"
import React, { useEffect, useState } from 'react';
import productsData from '@/data/products.json';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const [product, setProduct] = useState<any>(null);
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    // Find the product that matches the route/slug
    const foundProduct = productsData.find(p => {
      const productSlug = p.route.split('/products/')[1];
      return productSlug === slug;
    });
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [slug]);

  if (!product) {
    return <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl">Product not found</h1>
    </div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl text-green-600 font-bold mb-4">{product.price}</p>
        {product.sizes && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Available Sizes:</h2>
            <div className="flex gap-2">
              {product.sizes.map((size: string) => (
                <span 
                  key={size}
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-800"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
        <a 
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Back to Products
        </a>
      </div>
    </main>
  );
}
