import { useState } from "react";
import CartItem from "./CartItem";
// import Navbar from "./Navbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  Autocomplete,
  TextField,
  Stack,
  Paper,
  Box
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
import { AppBar, Toolbar, Grid } from "@mui/material";

import Gpay from "../images/google_pay.svg";
import amazonPay from "../images/Amazon_Pay.svg";
import phonePe from "../images/Phonepe.svg";
import visa from "../images/visa.svg";
import mastercard from "../images/mastercard.svg";
import rupay from "../images/rupay.svg";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

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
  const [itemName, setItemName] = useState();
  const [expanded, setExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(5);
  const [isPaymentCliked, setPaymentClicked] = useState(false);

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

  const addInput = () => {
    const newItem = {
      title: "Lorem Item",
      description: "Lorem Item description",
      price: 90.0 + Math.floor(Math.random() * 10),
      qty: Math.floor(Math.random() * 8) + 1,
    };
    setTotalItems(totalItems+1);
    setItems((prevState) => {
      // return [...prevState, itemName];
      return [...prevState, newItem];
    });
    setItemName("");
    console.log(itemsArray);
  };
  const deleteItem = (index) => {
    const element = document.getElementById(`${index}`);
    element.remove();
    setTotalItems(totalItems-1);
    // setItems((prevState) => {
    //   return prevState.filter((currentValue, idx) => {
    //     return idx !== index;
    //   });
    // });
    // console.log(itemsArray);
  };
  // setItem(3);
  return (
    <>
      {/* <Navbar /> */}
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
              <Button
          variant="text"
          color="success"
          sx={{
            "&": {
              fontSize: "1.8rem",
              color: 'black'
            },
          }}
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowBackIcon /> Go Back!
        </Button>
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
            }}>
              <NavLink to="/cart" className="navbar__cart">
                <ShoppingCart
                sx={
                  {
                    fontSize: '5rem',
                    verticalAlign: 'middle',
                    fontWeight: '400',
                    opacity: '.7'

                    // verticalAlign: 'bottom'
                    // position: 'relative'
                  }
                }
                />
                <Typography
                  sx={{
                    '&':{
                    // color: '#f08804',
                    position: 'absolute',
                    top: '-.5rem',
                    left: '28%',
                    fontSize: '1.8rem',
                    background: '#ff0000d6',
                    borderRadius: '50%',
                    padding: '0px 8px',
                    }
                    ,
                    '.navbar__cart:hover &':{
                      color: 'white'
                    }
                  }}
                  >{totalItems}</Typography>
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
      <section className="cart">
        <h4 className="cart__title">Shopping cart</h4>
        <p className="cart__description">
          you have {totalItems} item in your cart
        </p>

        <div className="cart__container">
          <Box
          sx={{
            '&':{
              width:'50%',
              // background: '#f1f3f6',
              backgroundColor: 'white',
              borderRadius: '.5rem',
              height: '50.6rem'
            },
            '& .MuiPaper-root':{
              // height: '5rem'
            }
          }}
          >
            <div className="cart__input">
              <input
                type="text"
                name="item-name"
                placeholder="Add Item name"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                value={itemName}
              />
              
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addInput}
              >
                Add item
              </Button>
            </div>

        <Stack 
        sx={{
          height: '40rem',
          overflowY: 'scroll',
        }}
        >
          {/* <Paper>Item 1</Paper>
          <Paper>Item 2</Paper> */}
          {itemsArray.map((currentValue, index) => {
                return (
                  <CartItem
                    id={index}
                    key={index}
                    onSelect={deleteItem}
                    text={currentValue}
                    title={currentValue.title}
                    description={currentValue.description}
                    price={currentValue.price}
                    qty={currentValue.qty}
                  />
                );
              })}
        </Stack>
        {/* <Button>PAY</Button> */}
        
        {/* <Card
            sx={{
              width: "100%",
              height: "75vh",
              // backgroundColor: "#90efc7",
              background:'none',
              boxShadow: 'unset'
            }}
          >
            <CardContent>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                sx={
                  expanded === "panel3" ? { border: "2px solid #4BB543",background: '#F5F3EF',boxShadow: '1px 1px 7px green' } : {background: '#F5F3EF'}
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
                    "& .MuiAccordionSummary-content": { alignItems: "center" },
                  }}
                >
                  <Typography
                    sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
                  >
                    Pay with Credit Card
                  </Typography>
                  <ImageList sx={{ width: 200 }} cols={3}>
                    {creditCard.map((item) => (
                      <ImageListItem key={item.img} sx={{ margin: "0 .8rem" }}>
                        <img src={item.src} alt={item.alt} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: "1.4rem" }}>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: "5vh",
                      backgroundColor: "#F34237",
                      fontSize: "1.4rem",
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
                  expanded === "panel1" ? { border: "3px solid #4BB543",background: '#F5F3EF',boxShadow: '1px 1px 7px green' } : {background: '#F5F3EF'}
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
                    "& .MuiAccordionSummary-content": { alignItems: "center" },
                  }}
                >
                  <Typography
                    sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
                  >
                    Pay with UPI QR Code
                  </Typography>
                  <ImageList sx={{ width: 200 }} cols={3}>
                    {onlinePaymentMethod.map((item) => (
                      <ImageListItem key={item.img} sx={{ margin: "0 .8rem" }}>
                        <img src={item.src} alt={item.alt} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: "1.4rem" }}>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: "5vh",
                      backgroundColor: "#F34237",
                      fontSize: "1.4rem",
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
                  expanded === "panel2" ? { border: "2px solid #4BB543",backgroundColor: '#F5F3EF',boxShadow: '1px 1px 7px green' } : {backgroundColor: '#F5F3EF'}
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
                  >
                    Pay Now
                  </Button>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card> */}
          </Box>



          {/* <div className="cart__wrapper">
            <div className="cart__input">
              <input
                type="text"
                name="item-name"
                placeholder="Add Item name"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                value={itemName}
              />
              
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addInput}
              >
                Add item
              </Button>
            </div>
            <div className="cart__items">
              {itemsArray.map((currentValue, index) => {
                return (
                  <CartItem
                    id={index}
                    key={index}
                    onSelect={deleteItem}
                    text={currentValue}
                    title={currentValue.title}
                    description={currentValue.description}
                    price={currentValue.price}
                    qty={currentValue.qty}
                  />
                );
              })}
            </div>
          </div> */}

          <Box 
          sx={{
            width: '40%',
          }}
          >
          <Card 
          elevation={2}
          sx={
            {
            '&':{
            width: "100%",
            height: "30rem",
            backgroundColor: "#F5F3EF",
            padding: '0',
          },
          "& .MuiCardContent-root":{
            padding: '0'
          }
        }
        }
          >
            <CardContent
            sx={{
              '& .MuiTypography-root':{
                padding: '13px 24px',
                fontSize: '1.8rem'
              }
            }}
            >
              <Typography
              sx={{
                textTransform: 'uppercase',
                color: '#878787',
                borderBottom: '1px solid #e0e0e0',
              }}
              >PRICE DETAILS</Typography>
              <Stack direction="row" justifyContent="space-between">
              <Typography>Price ({totalItems} items)</Typography>
              <Typography>₹1200</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between"
              sx={{
                borderBottom: '1px dashed #e0e0e0'
              }}>
              <Typography>Discount</Typography>
              <Typography sx={
                {
                  color: '#388e3c',
                }
              }>-₹100</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
              <Typography><strong>Total Amount</strong></Typography>
              <Typography><strong>₹1,100</strong></Typography>
              </Stack>
              <Stack >
              <Typography
              sx={{color: '#388e3c'}}
              >You will save ₹100 on this order</Typography>
              </Stack>
            </CardContent>
          </Card>
          <Button
                    variant="contained"
                    // color="primar"
                    sx={{
                     '&': {
                      marginTop: '2rem',
                      width: "100%",
                      height: "6rem",
                      borderRadius: '0',
                      // backgroundColor: "#F34237",
                      // backgroundColor: 'var(--submit)',
                      fontSize: "2rem",
                      },
                    }}
                    onClick={()=>{setPaymentClicked(!isPaymentCliked)}}
                  >
                    Pay Now
                  </Button>
                  {
                    isPaymentCliked&&<Card
            sx={{
              // width: "100%',
              height: "75vh",
              // backgroundColor: "#90efc7",
              background:'none',
              boxShadow: 'unset'
            }}
          >
            <CardContent>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                sx={
                  expanded === "panel3" ? { border: "2px solid #4BB543",background: '#F5F3EF',boxShadow: '1px 1px 7px green' } : {background: '#F5F3EF'}
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
                    "& .MuiAccordionSummary-content": { alignItems: "center" },
                  }}
                >
                  <Typography
                    sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
                  >
                    Pay with Credit Card
                  </Typography>
                  <ImageList sx={{ width: 200 }} cols={3}>
                    {creditCard.map((item) => (
                      <ImageListItem key={item.img} sx={{ margin: "0 .8rem" }}>
                        <img src={item.src} alt={item.alt} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: "1.4rem" }}>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: "5vh",
                      backgroundColor: "#F34237",
                      fontSize: "1.4rem",
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
                  expanded === "panel1" ? { border: "3px solid #4BB543",background: '#F5F3EF',boxShadow: '1px 1px 7px green' } : {background: '#F5F3EF'}
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
                    "& .MuiAccordionSummary-content": { alignItems: "center" },
                  }}
                >
                  <Typography
                    sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
                  >
                    Pay with UPI QR Code
                  </Typography>
                  <ImageList sx={{ width: 200 }} cols={3}>
                    {onlinePaymentMethod.map((item) => (
                      <ImageListItem key={item.img} sx={{ margin: "0 .8rem" }}>
                        <img src={item.src} alt={item.alt} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: "1.4rem" }}>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: "5vh",
                      backgroundColor: "#F34237",
                      fontSize: "1.4rem",
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
                  expanded === "panel2" ? { border: "2px solid #4BB543",backgroundColor: '#F5F3EF',boxShadow: '1px 1px 7px green' } : {backgroundColor: '#F5F3EF'}
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
                  >
                    Pay Now
                  </Button>
                </AccordionDetails>
              </Accordion>
            </CardContent>
            </Card>
                  }
          </Box>
        </div>
      </section>
    </>
  );
}

const cartObject = [
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 190.0,
    qty: 1,
  },
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 90.0,
    qty: 2,
  },
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 93.0,
    qty: 1,
  },
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 32.0,
    qty: 3,
  },
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 93.0,
    qty: Math.floor(Math.random() * 8) + 1,
  }
];

export { cartObject };

const itemsFromDb = [
  { title: 'Bananas' },
  { title: 'Apples'},
  { title: 'Laptop' },
  { title: 'Mobile' },
  { title: 'Camera' }
];

