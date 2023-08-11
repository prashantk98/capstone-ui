import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bill from "./pages/Bill";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AdminLogin from "./components/AdminLogin";
import NotFound from "./components/NotFound";

export const AppStateContext = createContext();

function App() {
  const [itemsArray, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem("itemsArray");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  return (
    <AppStateContext.Provider value={{ itemsArray, setItems }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/bill" element={<Bill />} />
          <Route exact path="/admin" element={<Admin /> } />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppStateContext.Provider>
  );
}

export default App;
