import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { user, loading, loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      await loginUser(credentials);
      if(user) {
          navigate("/");
      }
      console.log('Login successful:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[87vh] p-6 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 font-serif text-center">Sign In to Enjoy the Goodies!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email:</label>
            <input
              placeholder='example@email.com'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password:</label>
            <input
              type="password"
              placeholder='*********'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-full">Login</button>

          <div className="container mx-auto mt-3">
            <p className='text-center text-xs'>
              A New User?
              <Link to={"/signup"} className='px-2 hover:underline hover:text-bold'>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;