import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Nhome from "./pages/Nhome";
import Ncart from "./pages/Ncart";
import AdminLogin from "./components/AdminLogin";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />}> </Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/" element={<Nhome />}></Route>
          <Route exact path="/ncart" element={<Ncart />}></Route>
          <Route exact path="/admin/login" element={<AdminLogin/>}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

