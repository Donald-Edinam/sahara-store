// Loader.js
import React from 'react';
import LoaderImg from "../../assets/sahara.gif"

const Loader = () => {
  return (
    <div className="loader-container flex justify-center items-center h-screen">
      <div className="loader">
      <img src={LoaderImg} alt="" />
      </div>
    </div>
  );
};

export default Loader;
