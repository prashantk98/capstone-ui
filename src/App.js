import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Nhome from "./pages/Nhome";
import Ncart from "./pages/Ncart";
import AdminLogin from "./components/AdminLogin";
import NotFound from "./components/NotFound";

// Step 1: Create a context
export const AppStateContext = createContext();

function App() {
  // Step 2: Define shared state and its update function
  const [itemsArray, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem("itemsArray");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // Step 3: Wrap components with context provider
  return (
    <AppStateContext.Provider value={{ itemsArray, setItems }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/" element={<Nhome />} />
          <Route exact path="/ncart" element={<Ncart />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppStateContext.Provider>
  );
}

export default App;
