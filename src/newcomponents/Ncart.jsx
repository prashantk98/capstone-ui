import { Box, Stack,Button,Badge,Grid,AppBar,Toolbar,Typography,Card,Accordion,AccordionSummary,AccordionDetails,CardContent,ImageList,ImageListItem } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
// import Navbar from "../components/Navbar";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
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

export default function Ncart (){

  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [itemsArray, setItems] = useState(cartObject);
  const [itemName, setItemName] = useState();
  const [expanded, setExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(5);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [isPaymentCliked, setPaymentClicked] = useState(false);

  // const defaultProps = {
  //   options: itemsFromDb,
  //   getOptionLabel: (option) => option.title,
  // };
  // const flatProps = {
  //   options: itemsFromDb.map((option) => option.title),
  // };
  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

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

  const handleStartCaptureClick = async () => {
    try {
      setImage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(err);
    }
  };
  // const handleStopCaptureClick = () => {
  //   const stream = videoRef.current.srcObject;
  //   if (stream) {
  //     const tracks = stream.getTracks();
  //     tracks.forEach((track) => track.stop());
  //     videoRef.current.srcObject = null;
  //   }
  // };

  const handleCaptureClick = () => {
    audioRef.current.play();
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL();
    console.log(capturedImage);
    setImage(capturedImage);
    // handleStopCaptureClick();
  };

  useEffect(() => {
    handleStartCaptureClick();
  }, []);
  return<>
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
              <NavLink to="/nhome" className="navbar__home">
                Home
              </NavLink>
            </Grid>
            <Grid item
            sx={{
              position: 'relative'
            }}
            >
              <NavLink to="/ncart" className="navbar__cart">
                {/* <ShoppingCart
                sx={
                  {
                    fontSize: '5rem',
                    verticalAlign: 'middle',
                    fontWeight: '400',
                    opacity: '.7'
                  }
                }
                /> */}
                <Badge badgeContent={totalItems}
                sx={
                  {
                    '& .MuiBadge-badge':{
                      fontSize: '2rem',
                      margin: '0 .8rem 0'
                    }
                  }
                }
                >
                  <ShoppingCart
                  sx={
                    {
                      fontSize: '3rem',
                      padding: '0 .8rem'
                    }
                  }
                  ></ShoppingCart>
                </Badge>
                {/* <Typography
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
                  >0</Typography> */}
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
  <Stack 
  direction='row'
  sx={
    {
      padding: '7rem 4rem 0rem',
      justifyContent: 'space-between',
      height: '60rem'
    }
  }
  >
    <Box>
          {!image ? (
            <div className="home__camera-screen">
              <video
                ref={videoRef}
                autoPlay
                // playsInline
                // width={"100%"}
                // height={"100%"}
              ></video>
            </div>
          ) : (
            <figure  className="home__clicked-image">
              <img
                src={image}
                alt="click on take snapshot"
                style={{
                  // width: "100%",
                  // height: "99%",
                  animation: "pulse .2s 1",
                  // border: "2px solid salmon",
                }}
              />
            </figure>
          )}
          <audio ref={audioRef} src={require("../shutter.wav")} />
          
    </Box>
    <Box
          sx={{
            '&':{
              width:'50%',
              // background: '#f1f3f6',
              backgroundColor: 'black',
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
          height: '44.3rem',
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
              '&':{
              width: "100%",
              height: "75vh",
              // backgroundColor: "#90efc7",
              background:'none',
              boxShadow: 'unset'
              },
              '& .css-46bh2p-MuiCardContent-root':{
                padding: '0'
              }
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
  </Stack>
  <Stack direction='row'
  sx={{
    '&':{
      margin: '0 4rem',
      alignItems: 'center'
    }
  }}
  >
  <Stack
              direction="row"
              spacing={5}
              sx={{
                '&':{
                // m: "2rem 0 0",
                width: "50%",
                // padding: "0 0 0 1rem",
                justifyContent: "space-around",
                },
                '.css-1jspvjo-MuiStack-root>:not(style)+:not(style)': {
                  marginLeft: '0px'
                }
              }}
            >
              <Button
                variant="contained"
                color="error"
                type="reset"
                sx={{ fontSize: "1.6rem" }}
                // onClick={() => {
                //   setNumber("");
                //   setName("");
                // }}
              >
                Reset
              </Button>
              {
                image!==null?<Button
                variant="contained"
                color="success"
                sx={{ fontSize: "1.6rem" }}
                onClick={handleStartCaptureClick}
              >
                {image ? "Restart camera" : "Start Camera"}
              </Button>
              :<Button
                variant="contained"
                sx={{ fontSize: "1.6rem" }}
                onClick={() => {
                  handleCaptureClick();
                }}
              >
                Take snapshot
              </Button>

              }
              <Button
                variant="contained"
                color="success"
                sx={{ fontSize: "1.6rem" }}
                href="/cart"
              >
                Add to cart
              </Button>
    </Stack>
    <Button
        variant="contained"
        // color="primar"
        sx={{
          '&': {
          // marginTop: '2rem',
          width: "50%",
          height: "4rem",
          // borderRadius: '0',
          // backgroundColor: "#F34237",
          // backgroundColor: 'var(--submit)',
          fontSize: "2rem",
          },
        }}
        onClick={()=>{setPaymentClicked(!isPaymentCliked)
        alert('Thanks for shopping');
        window.location.href= '/nhome';
        }
      }
      >
        Pay via Cash
    </Button>
        
    </Stack>
  </>
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