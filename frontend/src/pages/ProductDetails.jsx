import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTE } from '../services/axiosConfig';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProductById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return <h1 className='text-center text-2xl mt-10'>Product Not Found</h1>;
  }

  return (
    <section className='min-h-screen bg-gray-100 py-12'>
      <div className="container mx-auto px-4">
        <h1 className='md:mx-10 px-10 my-4 font-semibold mt-3 font-sans text-2xl'>PRODUCT DETAILS</h1>
        <div className="bg-primary rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex md:h-[60vh]">
            <div className="md:flex-shrink-0 ">
              <img
                src={product.imageURL || 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={product.name}
                className="h-48 w-full object-cover md:h-full md:w-48"
              />
            </div>
            <div className="p-10 md:mt-10 ">
              <div className="uppercase tracking-wide text-sm text-secondary font-semibold">
                {product.category}
              </div>
              <h1 className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <span className="ml-2 text-sm text-gray-500">USD</span>
                </div>
                <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;