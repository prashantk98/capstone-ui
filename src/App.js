import "./App.css";
import { BrowserRouter,Routes,Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Link to='/home'>button</Link> <h1>Capstone</h1><Link to='/cart'>dgbhfn</Link>
        <Link to='/admin'>Admin</Link>
        </>}>
        </Route>
        <Route path="/home" element={<Home/>}>
        </Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
