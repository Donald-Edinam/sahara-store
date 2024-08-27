import axios from "axios";
import { API_ROUTE } from "../../../services/axiosConfig";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../context/CartProvider";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState(cart); // Initialize with an empty array
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch product data using the provided endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/api/product/${productID}`);
        const products = response.data;

        if (!Array.isArray(products)) {
          throw new Error("Fetched data is not an array");
        }

        // Calculate the total price
        const calculatedTotal = products.reduce(
          (acc, product) => acc + product.quantity * product.price,
          0
        );

        setCartItems(products);
        setTotal(calculatedTotal);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Optional: Display an error message to the user
      }
    };

    fetchProducts();
  }, []);

  // Function to update the quantity of a product
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Recalculate the total
    const calculatedTotal = cartItems.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    setTotal(calculatedTotal);
  };

  // Function to remove a product from the cart
  const removeProduct = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );

    // Recalculate the total
    const calculatedTotal = cartItems.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    setTotal(calculatedTotal);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mt-10 mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(cartItems) ? (
          cartItems.map((item) => (
            <Card key={item.productId}>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p className="card-text">Price: ${item.price}</p>
                <div className="flex items-center">
                  <Button
                    className="btn-xs btn-circle"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, parseInt(e.target.value))
                    }
                    className="input input-xs mx-2 w-12"
                  />
                  <Button
                    className="btn-xs btn-circle"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    className="btn-xs btn-error ml-2"
                    onClick={() => removeProduct(item.productId)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total: ${total}</h3>
      </div>
    </div>
  );
};

export default Cart;
