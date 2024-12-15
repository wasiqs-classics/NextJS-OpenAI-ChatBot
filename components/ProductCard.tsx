import React from 'react';
import Link from 'next/link';

type Product = {
  name: string;
  description: string;
  price: string;
  route: string;
};

const ProductCard: React.FC<Product> = ({ name, description, price, route }) => (
  <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <div className="px-6 py-4">
      <h2 className="font-bold text-xl mb-2 text-gray-800">{name}</h2>
      <p className="text-gray-600 text-base mb-4">{description}</p>
      <p className="text-green-600 font-bold text-lg mb-4">{price}</p>
      <Link 
        href={route}
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
      >
        View Product
      </Link>
    </div>
  </div>
);

export default ProductCard;
