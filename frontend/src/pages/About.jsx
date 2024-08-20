import React from 'react';

const AboutPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-base-200">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-8">
        <div className="card-body">
          <h1 className="text-4xl font-bold mb-6">About AfriMart</h1>
          <p className="text-lg mb-4">
            Welcome to AfriMart, your one-stop shop for all your shopping needs. At AfriMart, we believe in providing high-quality products at affordable prices, making it easier for everyone to access the items they need.
          </p>
          <p className="text-lg mb-4">
            Our mission is to connect customers with a wide range of products from various categories, including electronics, fashion, home goods, and more. We work tirelessly to ensure a seamless shopping experience, from browsing our catalog to completing your purchase.
          </p>
          <p className="text-lg mb-4">
            We pride ourselves on offering a user-friendly platform that is both easy to navigate and secure. Our team is dedicated to providing excellent customer service and support, ensuring that your shopping experience with AfriMart is second to none.
          </p>
          <p className="text-lg mb-4">
            Thank you for choosing AfriMart. We look forward to serving you and helping you find exactly what you need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;