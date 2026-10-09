import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/headers/Navbar";
import Footer from "./components/footers";
import AuthenticationModal, { AuthMode } from "./components/auth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";

import HomePage from "./screens/homePage";
import ServicesPage from "./screens/servicesPage";
import MastersPage from "./screens/mastersPage";
import BookingPage from "./screens/bookingPage";
import MyBookingsPage from "./screens/myBookingsPage";
import ProfilePage from "./screens/profilePage";
import HelpPage from "./screens/helpPage";
import NotFoundPage from "./screens/NotFoundPage";

import useBookingCart from "./hooks/useBookingCart";
import { useGlobals } from "./hooks/useGlobals";
import { useLanguage } from "./hooks/useLanguage";
import MemberService from "./services/MemberService";
import { Messages } from "../lib/config";
import {
  sweetErrorHandling,
  sweetTopInfoAlert,
  sweetTopSuccessAlert,
} from "../lib/sweetAlert";

import "../styles/app.css";
import "../styles/navbar.css";
import "../styles/footer.css";
import "../styles/auth.css";

function App() {
  const { authMember, setAuthMember } = useGlobals();
  const { t } = useLanguage();

  const cart = useBookingCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  useEffect(() => {
    const blocked = (location.state as { from?: string } | null)?.from;
    if (!blocked) return;

    setPendingPath(blocked);
    setAuthMode("login");
    sweetTopInfoAlert(Messages.error2);
    navigate(location.pathname, { replace: true, state: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    if (!authMember || !pendingPath) return;

    setPendingPath(null);
    setAuthMode(null);
    navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMember, pendingPath]);

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      setAuthMember(null);
      await sweetTopSuccessAlert(t("nav.loggedOut"), 1200);
    } catch (err) {
      console.error("App.logout:", err);

      setAuthMember(null);
      await sweetErrorHandling(new Error(Messages.error1));
    }
  };

  return (
    <div className="ck-app">
      <ScrollToTop />

      <Navbar
        {...cart}
        onOpenLogin={() => setAuthMode("login")}
        onOpenSignup={() => setAuthMode("signup")}
        onLogout={handleLogoutRequest}
      />

      <main className="ck-app-main">
        <Routes>
          <Route path="/" element={<HomePage onAdd={cart.onAdd} />} />

          {}
          <Route
            path="/services/*"
            element={<ServicesPage onAdd={cart.onAdd} />}
          />

          <Route path="/masters" element={<MastersPage />} />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage
                  cartItems={cart.cartItems}
                  totalPrice={cart.totalPrice}
                  totalDuration={cart.totalDuration}
                  onDelete={cart.onDelete}
                  onDeleteAll={cart.onDeleteAll}
                  onRequireAuth={() => setAuthMode("login")}
                />
              </ProtectedRoute>
            }
          />

          {}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <AuthenticationModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSwitch={setAuthMode}
      />
    </div>
  );
}

export default App;
