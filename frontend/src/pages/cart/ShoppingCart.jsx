import React, { useState, useEffect, useContext } from 'react';
import ProductTable from './component/ProductTable';
import CartSummary from './component/CartSummary';
import EmptyCart from './EmptyCart';
import { CartContext } from '../../context/CartProvider';
import { API_ROUTE } from '../../services/axiosConfig';

const ShoppingCart = () => {
  const { cart, updateCartItem, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cart]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const productPromises = cart.items.flat().map((item) =>
        fetch(`${API_ROUTE}/api/product/${item.productId}`)
          .then((response) => response.json())
          .then((product) => ({ ...product, quantity: item.quantity }))
      );

      const fetchedProducts = await Promise.all(productPromises);
      setProducts(fetchedProducts);
      setErrorProducts(null);
    } catch (err) {
      console.error('Error fetching product details:', err);
      setErrorProducts(err.message || 'An error occurred');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, newQuantity) } : product
      )
    );

    // Update the cart context and persist the change to the server
    const productToUpdate = products.find(product => product.id === id);
    if (productToUpdate) {
      updateCartItem(productToUpdate.productId, Math.max(1, newQuantity));
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const totalProducts = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto p-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">PRODUCTS</h2>
            {loadingProducts ? (
              <div>Loading products...</div>
            ) : errorProducts ? (
              <div>Error loading products: {errorProducts}</div>
            ) : products.length > 0 ? (
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
