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
import Menu from "./pages/client/Menu";
import Cart from "./pages/client/Cart";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/backstage" element={<Backstage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
