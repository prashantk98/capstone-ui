import {NavLink} from 'react-router-dom';
import logo from '../images/logo.svg';
import { AppBar,Toolbar,Grid} from '@mui/material';

export default function Navbar(){
  return (
    <>
     <AppBar sx={{paddingLeft:'1rem', paddingRight:'2rem'}}>
      <Toolbar>
        <Grid container sx={{alignItems:'center'}}>
          <Grid item><NavLink to='/' className='navbar__company-name'>Smart Cart</NavLink></Grid>
          <Grid item sm></Grid>
          <Grid item><NavLink to='/' className='navbar__logo'><img src={logo} alt="website logo" />Smart Cart</NavLink></Grid>
        </Grid>
      </Toolbar>
      </AppBar>
    {/* <nav className="navbar">
      <NavLink to='/' className='navbar__company-name'>Smart Cart</NavLink>
      <NavLink to='/' className='navbar__logo'><img src={logo} alt="website logo" />Smart Cart</NavLink>
    </nav> */}
    </>
  );
}