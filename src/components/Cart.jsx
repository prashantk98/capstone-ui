import { useEffect, useState } from "react";
// import Ncart from "../newcomponents/Ncart";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Badge,
} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate, NavLink } from "react-router-dom";
import Footer from "../newcomponents/Footer";
import PaymentAccordion from "./PaymentAccordion";

export default function Cart() {
  const [itemsArray, setItems] = useState(
    !JSON.parse(sessionStorage.getItem("itemsArray"))
      ? []
      : JSON.parse(sessionStorage.getItem("itemsArray"))
  );
  // const [itemName, setItemName] = useState("");
  const [totalItems, setTotalItems] = useState(
    itemsArray.length !== 0
      ? itemsArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          0
        )
      : 0
  );
  // const [isPaymentCliked, setPaymentClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    itemsArray.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    )
  );

  return (
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
              <Button
                sx={{
                  "&": {
                    fontSize: "1.8rem",
                    // color: "black",
                    color: "white",
                  },
                  "& svg": {
                    fontSize: "2rem",
                  },
                  "&:hover": {
                    color: "black",
                  },
                }}
                onClick={() => {
                  window.history.back();
                  // navigate(-1);
                }}
              >
                <KeyboardDoubleArrowLeftIcon /> Go Back
              </Button>
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
              <NavLink to="/adminlogin" className="navbar__admin">
                Admin
              </NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <section className="cart">
        <h3 className="cart__title">
          Hello {sessionStorage.getItem("userName")}
        </h3>
        {/* <h4 className="cart__title">Shopping cart</h4> */}
        <p className="cart__description">
          You have {totalItems} {totalItems > 1 ? "items" : "item"} in your cart
        </p>

        <div className="cart__container">
          <Box
            sx={{
              "&": {
                width: "50%",
                // background: '#f1f3f6',
                // backgroundColor: 'white',
                borderRadius: ".5rem",
                // height: '50.6rem'
              },
              "& .MuiPaper-root": {
                // height: '5rem'
              },
            }}
          >
            <Stack
              sx={{
                // height: '40rem',
                overflowY: "scroll",
              }}
            >
              {/* <Paper>Item 1</Paper>
          <Paper>Item 2</Paper> */}
              {itemsArray.map((currentValue, index) => {
                return (
                  <div className="bill-item" key={index}>
                    <img
                      src={"data:image/jpeg;base64," + currentValue.imgSrc}
                      alt={currentValue.imgSrc}
                    />
                    <div className="bill-item__details">
                      <h3 className="bill-item__title">
                        {currentValue.productName}
                      </h3>
                      <p className="bill-item__description">
                        Description Of {currentValue.productName}
                      </p>
                    </div>
                    <p className="bill__quantity">{currentValue.quantity}</p>
                    <p className="bill-item__price">
                      ₹{currentValue.price * currentValue.quantity}
                    </p>
                  </div>
                );
              })}
            </Stack>
            <Card
              elevation={2}
              sx={{
                "&": {
                  width: "100%",
                  height: "30rem",
                  backgroundColor: "#F5F3EF",
                  padding: "0",
                  marginTop: "2rem",
                },
                "& .MuiCardContent-root": {
                  padding: "0",
                },
              }}
            >
              <CardContent
                sx={{
                  "& .MuiTypography-root": {
                    padding: "13px 24px",
                    fontSize: "1.8rem",
                  },
                }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#878787",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  PRICE DETAILS
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>
                    Price ({totalItems} {totalItems > 1 ? "items" : "item"})
                  </Typography>
                  <Typography>₹{totalPrice}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    borderBottom: "1px dashed #e0e0e0",
                  }}
                >
                  <Typography>
                    Discount (<strong>10%</strong>)
                  </Typography>
                  <Typography
                    sx={{
                      color: "#388e3c",
                    }}
                  >
                    -₹{(totalPrice * 0.1).toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>
                    <strong>Total Amount</strong>
                  </Typography>
                  <Typography>
                    <strong>
                      ₹{(totalPrice - totalPrice * 0.1).toFixed(2)}
                    </strong>
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ color: "#388e3c" }}>
                    You will save ₹{(totalPrice * 0.1).toFixed(2)} on this order
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              width: "40%",
              backgroundColor: "white",
              // height: "46rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                color: "black",
                textAlign: "center",
                // background: 'white',
                padding: "1rem",
              }}
            >
              <strong>
                Total Amount ₹ {(totalPrice - totalPrice * 0.1).toFixed(2)}
              </strong>
            </Typography>
            <PaymentAccordion />
          </Box>
        </div>
      </section>
      <Footer />
    </>
  );
}
