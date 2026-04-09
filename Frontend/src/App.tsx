import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Backstage from "./pages/client/Backstage";
import { MenuWireframe } from "./pages/client/Menu";
import Cart from "./pages/client/Cart";
import PaymentForm from "./components/ui/PaymentForm";
import ProductDetailCard from "./components/ui/ProductDetailCard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<MenuWireframe />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/backstage" element={<Backstage />} />
          <Route path="/pay" element={<PaymentForm />} />
          <Route path="/product" element={<ProductDetailCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
