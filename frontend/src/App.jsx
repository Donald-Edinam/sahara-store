import { AuthProvider } from "./context/AuthProvider"
import { CartProvider } from "./context/CartProvider"
import { ProductProvider } from "./context/ProductContext"
import Navigation from "./navigation/Navigation"


export default function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
              <Navigation />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  )
}