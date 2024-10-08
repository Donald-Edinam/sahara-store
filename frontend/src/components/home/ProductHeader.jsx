import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductHeader = ({ heading = "Top", description = "Info" }) => {
  const navigate = useNavigate();

  const handleViewAllClick = (e) => {
    e.preventDefault();
    navigate("/products");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="bg-base-100 py-4 px-6 w-full flex mt-10 justify-between items-center border-neutral">
        <div>
          <h2 className="text-sm font-medium uppercase text-neutral">{heading}</h2>
          <h1 className="text-2xl font-serif font-bold">{description}</h1>
        </div>
        <Link 
          to="/products" 
          onClick={handleViewAllClick}
          className="text-sm font-medium text-neutral hover:text-acent flex items-center"
        >
          View All
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
        </Link>
      </div>
    </>
  );
};

export default ProductHeader;