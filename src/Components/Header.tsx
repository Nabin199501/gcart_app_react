import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBell } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../reducer/Reducer'; // Import Redux action
import axios from 'axios';

const Header: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [product, setProduct] = useState<any>(null);
  const [addedToCart, setAddedToCart] = useState(false); // Track if product is added to the cart
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access cart items from Redux store and get total quantity
  const cartItems = useSelector((state: any) => state.gcart.items || []);
  const cartItemCount = cartItems.reduce((total: any, item: any) => total + item.quantity, 0);

  const handleSearch = async () => {
    if (!searchId) return alert('Please enter a product ID');
    try {
      const response = await axios.get(`https://fakestoreapi.in/api/products/${searchId}`);
      if (response.data) {
        setProduct(response.data.product); // Display product info
        setAddedToCart(false); // Reset the cart state when a new product is searched
      }
    } catch (error) {
      alert('Product not found');
      setProduct(null); // clear if error
    }
  };

  const addToCartHandler = () => {
    if (!product) return;
    dispatch(addToCart(product.id)); // Dispatch the action to add the product to the cart
    setAddedToCart(true); // Indicate product is added
    navigate('/cart'); // Navigate to cart page
    alert('Product added to cart!');
    setProduct(null); // Close product details after adding to cart
  };

  return (
    <div className="p-3 shadow bg-light">
      <header className="d-flex justify-content-between align-items-center mb-3">
        {/* Left: Logo */}
        <div>
          <h3 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            🛒 GCart
          </h3>
        </div>

        {/* Middle: Search */}
        <div className="w-50">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Search by Product ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="d-flex align-items-center gap-3 d-flex justify-content-center align-items-center">
          <FaBell style={{ fontSize: '1.5rem', cursor: 'pointer' }} />

          {/* Cart Icon with Notification Badge */}
          <div className="cart-icon position-relative" onClick={() => navigate('/cart')}>
            <FaShoppingCart style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
            {cartItemCount > 0 && (
              <span
                className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                style={{
                  fontSize: '12px',
                  padding: '0.25rem 0.5rem',
                  animation: 'badge-pop 0.3s ease-in-out', // Animation effect
                }}
              >
                {cartItemCount}
              </span>
            )}
          </div>

          <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </header>

      {/* Product Details */}
      {product && (
        <div className="card mx-auto mt-4" style={{ maxWidth: '600px' }}>
          <div className="row g-0">
            <div className="col-md-4 d-flex align-items-center justify-content-center p-2">
              <img
                src={product.image}
                alt={product.title || 'Product'}
                className="img-fluid"
                style={{ maxHeight: '150px', objectFit: 'contain' }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.title || 'No Title'}</h5>
                <p className="card-text">
                  {product.description ? product.description.slice(0, 100) + '...' : 'No description available'}
                </p>
                <p className="card-text"><strong>Price:</strong> ₹{product.price || 'N/A'}</p>
                {/* Add to Cart Button */}
                <button className="btn btn-success me-2" onClick={addToCartHandler}>
                  Add to Cart
                </button>
                {addedToCart && (
                  <div className="alert alert-success mt-3">
                    Product added to cart successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
