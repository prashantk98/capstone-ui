import { useState } from "react";
import CartItem from "./CartItem";
import Navbar from "./Navbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

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
  const [itemName, setItemName] = useState();
  const [expanded, setExpanded] = useState(false);

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
    setItems((prevState) => {
      // return [...prevState, itemName];
      return [...prevState, newItem];
    });
    setItemName("");
    console.log(itemsArray);
  };
  const deleteItem = (index) => {
    // const element = document.getElementById(`${index}`);
    // element.remove();
    console.log(index);
    setItems((prevState) => {
      return prevState.filter((currentValue, idx) => {
        return idx !== index;
      });
    });
    console.log(itemsArray);
  };
  // setItem(3);
  return (
    <>
      <Navbar />
      <section className="cart">
        {/* <Button
          variant="contained"
          color="success"
          sx={{
            "&": {
              fontSize: "1.4rem",
              marginBottom: "1rem",
              width: "50%",
              // textAlign: 'center'
              marginLeft: "30%",
            },
            // '&: hover': {backgroundColor: 'rgba(25, 118, 210, 0)'}
          }}
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowBackIcon /> Go Back!
        </Button> */}
        <h4 className="cart__title">Shopping cart</h4>
        <p className="cart__description">
          you have {itemsArray.length} item in your cart
        </p>

        <div className="cart__container">
          <div className="cart__wrapper">
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
              {/* {itemsArray.map((currentValue, index) => {
                return (
                  <CartItem id={index} key={index} onSelect={deleteItem} text={currentValue} title={currentValue.title} description={currentValue.description} price={currentValue.price} qty={currentValue.qty} />
                );
              })} */}
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
          </div>
          {/* <div className="cart__payment">
            Payment option
          </div> */}
          <Card
            sx={{
              width: "40%",
              height: "75vh",
              // backgroundColor: "#90efc7",
              background:'none',
              boxShadow: 'unset'
            }}
          >
            <CardContent>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  marginBottom: "1.8rem",
                  fontSize: "2rem",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Payment Options
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  marginBottom: "3rem",
                  fontSize: "2rem",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Total: $ {Math.floor(Math.random() * 100 + 978)}
              </Typography>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                sx={
                  expanded === "panel3" ? { border: "2px solid #4BB543",background: '#F5F3EF' } : {background: '#F5F3EF'}
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
                  expanded === "panel1" ? { border: "3px solid #4BB543",background: '#F5F3EF' } : {background: '#F5F3EF'}
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
                  expanded === "panel2" ? { border: "2px solid #4BB543",backgroundColor: '#F5F3EF' } : {backgroundColor: '#F5F3EF'}
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
        </div>
      </section>
    </>
  );
}

const cartObject = [
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 90.0 + Math.floor(Math.random() * 10),
    qty: Math.floor(Math.random() * 8) + 1,
  },
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 90.0 + Math.floor(Math.random() * 10),
    qty: Math.floor(Math.random() * 8) + 1,
  },
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 90.0 + Math.floor(Math.random() * 10),
    qty: Math.floor(Math.random() * 8) + 1,
  },
  {
    title: "Lorem Item",
    description: "Lorem Item description",
    price: 90.0 + Math.floor(Math.random() * 10),
    qty: Math.floor(Math.random() * 8) + 1,
  },
];

export { cartObject };
