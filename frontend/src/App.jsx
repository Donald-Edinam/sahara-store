import { ProductProvider } from "./context/ProductContext"
import Navigation from "./navigation/Navigation"


export default function App() {
  return (
    <>
      <ProductProvider>
        <Navigation />
      </ProductProvider>
    </>
  )
}