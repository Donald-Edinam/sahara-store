import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { userState, serverError, loading, loginUser } = useContext(AuthContext);

  useEffect(() => {
    if (userState) {
      toast.success('Successfully logged in!');
      navigate('/');
    }
  }, [userState, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await loginUser({ email, password });
      if (response && response.user) {
        toast.success("Login successful");
        navigate("/products");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || error.response.data.message || "An error occurred during login");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[87vh] p-6 bg-base-200">
      <Toaster />
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
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className={`btn btn-secondary w-full ${loading && "btn-disabled"}`}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

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