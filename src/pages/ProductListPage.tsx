import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api/store/Product.api';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  title: string;
  slug: string;
  description: string;
  price: number;
}

const ProductListPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.pages) {
      const allProducts = data.pages.flatMap((page) => page.products);
      setProducts(allProducts);
    }
  }, [data]);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;





// import { useInfiniteQuery, useQuery, useQueryClient, type QueryFunctionContext } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useCart } from '../features/cart/CartContext';
// import { useNavigate, Link } from 'react-router-dom';

// const LIMIT = 10;

// const fetchCategories = async (): Promise<any[]> =>{
//   const res = await axios.get('http://localhost:3000/api/v1/categories');
//   return res.data;
// }

// const fetchProducts = async (
//   ctx: QueryFunctionContext<string[], number>
// ): Promise<any[]> =>{
//   const { pageParam = 0, queryKey } = ctx;
//   const [, search, category] = queryKey;

//   const params: any = {offset:pageParam, limit: LIMIT};
//   if(search) params.title = search;
//   if(category) params.categoryId = category;

//   const res = await axios.get('http://localhost:3000/api/v1/products',{params});

//   const data = res.data;
//   if(Array.isArray(data)) return data;
//   if(Array.isArray(data.products)) return data.products;
   
//   console.warn('⚠️ Unexpected API response format:', data);
//   return [];
// }

// const fetchProductById = async (id: string) =>{
//   const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
//   return res.data;
// };

// const getNextPageParam = (lastPage: any, allPages:any[]) =>{
//   if(!lastPage || !Array.isArray(lastPage)) return undefined;
//   return lastPage.length === LIMIT ? allPages.length * LIMIT : undefined;
// };


// const ProductListPage = () => {
//   const queryClient = useQueryClient();
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const [search, setSearch] =useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [category, setCategory] = useState('');

//   useEffect(() => {
//     const timeout = setTimeout(() => setDebouncedSearch(search), 500);
//     return () => clearTimeout(timeout);
//   },[search]);

//   const { data: categories =[]} = useQuery({
//     queryKey:['categories'],
//     queryFn: fetchCategories,
//     staleTime: 1000 * 60 * 60 * 24,
//   });

//    const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError
//    } = useInfiniteQuery({
//     queryKey:['products', debouncedSearch,category],
//     queryFn: fetchProducts,
//     initialPageParam:0,
//     getNextPageParam,
//    });

//    const products = data?.pages?.flat() || [];

//    if(isLoading) return <p>Loading products...</p>
//    if(isError) return <p>Error loading products.</p>

//   return (
//     <div className='product-list-page'>
//       <div className="product-topSection">
//          <div className="search-item">
//           <input type="text"
//           placeholder='Search products...'
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className= 'searchInput'
//           />
//           <select value={category} onChange={(e) => setCategory(e.target.value)} >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>{cat.name}</option>
//             ))}
//           </select>
//          </div>
//          {/* Products */}
//          {
//           products.length === 0 ? (
//             <p>No product found.</p>
//           ) : (
//             <div>
//               {products.map((product) =>(
//                 <div className="product-card" key={product.id}>
//                   <div className="card-header">
//                     {product.images?.[0] && (
//                       <img src={product.images[0]} alt={product.title} className='card-image' />
//                     )}
                 
//                   <div className="card-body">
//                     <h4>{product.title}</h4>
//                     <p>${product.price}</p>
//                   </div>
//                   </div>

//                   <div className="card-actions">
//                     <Link  to={`/product/${product.id}`}               
//                     onMouseEnter={() =>
//                     queryClient.prefetchQuery({
//                       queryKey: ['product', String(product.id)],
//                       queryFn: () => fetchProductById(String(product.id)),
//                     })}
//                   >View Details</Link>

//                   <button className='cart-add-button' 
//                   onClick={() =>addToCart({
//                            productId: product.id,
//                       title: product.title,
//                       price: product.price,
//                       image: product.images?.[0] || '',
//                   }) }>
//                     Add to Cart
//                   </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

          
//       </div>
      
//     </div>
//   )
// }

// export default ProductListPage

