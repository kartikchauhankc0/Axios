import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import SmoothScroll from "./components/SmoothScroll";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>
      <AuthProvider>

        {/* ✅ FIXED */}
        <SmoothScroll />

        <App />

      </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>
);