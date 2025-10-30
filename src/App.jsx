import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Router>
      <Header />
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
