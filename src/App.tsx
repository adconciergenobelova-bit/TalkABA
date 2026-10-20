import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider } from "./lib/store";
import { Navbar, Footer, CartDrawer, AuthModal } from "./components/layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Learn from "./pages/Learn";
import Dashboard from "./pages/Dashboard";
import Paths from "./pages/Paths";
import Philosophy from "./pages/Philosophy";
import Instructors from "./pages/Instructors";
import Faq from "./pages/Faq";
import Checkout from "./pages/Checkout";
import Verify from "./pages/Verify";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollTop />
        <div className="flex min-h-screen flex-col bg-[#FFF9F1]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/learn/:slug" element={<Learn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/paths" element={<Paths />} />
              <Route path="/philosophy" element={<Philosophy />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <AuthModal />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
