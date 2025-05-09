import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  
  // Get cart items from Redux store
  const cartItems = useSelector((state: any) => state.gcart.items || []);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total: number, item: any) => {
    return total + (item.price * item.quantity); // Assuming item has a price and quantity
  }, 0);

  const handleProceedToBuy = () => {
    // Redirect to a payment gateway or confirmation page (dummy for now)
    navigate('/payment-gateway'); // Update this to your actual payment page
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-center align-items-center">
        <h3 className="text-center mb-4">Payment Page</h3>
      </div>

      {/* Payment Summary Section */}
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header">
              <strong>Order Summary</strong>
            </div>
            <div className="card-body">
              <p><strong>Total Price:</strong> ₹{totalPrice}</p>
              <p>This is a dummy payment page. Implement Razorpay, Stripe, or COD here.</p>
              <button className="btn btn-primary w-100" onClick={handleProceedToBuy}>
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
