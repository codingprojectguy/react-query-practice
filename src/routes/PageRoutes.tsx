
import React, {lazy,Suspense }   from 'react'
import { Route, Routes, Navigate  } from 'react-router-dom'

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ProductListPage = lazy(() => import('../pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const LoadingFallback =()=>(
    <div className="loading-container">
        <div className="loading-spinner">
            <p>Loading...</p>
        </div>
    </div>
)


const PageRoutes: React.FC = () => {
  return (
    < Suspense  fallback={<LoadingFallback />}>
    <Routes>
        <Route path ="/" element={<Navigate to="/product"  replace />}/>
        <Route path ="/login" element={<LoginPage />}/>
        <Route path ="/products" element={<ProductListPage />}/>
        <Route path ="/products/:id" element={<ProductDetailPage />}/>
        <Route path ="/cart" element={<CartPage />}/>
        <Route path ="/profile" element={<ProfilePage />}/>
        <Route path ="*" element={<NotFoundPage />}/>

    </Routes>
    </Suspense>
  )
}

export default PageRoutes
