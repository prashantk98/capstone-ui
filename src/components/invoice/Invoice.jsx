import { NavLink } from "react-router-dom";
import logo from '../../images/logo.svg';
import { Typography,Container,Box } from "@mui/material";
import { useState } from "react";
import './invoice.css';
export default function Invoice(){
  const [todayDate, SetDate] = useState(new Date());
  return (
    <>
    <section className="invoice">
    <Container maxWidth="sm" margin='0 auto'
    sx={{
      backgroundColor: '#f3f3f3',
      width: '620px',
      height: '87.7rem',
    }}
    >
    <figure className="invoice__logo">
        <img src={logo} alt="website logo" />
        Smart Cart
        </figure>
        <Typography 
        sx={{
          padding:'.8px',
          fontSize:'1.6rem',
          color: '#5B595B'
        }}
        >Billing Date: {todayDate.toDateString()}</Typography>
        <Typography 
        sx={{
          padding:'.8px',
          fontSize:'1.6rem',
          color: '#5B595B'
        }}
        >Mobile Number: {+919876543210}</Typography>
      </Container>
        
    </section>
    </>
  );
}