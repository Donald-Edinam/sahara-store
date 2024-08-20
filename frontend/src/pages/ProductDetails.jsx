import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h1 className='text-center text-2xl mt-10'>Product Not found</h1>;
  }

  return (
    <section className='min-h-[96vh]'>
      <div className="grid grid-rows-2">
        <div className="top-section h-[48vh] bg-base">
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
              <img
                src={product.images[0]}
                className="max-w-sm rounded-lg shadow-2xl" />
              <div>
                <h1 className="text-5xl text-dark font-serif font-bold">{product.title}</h1>
                <div className="product-category">
                  <div className="border border-secondary-400 w-[200px] my-2 rounded-3xl p-2 py-1 p-2 bg-base-300">
                    <span className='text-secondary py-1 px-3 font-sans font-semibold'>{product.category.name}</span>
                  </div>
                </div>
                <p className="py-6">
                  {product.description}
                </p>
                <div className="flex justify-between">
                  <div className="info">
                    <h6 className='font-serif'>PRICE</h6>
                    <h4 className='text-3xl font-semibold font-serif'>${`${product.price}.99`}</h4>
                  </div>
                  <button className="btn btn-secondary">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bottom-section h-[40vh]">
          2
        </div> */}
      </div>
    </section>
  )
}

export default ProductDetails
