import React, { useState } from 'react';
import ProductTable from './component/ProductTable';
import CartSummary from './component/CartSummary';
import EmptyCart from './EmptyCart';

const ShoppingCart = () => {
  const [products, setProducts] = useState([
    // { id: 1, name: 'African Black Soap', price: 21.99, quantity: 1 }
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: Math.max(1, newQuantity) } : product
    ));
  };


  const handleClearCart = () => {
    setProducts([]);
  };

  const totalProducts = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto p-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">PRODUCTS</h2>
            {products.length > 0 ? (
              <>
                <ProductTable products={products} onQuantityChange={handleQuantityChange} />
                <div className="divider"></div>
                <div className="flex justify-end">
                  <CartSummary
                    totalProducts={totalProducts}
                    totalQuantity={totalQuantity}
                    total={totalProducts}
                    onClearCart={handleClearCart}
                  />
                </div>
              </>
            ) : (
              <EmptyCart />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;