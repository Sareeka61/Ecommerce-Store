import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { Product } from "./components/Product";
import ProductScreen from "./screens/ProductScreen";
import { Toaster } from "react-hot-toast";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentHistory from "./screens/PaymentHistory";
import GameScreen from "./screens/GameScreen";

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />

        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="payHistory" element={<PaymentHistory />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
