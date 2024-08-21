import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', { name, email, password });
      if (response.data.success) {
        // Redirect to login page or dashboard
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] p-6 bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl p-8">
        <form onSubmit={handleRegister}>
          <h2 className="text-2xl font-bold mb-6 font-serif text-center">New Here? Sign Up Now</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              placeholder='Ama Ghana'
              id="name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder='example@email.com'
              id="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder='********'
              id="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-full hover:bg-accent">Sign Up</button>

          <div className="container mx-auto mt-3">
            <p className='text-center text-xs'>
              An existing user?
              <Link to={"/login"} className='px-2 hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;