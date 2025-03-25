import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />{" "}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
