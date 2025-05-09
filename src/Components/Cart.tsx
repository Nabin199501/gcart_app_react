import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../reducer/Reducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: any) => state.gcart?.items || []);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await Promise.all(
        items.map(async (item: any) => {
          try {
            const res = await axios.get(`https://fakestoreapi.in/api/products/${item.id}`);
            return { ...res.data.product, quantity: item.quantity };
          } catch {
            return null;
          }
        })
      );

      const valid = fetched.filter(Boolean);
      setProducts(valid);
      const total = valid.reduce((sum, p) => sum + p.price * p.quantity, 0);
      setTotalPrice(total);
    };

    if (items.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
      setTotalPrice(0);
    }
  }, [items]);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: number) => {
    dispatch(addToCart(id));
  };

  const handleBuyNow = () => {
    navigate('/payment');
  };

  if (products.length === 0) {
    return <h3 className="text-center mt-4">Your cart is empty.</h3>;
  }

  return (
    <div className="container-fluid mt-4">
      <h3 className="text-center mb-4">🛒 Your Cart</h3>

      {products.map((product) => (
        <div key={product.id} className="card mb-3 shadow-sm">
          <div className="row g-0 align-items-center">
            <div className="col-md-2 text-center">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid p-2"
                style={{ maxHeight: '100px', objectFit: 'contain' }}
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text mb-1">Price: ₹{product.price}</p>
                <p className="card-text mb-1">
                  Subtotal: ₹{(product.price * product.quantity).toFixed(2)}
                </p>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleIncrease(product.id)}>+</button>
                  <span>{product.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleRemove(product.id)}>-</button>
                  <button className="btn btn-sm btn-danger ms-3" onClick={() => handleRemove(product.id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="row justify-content-between align-items-center mt-4">
        <div className="col-md-6">
          <div className="fs-4 fw-semibold">Total Price: ₹{totalPrice.toFixed(2)}</div>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-success px-4 py-2 fs-5" onClick={handleBuyNow}>
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
