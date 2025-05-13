// src/components/ProductCard.tsx
import React from 'react';

interface Product {
  id: string;
  title: string;
  slug:string;
  price: number;
  description:string;
}

const ProductCard = ({ product, onDelete }: { product: Product; onDelete: () => void }) => (
  <div className="Item">
    <h2 className="text-xl font-bold">{product.title}</h2>
    <p className="text-gray-600">${product.price.toFixed(2)}</p>
     <p className="text-gray-600">${product.description}</p>
     <button className='delete' onClick={onDelete}>Delete</button>
  </div>
);

export default ProductCard;
