import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Admin from "./components/admin/Admin";
import Invoice from "./components/invoice/Invoice";
import Nhome from "./newcomponents/Nhome";
import Ncart from "./newcomponents/Ncart";
import Bill from "./newcomponents/Bill";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />}> </Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/invoice" element={<Invoice />}></Route>
          <Route exact path="/" element={<Nhome></Nhome>}></Route>
          <Route exact path="/ncart" element={<Ncart></Ncart>}></Route>
          <Route exact path="/bill" element={<Bill></Bill>}></Route>
          {/* <Route path="/*" component={NotFound} /> */}
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
// function NotFound() {
//   return <>
//     <h1>
//       You have landed on a page that doesn't exist
//     </h1>
//   </>;
// }
