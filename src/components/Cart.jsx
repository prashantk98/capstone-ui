import { useEffect, useState } from "react";
// import CartItem from "./CartItem";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import banana from "../images/Banana.svg";
// import Ncart from "../newcomponents/Ncart";
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
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import QrCodeIcon from '@mui/icons-material/QrCode';
// import logo from "../images/logo.svg";
// import { itemsArrayGlobal } from "../newcomponents/Ncart";
import { cartObject } from "../newcomponents/Ncart";
import paytm from "../images/paytmLogo.svg";
import visa from "../images/visa.svg";
import mastercard from "../images/mastercard.svg";
import rupay from "../images/rupay.svg";
import { useNavigate } from "react-router-dom";
const creditCard = [
  { src: visa, alt: "visa card" },
  { src: mastercard, alt: "mastercard card" },
  { src: rupay, alt: "rupay card" },
];
export default function Cart() {
  const [itemsArray, setItems] = useState(!JSON.parse(sessionStorage.getItem('itemsArray'))?[]:JSON.parse(sessionStorage.getItem('itemsArray')));
  // const [itemName, setItemName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(itemsArray.length!==0?itemsArray.reduce((accumulator, currentValue) =>accumulator + currentValue.quantity,0):0);
  // const [isPaymentCliked, setPaymentClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    itemsArray.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  )
  );
  
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  // const [totalDiscout, setTotalDiscount] = useState(0);

  // const defaultProps = {
  //   options: itemsFromDb,
  //   getOptionLabel: (option) => option.title,
  // };
  // const flatProps = {
  //   options: itemsFromDb.map((option) => option.title),
  // };
  // useEffect(() => {
  //   // Retrieve data from session storage on component mount
  //   const storedData = JSON.parse(sessionStorage.getItem('itemsArray'));
  //   console.log(storedData);
  //   if (storedData) {
  //     setItems(storedData);
  //   }
  // }, []);
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
        <h3 className="cart__title">Hello {sessionStorage.getItem('userName')}</h3>
        {/* <h4 className="cart__title">Shopping cart</h4> */}
        <p className="cart__description">
          You have {totalItems} {totalItems>1?'items':'item'} in your cart
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
                    <img src={'data:image/jpeg;base64,'+currentValue.imgSrc} alt={currentValue.imgSrc} />
                    <div className="bill-item__details">
                      <h3 className="bill-item__title">{currentValue.productName}</h3>
                      <p className="bill-item__description">
                        Description Of {currentValue.productName}
                      </p>
                    </div>
                    <p className="bill__quantity">{currentValue.quantity}</p>
                    <p className="bill-item__price">₹{currentValue.price*currentValue.quantity}</p>
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
                  <Typography>Price ({totalItems} {totalItems>1?'items':'item'})</Typography>
                  <Typography>₹{totalPrice}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    borderBottom: "1px dashed #e0e0e0",
                  }}
                >
                  <Typography>Discount (<strong>10%</strong>)</Typography>
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
                    You will save ₹{(totalPrice * 0.1).toFixed(2)} on this
                    order
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            
          </Box>

          <Box
            sx={{
              width: "40%",
              backgroundColor: 'white',
              height: '43rem'
            }}
          >
            <Typography
            sx={{
              fontSize: '2rem',
              color: 'black',
              textAlign: 'center',
              // background: 'white',
              padding: '1rem'
            }}
            ><strong>Total Amount ₹ {(totalPrice-totalPrice*.1).toFixed(2)}</strong></Typography>
            {
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
                          <RadioButtonCheckedIcon color="success"/>
                        ) : (
                          <RadioButtonUncheckedIcon />
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
                      <ImageList sx={{ width: 200, }} cols={3} gap={8}>
                        {creditCard.map((item,index) => (
                          <ImageListItem
                            key={index}
                            sx={{
                              '.MuiImageListItem-img':{
                                objectFit: 'contain',
                                // width: '4rem'
                              }
                            }}
                          >
                            <img src={item.src} alt={item.alt} />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontSize: "1.4rem" }}>
                      Seamless and Secure Payments: Pay with Confidence Using Your Credit Card!
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          height: "5vh",
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
                          <RadioButtonUncheckedIcon />
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
                      <ImageList sx={{ width: 200 }} cols={3} gap={8}>
                          <ImageListItem
                          >
                            <img src={paytm} alt='paytm logo' />
                          </ImageListItem>
                        {/* ))} */}
                      </ImageList>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontSize: "1.4rem" }}>
                      Seamless and Secure Payments: Pay with Confidence Using Online Payments Method!
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          height: "5vh",
                          fontSize: "1.4rem",
                        }}
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        <QrCodeIcon/>
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
                          <RadioButtonUncheckedIcon />
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
                      <Typography sx={{ fontSize: "1.4rem" }}>Flexible and Traditional: Experience the Ease of Cash Payments!
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          height: "5vh",
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
                  width: 440,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Result
                  status="success"
                  title={<>Paid ₹{(totalPrice-totalPrice*0.1).toFixed(2)} Successfully </>}
                  subTitle="Thanks for Shopping! Visit again"
                  extra={[
                    <Button variant="contained" key="print Bill" >
                      Print Bill
                    </Button>,
                    <Button variant="contained" key="Home" onClick={()=>navigate("/nhome")} color="success"> Home</Button>,
                  ]}
                />
              </Box>
            </Modal>
          </Box>
        </div>
      </section>
    </>
  );
}


