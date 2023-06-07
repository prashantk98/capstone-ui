import "./App.css";
import { BrowserRouter,Routes,Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Admin from "./components/admin/Admin";
import Invoice from "./components/invoice/Invoice";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Link to='/home'>home</Link> <h1>Capstone</h1><Link to='/cart'>cart</Link>
        <Link to='/admin'>Admin</Link>
        <Link to='/invoice'>invoice</Link>
        </>}>
        </Route>
        <Route path="/home" element={<Home/>}>
        </Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/invoice" element={<Invoice/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
