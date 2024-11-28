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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./states/store";
import Auth from "./components/pages/auth/Auth";
import AdminDashboard from "./components/pages/dashboards/admin/AdminDashboard";
import UserDashBoard from "./components/pages/dashboards/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { setUser, User } from "./states/authSlice";

function App() {
  const dispatch = useDispatch();
  const isCartActive = useSelector((state: RootState) => {
    return state.cartReducer.isCartActive;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

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
          <Route
            path="/user/:uid"
            element={
              <ProtectedRoute>
                <UserDashBoard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {isCartActive && <Cart />}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
