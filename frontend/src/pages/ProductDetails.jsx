import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import { API_ROUTE } from '../services/axiosConfig';

const ProductDetails = () => {
  const { id } = useParams();
 // const { products } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  console.log("params", product)

  // Ensure products is an array and find the product with the matching _id
  // const product = Array.isArray(products) ? products.find(p => p._id.toString() === params.id) : null;

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = (await axios.get(`${API_ROUTE}/api/product/${id}`)).data;
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Display an error message to the user
        setProduct(null);
      }
    };
    fetchProductById();
  }, [id]);


  if (!product) {
    return <h1 className='text-center text-2xl mt-10'>Product Not Found</h1>;
  }

  return (
    <section className='min-h-[96vh]'>
      <div className="grid grid-rows-2">
        <div className="top-section h-[48vh] bg-base">
          <div className="hero bg-base-200 min-h-screen flex flex-col lg:flex-row items-center lg:items-start">
            <img
              src={product.imageURL}
              alt={product.name}
              className="max-w-sm rounded-lg shadow-2xl lg:mr-8"
            />
            <div className="hero-content">
              <h1 className="text-5xl text-dark font-serif font-bold">{product.name}</h1>
              <div className="product-category">
                <span className="border border-secondary-400 w-[200px] rounded-3xl p-2 py-1 bg-base-300 text-secondary font-sans font-semibold">
                  {product.category}
                </span>
              </div>
              <p className="py-6">{product.description}</p>
              <div className="flex justify-between">
                <div className="info">
                  <h6 className='font-serif'>PRICE</h6>
                  <h4 className='text-3xl font-semibold font-serif'>${product.price}</h4>
                </div>
                <button className="btn btn-secondary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        {/* Add your bottom section here */}
      </div>
    </section>
  );
};

export default ProductDetails;