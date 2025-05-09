import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Payment: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>

      <div className="container-fluid" style={{ paddingTop: '100px', minHeight: '80vh' }}>
        {submitted ? (
          <div className="text-center">
            <h2 className="text-success">✅ Payment Successful!</h2>
            <p>Thank you for your purchase.</p>
          </div>
        ) : (
          <div className="row justify-content-center ">
            {/* Payment Form in Center */}
            <div className="col-md-6">
              <h2 className="mb-4 text-center ">Payment Details</h2>
              <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <textarea className="form-control" rows={3} required></textarea>
                </div>
                <div className="mb-3">
                  <label>Payment Method</label>
                  <select className="form-select" required>
                    <option value="">-- Select Method --</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="stripe">Stripe</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">Pay Now</button>
              </form>
            </div>

            {/* Product Summary on the Right */}
            <div className="col-md-4 mt-4 mt-md-0">
              <div className="bg-light p-3 rounded shadow">
                <h4>🛍️ Order Summary</h4>
                <p>Product: Wireless Headphones</p>
                <p>Price: ₹2,499</p>
                <p>Quantity: 1</p>
                <hr />
                <p><strong>Total: ₹2,499</strong></p>
              </div>
            </div>
          </div>
        )}
      </div>


    </>
  );
};

export default Payment;
