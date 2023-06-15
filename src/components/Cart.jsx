import { useState } from "react";
import CartItem from "./CartItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import banana from "../images/Banana.svg";
import Ncart from "../newcomponents/Ncart";
import {
  Card,
  CardContent,
  Typography,
  ImageList,
  ImageListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Box,
  Modal,
} from "@mui/material";
import { Result } from "antd";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// import logo from "../images/logo.svg";
import { itemsArrayGlobal } from "../newcomponents/Ncart";

import Gpay from "../images/google_pay.svg";
import amazonPay from "../images/Amazon_Pay.svg";
import phonePe from "../images/Phonepe.svg";
import visa from "../images/visa.svg";
import mastercard from "../images/mastercard.svg";
import rupay from "../images/rupay.svg";

const onlinePaymentMethod = [
  { src: Gpay, alt: "Google pay" },
  { src: phonePe, alt: "PhonePe" },
  { src: amazonPay, alt: "Amazon pay" },
];
const creditCard = [
  { src: visa, alt: "visa card" },
  { src: mastercard, alt: "mastercard card" },
  { src: rupay, alt: "rupay card" },
];
export default function Cart() {
  const [itemsArray, setItems] = useState(cartObject);
  const [itemName, setItemName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(5);
  const [isPaymentCliked, setPaymentClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    itemsArray.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.qty,
      0
    )
  );
  const [openModal, setOpenModal] = useState(false);
  // const [totalDiscout, setTotalDiscount] = useState(0);

  // const defaultProps = {
  //   options: itemsFromDb,
  //   getOptionLabel: (option) => option.title,
  // };
  // const flatProps = {
  //   options: itemsFromDb.map((option) => option.title),
  // };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const addItemToCart = () => {
  //   if (itemName.trim() !== '') {
  //     const obj = {
  //       title: itemName,
  //     description: ` description of ${itemName}`,
  //     price: Math.floor(Math.random() * 8) +9.0,
  //     qty:  1,
  //     }
  //     setItems([...itemsArray, obj]);
  //     setItemName('');
  //   }

  //   console.log(itemsArray);
  // };

  // const addInput = () => {
  //   const newItem = {
  //     title: "Lorem Item",
  //     description: "Lorem Item description",
  //     price: 90.0 + Math.floor(Math.random() * 10),
  //     qty: Math.floor(Math.random() * 8) + 1,
  //   };
  //   setTotalItems(totalItems+1);
  //   setItems((prevState) => {
  //     // return [...prevState, itemName];
  //     return [...prevState, newItem];
  //   });
  //   setItemName("");
  //   console.log(itemsArray);
  // };

  // const removeItemFromCart = (index) => {
  //   // const element = document.getElementById(`${index}`);
  //   // element.remove();
  //   setTotalItems(totalItems-1);
  //   setItems((prevState) => {
  //     return prevState.filter((currentValue, idx) => {
  //       return idx !== index;
  //     });
  //   });
  //   // console.log(itemsArray);
  // };
  // setItem(3);
  return (
    <>
      <section className="cart">
        <h4 className="cart__title">Shopping cart</h4>
        <p className="cart__description">
          you have {totalItems} item in your cart
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
                  <div className="cart-item" key={index}>
                    <img src={banana} alt="banana " />
                    <div className="cart-item__details">
                      <h3 className="cart-item__title">{currentValue.title}</h3>
                      <p className="cart-item__description">
                        {currentValue.description}
                      </p>
                    </div>
                    <p className="bill__quantity">{currentValue.qty}</p>
                    <p className="cart-item__price">₹{currentValue.price}</p>
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
                  marginTop: '2rem'
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
                  <Typography>Price ({totalItems} items)</Typography>
                  <Typography>₹{totalPrice}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    borderBottom: "1px dashed #e0e0e0",
                  }}
                >
                  <Typography>Discount</Typography>
                  <Typography
                    sx={{
                      color: "#388e3c",
                    }}
                  >
                    -₹{(totalPrice * 0.01).toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>
                    <strong>Total Amount</strong>
                  </Typography>
                  <Typography>
                    <strong>
                      ₹{(totalPrice - totalPrice * 0.01).toFixed(2)}
                    </strong>
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ color: "#388e3c" }}>
                    You will save ₹{(totalPrice * 0.01).toFixed(2)} on this
                    order
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            
          </Box>

          <Box
            sx={{
              width: "40%",
            }}
          >
            {/* <Card
              elevation={2}
              sx={{
                "&": {
                  width: "100%",
                  height: "30rem",
                  backgroundColor: "#F5F3EF",
                  padding: "0",
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
                  <Typography>Price ({totalItems} items)</Typography>
                  <Typography>₹{totalPrice}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    borderBottom: "1px dashed #e0e0e0",
                  }}
                >
                  <Typography>Discount</Typography>
                  <Typography
                    sx={{
                      color: "#388e3c",
                    }}
                  >
                    -₹{(totalPrice * 0.01).toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>
                    <strong>Total Amount</strong>
                  </Typography>
                  <Typography>
                    <strong>
                      ₹{(totalPrice - totalPrice * 0.01).toFixed(2)}
                    </strong>
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ color: "#388e3c" }}>
                    You will save ₹{(totalPrice * 0.01).toFixed(2)} on this
                    order
                  </Typography>
                </Stack>
              </CardContent>
            </Card> */}
            {/* <Button
              variant="contained"
              // color="primar"
              sx={{
                "&": {
                  marginTop: "2rem",
                  width: "100%",
                  // height: "6rem",
                  borderRadius: "0",
                  // backgroundColor: "#F34237",
                  // backgroundColor: 'var(--submit)',
                  fontSize: "2rem",
                },
              }}
              onClick={() => {
                setPaymentClicked(!isPaymentCliked);
                // alert("Thanks for shopping");
                // window.location.href = "/nhome";
              }}
            >
              Pay Now
            </Button> */}
            <Typography
            sx={{
              fontSize: '1.8rem',
              color: 'black',
              textAlign: 'center'
            }}
            ><strong>Total Amount {(totalPrice-totalPrice*.01).toFixed(2)}</strong></Typography>
            {
              // isPaymentCliked &&
              <Card
                sx={{
                  // width: "100%',
                  height: "75vh",
                  // backgroundColor: "#90efc7",
                  background: "none",
                  boxShadow: "unset",
                }}
              >
                <CardContent>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                    sx={
                      expanded === "panel3"
                        ? {
                            border: "2px solid #4BB543",
                            background: "#F5F3EF",
                            boxShadow: "1px 1px 7px green",
                          }
                        : { background: "#F5F3EF" }
                    }
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "panel3" ? (
                          <RadioButtonCheckedIcon color="success" />
                        ) : (
                          <RadioButtonCheckedIcon />
                        )
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      sx={{
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                        },
                      }}
                    >
                      <Typography
                        sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
                      >
                        Pay with Credit Card
                      </Typography>
                      <ImageList sx={{ width: 200 }} cols={3}>
                        {creditCard.map((item) => (
                          <ImageListItem
                            key={item.img}
                            sx={{ margin: "0 .8rem" }}
                          >
                            <img src={item.src} alt={item.alt} />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontSize: "1.4rem" }}>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam
                        mattis feugiat. Aliquam eget maximus est, id dignissim
                        quam.
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          height: "5vh",
                          backgroundColor: "#F34237",
                          fontSize: "1.4rem",
                        }}
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        Pay Now
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    sx={
                      expanded === "panel1"
                        ? {
                            border: "3px solid #4BB543",
                            background: "#F5F3EF",
                            boxShadow: "1px 1px 7px green",
                          }
                        : { background: "#F5F3EF" }
                    }
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "panel1" ? (
                          <RadioButtonCheckedIcon color="success" />
                        ) : (
                          <RadioButtonCheckedIcon />
                        )
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      sx={{
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                        },
                      }}
                    >
                      <Typography
                        sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
                      >
                        Pay with UPI QR Code
                      </Typography>
                      <ImageList sx={{ width: 200 }} cols={3}>
                        {onlinePaymentMethod.map((item) => (
                          <ImageListItem
                            key={item.img}
                            sx={{ margin: "0 .8rem" }}
                          >
                            <img src={item.src} alt={item.alt} />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontSize: "1.4rem" }}>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam
                        mattis feugiat. Aliquam eget maximus est, id dignissim
                        quam.
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          height: "5vh",
                          backgroundColor: "#F34237",
                          fontSize: "1.4rem",
                        }}
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        Show QR
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                    sx={
                      expanded === "panel2"
                        ? {
                            border: "2px solid #4BB543",
                            backgroundColor: "#F5F3EF",
                            boxShadow: "1px 1px 7px green",
                          }
                        : { backgroundColor: "#F5F3EF" }
                    }
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "panel2" ? (
                          <RadioButtonCheckedIcon color="success" />
                        ) : (
                          <RadioButtonCheckedIcon />
                        )
                      }
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography
                        sx={{ width: "33%", flexShrink: 0, fontSize: "1.8rem" }}
                      >
                        Cash Payment
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: "1.6rem" }}
                      >
                        Pay via Cash
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontSize: "1.4rem" }}>
                        Donec placerat, lectus sed mattis semper, neque lectus
                        feugiat lectus, varius pulvinar diam eros in elit.
                        Pellentesque convallis laoreet laoreet.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          height: "5vh",
                          backgroundColor: "#F34237",
                          fontSize: "1.4rem",
                        }}
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        Pay Now
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            }
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                {/* <Typography  variant="h3" component="h2">
                Thanks for Shopping!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2,fontSize: '1.4rem' }}>
                Your order has been successfully placed.
                </Typography> */}
                <Result
                  status="success"
                  title="Successfully Purchased "
                  subTitle="Thanks for Shopping! Visit again"
                  
                />
              </Box>
            </Modal>
          </Box>
        </div>
      </section>
    </>
  );
}

const cartObject = [
  {
    title: "Lorem Item 1",
    description: "Lorem Item description",
    price: 190.0,
    qty: Math.floor(Math.random() * 8) + 1,
  },
  {
    title: "Lorem Item 2",
    description: "Lorem Item description",
    price: 90.0,
    qty: Math.floor(Math.random() * 8) + 1,
  },
  {
    title: "Lorem Item 3",
    description: "Lorem Item description",
    price: 13.0,
    qty: Math.floor(Math.random() * 8) + 1,
  },
  {
    title: "Lorem Item 4",
    description: "Lorem Item description",
    price: 32.0,
    qty: Math.floor(Math.random() * 8) + 1,
  },
  {
    title: "Lorem Item 5",
    description: "Lorem Item description",
    price: 93.0,
    qty: Math.floor(Math.random() * 8) + 1,
  },
];

export { cartObject };

const itemsFromDb = [
  { title: "Bananas" },
  { title: "Apples" },
  { title: "Laptop" },
  { title: "Mobile" },
  { title: "Camera" },
];

console.log(itemsFromDb[0].title);
