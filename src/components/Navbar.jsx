import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Grid,Badge} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

export default function Navbar(){
  const [itemsArray, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem("itemsArray");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  return(
    <>
    <AppBar
          sx={{
            paddingLeft: "1rem",
            paddingRight: "2rem",
            // backgroundColor: '#af9990'
            // background: '#afff90'
            background: "#558044",
            fontWeight: "500",
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
                <NavLink to="/" className="navbar__home">
                  Home
                </NavLink>
              </Grid>
              <Grid
                item
                sx={{
                  position: "relative",
                }}
              >
                <NavLink to="/ncart" className="navbar__cart">
                  <Badge
                    badgeContent={
                      itemsArray.length === 0
                        ? 0
                        : itemsArray.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.quantity,
                            0
                          )
                    }
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "2rem",
                        margin: "0 .8rem 0",
                      },
                    }}
                  >
                    <ShoppingCart
                      sx={{
                        fontSize: "3rem",
                        padding: "0 .8rem",
                      }}
                    ></ShoppingCart>
                  </Badge>
                  Cart
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/admin/login" className="navbar__admin">
                  Admin
                </NavLink>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
    </>
  );
}