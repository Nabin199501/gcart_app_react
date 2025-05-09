import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ width: '100vw', height: '100vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded bg-white"
        style={{ minWidth: '350px' }}
      >
        <h3 className="mb-4 text-center">Login</h3>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid mb-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/register')}
          >
            Don't have an account? Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
