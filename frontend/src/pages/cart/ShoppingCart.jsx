import React, { useState, useEffect, useContext } from 'react';
import ProductTable from './component/ProductTable';
import CartSummary from './component/CartSummary';
import EmptyCart from './EmptyCart';
import { CartContext } from '../../context/CartProvider';

const ShoppingCart = () => {
  const { cart, updateCartItemQuantity, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cart?.products && cart.products.length > 0) {
      setProducts(cart.products);
    } else {
      setProducts([]);
    }
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.productId._id === productId
        ? { ...product, quantity: Math.max(1, newQuantity) }
        : product
    );

    setProducts(updatedProducts);
    updateCartItemQuantity(productId, Math.max(1, newQuantity));
  };

  const handleClearCart = () => {
    clearCart();
  };

  const totalProducts = products.reduce((sum, product) => sum + (product.productId.price || 0) * (product.quantity || 0), 0);
  const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);

  return (
    <div className="min-h-[70vh] mt-20 bg-base-200">
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