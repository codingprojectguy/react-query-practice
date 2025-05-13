import './App.css';
import React, { Suspense } from 'react';
import PageRoutes from './routes/PageRoutes';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const LoadingFallback = () =>(
  <div className="loading-container">
        <div className="loading-spinner">
            <p>Loading...</p>
        </div>
    </div>
)

const App = () => {
  return (
  <Router>
    <div className="App">
      <header className='App-header'>
        <div className="logo">
          <Link to={"/"}>Demo Store</Link>
        </div>
        <nav className='nav-bar'>
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="cart">Cart</Link>
            </li>
            <li>
              <Link to="profile">Profile</Link>
            </li>
            <li>
              <Link to="login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className='App-main'>
        <Suspense fallback={<LoadingFallback />}>
        <PageRoutes />
        </Suspense>

      </main>
    </div>
  </Router>
  );
};

export default App;

