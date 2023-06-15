import {
  Box,
  Stack,
  Button,
  Badge,
  Grid,
  AppBar,
  Toolbar,
  Snackbar,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
// import Navbar from "../components/Navbar";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";

// let totalItemsGlobal;
// let itemsArrayGlobal;
export let itemsArrayGlobal = [];

export default function Ncart() {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [itemsArray, setItems] = useState([]);
  // const [itemName, setItemName] = useState();
  // const [expanded, setExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [itemSelectedManually, setItemManually] = useState(null);
  const [itemSelectedManuallyObj, setItemManuallyObj] = useState({name: '', price: 0});
  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  const [isPaymentCliked, setPaymentClicked] = useState(false);

  const defaultProps = {
    options: fruitsFromDb,
    getOptionLabel: (option) => option.name,
  };
  const flatProps = {
    options: fruitsFromDb.map((option) => option.name),
  };

  const addItemToCart = () => {
    if (itemSelectedManuallyObj.name.trim() !== "") {
      const obj = {
        title: itemSelectedManuallyObj.name,
        description: ` description of ${itemSelectedManuallyObj.name}`,
        price: itemSelectedManuallyObj.price,
        qty: 1,
      };
      setItems([...itemsArray, obj]);
      setItemManually(null);
      itemsArrayGlobal.push(obj);
      setShowSnackbar(true);
    }
    // console.log(itemsArray);
  };
  const removeItemFromCart = (index) => {
    setTotalItems(totalItems - 1);
    setItems((prevState) => {
      return prevState.filter((currentValue, idx) => {
        return idx !== index;
      });
    });
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
    setImage(capturedImage);
    // handleStopCaptureClick();
  };

  useEffect(() => {
    handleStartCaptureClick();
  }, []);
  return (
    <>
      <section className="new-cart">
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
                <NavLink to="/nhome" className="navbar__home">
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
                    badgeContent={itemsArray.length}
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
          direction="row"
          sx={{
            padding: "12rem 4rem 0rem",
            justifyContent: "space-between",
            height: "60rem",
          }}
        >
          <Snackbar
            open={showSnackbar}
            autoHideDuration={1000}
            onClose={() => setShowSnackbar(false)}
            message="Item added to cart"
            sx={{
              "& .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": {
                fontSize: "1.4rem",
              },
            }}
          />
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
              <figure className="home__clicked-image">
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
              "&": {
                width: "50%",
                // background: '#f1f3f6',
                // backgroundColor: 'black',
                borderRadius: ".5rem",
                height: "50.6rem",
              },
              "& .MuiPaper-root": {
                // height: '5rem'
              },
            }}
          >
            <div className="cart__input">
              {/* <input
                type="text"
                name="item-name"
                placeholder="Add Item name"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                value={itemName}
              /> */}
              <Autocomplete
                {...defaultProps}
                onChange={(event, newValue) => {
                  setItemManuallyObj(newValue);
                }}
                autoHighlight
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select item"
                    variant="standard"
                    sx={{
                      '&':{
                      // backgroundColor: 'white',
                      // height:'3rem'
                      },
                      '& label':{
                      fontSize: '1.8rem',
                      }
                    }}
                  />
                )}
                sx={{
                  width: '40%',
                  // fontSize: '5.4rem'
                }}
              />

              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addItemToCart}
              >
                Add item
              </Button>
            </div>

            <Stack
              sx={{
                height: "44.3rem",
                overflowY: "scroll",
              }}
            >
              {/* <Paper>Item 1</Paper>
          <Paper>Item 2</Paper> */}
              {/* {itemsArray.map((currentValue, index) => {
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
              })} */}

              {itemsArray.map((currentValue, index) => {
                return (
                  <CartItem
                    index={index}
                    item={currentValue}
                    removeItemFromCart={removeItemFromCart}
                    // key={index}
                    // onSelect={deleteItem}
                    // text={currentValue}
                    // title={currentValue.title}
                    // description={currentValue.description}
                    // price={currentValue.price}
                    // qty={currentValue.qty}
                  />
                );
              })}
            </Stack>
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{
            "&": {
              margin: "0 4rem",
              alignItems: "center",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={5}
            sx={{
              "&": {
                // m: "2rem 0 0",
                width: "50%",
                // padding: "0 0 0 1rem",
                justifyContent: "space-around",
              },
              ".css-1jspvjo-MuiStack-root>:not(style)+:not(style)": {
                marginLeft: "0px",
              },
            }}
          >
            <Button
              variant="contained"
              // color="orange"
              type="reset"
              sx={{ 
                '&':{
                fontSize: "1.6rem", 
                backgroundColor: "orange"
                },
                '&:hover':{
                  backgroundColor: "#ff7300",
                }
               }}
              // onClick={() => {
              //   setNumber("");
              //   setName("");
              // }}
            >
              Reset
            </Button>
            {image !== null ? (
              <Button
                variant="contained"
                color="success"
                sx={{ fontSize: "1.6rem" }}
                onClick={handleStartCaptureClick}
              >
                {image ? "Restart camera" : "Start Camera"}
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ fontSize: "1.6rem" }}
                onClick={() => {
                  handleCaptureClick();
                }}
              >
                Take snapshot
              </Button>
            )}
            <Button
              variant="contained"
              color="success"
              sx={{ fontSize: "1.6rem" }}
              // href="/cart"
              onClick={() => {
                if (image) {
                  setItems([...itemsArray, ...cartObject]);
                  itemsArrayGlobal.push(...cartObject);
                  // setImage(null);
                  setShowSnackbar(true);
                  handleStartCaptureClick();
                } else {
                }
              }}
            >
              Add to cart
            </Button>
          </Stack>
          <Button
            variant="contained"
            // color="primar"
            sx={{
              "&": {
                // marginTop: '2rem',
                width: "50%",
                height: "4rem",
                // borderRadius: '0',
                // backgroundColor: "#F34237",
                // backgroundColor: 'var(--submit)',
                fontSize: "2rem",
              },
            }}
            onClick={() => {
              setPaymentClicked(!isPaymentCliked);
              // alert("Thanks for shopping");
              window.location.href = "/cart";
            }}
          >
            Checkout
          </Button>
        </Stack>
      </section>
    </>
  );
}

