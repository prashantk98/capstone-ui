import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
// import { useNavigate, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import PaymentAccordion from "../components/PaymentAccordion";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppStateContext } from "../App";

export default function Cart() {
  const { itemsArray } = useContext(AppStateContext);
  // const [itemsArray, setItems] = useState(
  //   !JSON.parse(sessionStorage.getItem("itemsArray"))
  //     ? []
  //     : JSON.parse(sessionStorage.getItem("itemsArray"))
  // );
  const totalItems = itemsArray.reduce((accumulator, currentValue) => accumulator + currentValue.quantity,0);
  const totalPrice = itemsArray.reduce((accumulator, currentValue) =>accumulator + currentValue.price *currentValue.quantity,0);

  return (
    <>
      <Navbar
      isBackButton={true}
      itemsArray={itemsArray}
      />
      <section className="cart">
        <h3 className="cart__title">
          Hello {sessionStorage.getItem("userName")}
        </h3>
        <p className="cart__description">
          You have {totalItems} {totalItems > 1 ? "items" : "item"} in your cart
        </p>

        <div className="cart__container">
          <Box
            sx={{
              "&": {
                width: "50%",
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
                  // height: "30rem",
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
