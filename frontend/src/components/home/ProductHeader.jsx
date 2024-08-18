import React from "react";

const ProductHeader = ({ heading = "Top", description = "Info" }) => {

  console.log("info", heading, description)

  return (
    <>
      <div className="bg-base-100 py-4 px-6 w-full flex mt-10 justify-between items-center border-neutral">
        <div>
          <h2 className="text-sm font-medium uppercase text-neutral">{heading}</h2>
          <h1 className="text-2xl font-serif font-bold">{description}</h1>
        </div>
        <a href="#" className="text-sm font-medium text-neutral hover:text-acent flex items-center">
          View All
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
        </a>
      </div>

    </>
  );
};

export default ProductHeader;