const cartObject = [
  {
    title: "Lorem Item1",
    description: "Lorem Item description",
    price: 190.0,
    qty: 1,
  },
  {
    title: "Lorem Item2",
    description: "Lorem Item description",
    price: 90.0,
    qty: 2,
  },
  {
    title: "Lorem Item3",
    description: "Lorem Item description",
    price: 93.0,
    qty: 1,
  },
  {
    title: "Lorem Item4",
    description: "Lorem Item description",
    price: 32.0,
    qty: 3,
  },
  {
    title: "Lorem Item5",
    description: "Lorem Item description",
    price: 93.0,
    qty: Math.floor(Math.random() * 8) + 1,
  },
];
// console.log(totalItemsGlobal);
// export { totalItemsGlobal, itemsArrayGlobal };


const fruitsFromDb = [
  {name: 'Litchi',price: 32},
  { name: 'Apple', price: 20 },
  { name: 'Banana', price: 21 },
  { name: 'Orange', price: 22 },
  { name: 'Grapes', price: 23 },
  { name: 'Mango', price: 24 },
  { name: 'Pineapple', price: 25 },
  { name: 'Watermelon', price: 26 },
  { name: 'Strawberry', price: 27 },
  { name: 'Cherry', price: 28 },
  { name: 'Blueberry', price: 29 },
  { name: 'Peach', price: 30 },
  { name: 'Pear', price: 31 },
  { name: 'Plum', price: 32 },
  { name: 'Kiwi', price: 33 },
  { name: 'Lemon', price: 34 },
  { name: 'Lime', price: 35 },
  { name: 'Raspberry', price: 36 },
  { name: 'Blackberry', price: 37 },
  { name: 'Cantaloupe', price: 38 },
  { name: 'Pomegranate', price: 39 },
]