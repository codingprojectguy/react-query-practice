import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('http://localhost:3000/api/v1/products?offset=0&limit=10');
  return response.data; // Ensure it's an array
};

const ProductListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [products, setProducts] = useState<Product[]>([]);

  // Update local state when query data changes
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductListPage;

