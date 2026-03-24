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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to="/backstage" replace />} />
          <Route path="/backstage" element={<Backstage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
