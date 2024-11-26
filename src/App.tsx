import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/home/Home";
import Menu from "./components/pages/menu/Menu";
import About from "./components/pages/about/About";
import Booking from "./components/pages/booking/Booking";
import Header from "./components/navbar/Header";
import Footer from "./components/Footer";
import bgImage from "./assets/hero-bg.jpg";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";
import { RootState } from "./states/store";
import Auth from "./components/pages/auth/Auth";
import AdminDashboard from "./components/pages/dashboards/admin/AdminDashboard";
import UserDashBoard from "./components/pages/dashboards/user/UserDashboard";

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
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashBoard />} />
        </Routes>
        {isCartActive && <Cart />}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
