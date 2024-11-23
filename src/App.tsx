import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Menu from "./components/pages/Menu";
import About from "./components/pages/About";
import Booking from "./components/pages/Booking";
import Header from "./components/Header";
import Footer from "./components/Footer";
import bgImage from "./assets/hero-bg.jpg";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import { RootState } from "./states/store";

function App() {
  const isCartActive = useSelector((state: RootState) => {
    return state.cartReducer.isCartActive;
  });
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed left-0 top-0 z-[-1] h-full w-full">
        <img className="h-full w-full object-cover" src={bgImage} alt="" />
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        {isCartActive && <Cart />}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
