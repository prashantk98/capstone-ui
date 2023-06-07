import { NavLink } from "react-router-dom";
import logo from '../../images/logo.svg';
import { Typography } from "@mui/material";
export default function Invoice(){
  return (
    <>
    <section className="invoice">
        <figure className="invoice__logo">
        <img src={logo} alt="website logo" />
        Smart Cart
        </figure>
        <Typography variant="h3">
          <Typography variant="span" sx={{display: 'block'}}>
        Setproduct Inc.,
          </Typography>
Arbat street, 1-15, 121165, Moscow, Russian Federation
+7 (926) 721-4127
          </Typography>
    </section>
    </>
  );
}