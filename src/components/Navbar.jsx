import { NavLink } from "react-router-dom";
// import logo from "../images/webLogo.png";
import { AppBar, Toolbar, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
  return (
    <>
      <AppBar
        sx={{
          paddingLeft: "1rem",
          paddingRight: "2rem",
          // backgroundColor: '#af9990'
          // background: '#afff90'
          background: '#558044',
          fontWeight: '500'
        }}
      >
        <Toolbar>
          <Grid
            container
            sx={{
              alignItems: "center",
            }}
          >
            <Grid item>
              <NavLink to="/" className="navbar__logo">
                {/* <img src={logo} alt="website logo" /> */}
                {/* <ShoppingCartIcon ></ShoppingCartIcon> */}
                Smart Cart
              </NavLink>
            </Grid>
            <Grid item sm></Grid>

            <Grid item>
              <NavLink to="/home" className="navbar__home">
                Home
              </NavLink>
            </Grid>
            <Grid item
            sx={{
              position: 'relative'
            }}
            >
              <NavLink to="/cart" className="navbar__cart">
                <ShoppingCartIcon
                sx={
                  {
                    fontSize: '5rem',
                    verticalAlign: 'middle',
                    fontWeight: '400',
                    opacity: '.7'
                  }
                }
                />
                <Typography
                  sx={{
                    '&':{
                      position: 'absolute',
                      top: '-.5rem',
                      left: '28%',
                      fontSize: '1.8rem',
                      background: '#ff0000d6',
                      borderRadius: '50%',
                      padding: '0px 8px'
                    }
                    ,
                    '.navbar__cart:hover &':{
                      color: 'white'
                    }
                  }}
                  >0</Typography>
                Cart
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/admin" className="navbar__admin">
                Admin
              </NavLink>
            </Grid>
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
