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
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
// import Navbar from "../components/Navbar";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
import apple from "../images/apple.jpeg";
import apples from "../images/apples.jpg";
import mango from "../images/mango.jpeg";
import pineApple from "../images/pineapple.jpeg";
import Pomegranate from "../images/pomegranate.jpeg";
import capscicumGreen from "../images/capscicum-green.jpeg";
import totalItemInDb, { apiLocalPath } from "../rowData";
import { useNavigate, Navigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";

// let totalItemsGlobal;
// let itemsArrayGlobal;
export let itemsArrayGlobal = [];

export default function Ncart() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [itemsArray, setItems] = useState([]);
  // const [itemName, setItemName] = useState();
  // const [expanded, setExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [itemSelectedManually, setItemManually] = useState(null);
  const [itemSelectedManuallyObj, setItemManuallyObj] = useState({
    name: "",
    price: 0,
  });
  const [authenticated, setauthenticated] = useState(
    sessionStorage.getItem("accessToken") || false
  );

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  const [isPaymentCliked, setPaymentClicked] = useState(false);

  const defaultProps = {
    // options: fruitsFromDb,
    options: totalItemInDb,
    getOptionLabel: (option) => option.name,
  };
  const flatProps = {
    // options: fruitsFromDb.map((option) => option.name),
    options: totalItemInDb.map((option) => option.name),
  };

  const addItemToCart = () => {
    if (itemSelectedManuallyObj.name.trim() !== "") {
      const obj = {
        title: itemSelectedManuallyObj.name,
        description: ` description of ${itemSelectedManuallyObj.name}`,
        price: itemSelectedManuallyObj.price,
        qty: 1,
        imgSrc: itemSelectedManuallyObj.imgSrc,
        probability: itemSelectedManuallyObj.probability,
      };
      setTotalItems(totalItems + 1);
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
        if (idx === index) {
          setTotalItems(totalItems - currentValue.qty);
        }
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
  function addQuantity(index) {
    setItems((prevState) => {
      return prevState.filter((current, idx) => {
        if (idx === index) {
          current.qty = current.qty + 1;
        }
        return true;
      });
    });
  }
  function deleteQuantity(index) {
    setItems((prevState) => {
      return prevState.filter((current, idx) => {
        if (idx === index && current.qty > 1) {
          current.qty = current.qty - 1;
        }
        return true;
      });
    });
  }
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


  const [base64Image, setBase64Image] = useState(null);
  const convertImageToBase64 = () => {
    fetch(apples)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setBase64Image(base64String);
        };
        reader.readAsDataURL(blob);
      });
      // return base64Image;
  };


  useEffect(() => {
    handleStartCaptureClick();
    const fetchImage = async () => {
      try {
        const response = await fetch(apples);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
          console.log(reader);
          const base64String = reader.result;

          setBase64Image(base64String);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, []);
  // if (authenticated) {
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
                      badgeContent={itemsArray.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.qty,
                        0
                      )}
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
              height: "65rem",
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
                <Autocomplete
                  {...defaultProps}
                  onChange={(event, newValue) => {
                    setItemManuallyObj(newValue);
                  }}
                  autoHighlight
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Add item manually"
                      variant="standard"
                      sx={{
                        "&": {
                          // backgroundColor: 'white',
                          // height:'3rem'
                        },
                        "& label": {
                          fontSize: "1.8rem",
                        },
                      }}
                    />
                  )}
                  sx={{
                    width: "40%",
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={addItemToCart}
                  sx={{
                    "&, & svg": {
                      fontSize: "1.8rem",
                    },
                  }}
                >
                  Add
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
                      addQuantity={addQuantity}
                      deleteQuantity={deleteQuantity}
                      key={index}
                    />
                  );
                })}
              </Stack>
              <Stack
                direction={"row"}
                // spacing={2}
                justifyContent={'space-around'}
                mt={2}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "1.8rem",
                    // width: "10%",
                    position: 'relative'
                    // alignItems:'center'
                    // display: 'block'
                  },
                  '.MuiTypography-root:: after':{
                    content: "''",
                    position: 'absolute',
                    top: '-.2rem',
                    right: '-3.2rem',
                    width: "3rem",
                    height: '3rem',
                    borderRadius: "50%",
                  }
                }}
              >
                <Typography>Product Detection Probability</Typography>
                <Typography
                sx={{
                  '&':{
                    position: 'relative'
                  },
                  '&::after':{
                    background:'red'
                  }
                }}
                 >
                  0-50%:-
                </Typography>
                <Typography
                sx={{
                  '&::after':{
                    background:'orange'
                  }
                }}
                >
                  51-70%:-
                  
                </Typography>
                <Typography
                sx={{
                  '&::after':{
                    background:'green'
                  }
                }}
                >
                  71-100%:-{" "}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              "&": {
                margin: "0 4rem",
                alignItems: "center",
                mb: "1.4rem",
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
                  "&": {
                    fontSize: "1.6rem",
                    backgroundColor: "orange",
                  },
                  "&:hover": {
                    backgroundColor: "#ff7300",
                  },
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
                    setTotalItems(
                      itemsArray.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.qty,
                        totalItems
                      )
                    );
                    setShowSnackbar(true);
                    handleStartCaptureClick();


                    let data = JSON.stringify({
                      image: base64Image,
                    });
                    // console.log(base64Image);
                    // console.log(sessionStorage.getItem('userName'));
                    // console.log(sessionStorage.getItem('accessToken'));

                    let config = {
                      method: "post",
                      maxBodyLength: Infinity,
                      url: apiLocalPath+"/orders/addNew/",
                      headers: {
                        Authorization:
                          "Bearer " + sessionStorage.getItem("accessToken"),
                      },
                      data: data,
                    };

                    axios
                      .request(config)
                      .then((response) => {
                        console.log(JSON.stringify(response.data));
                      })
                      .catch((error) => {
                        console.log(error);
                      });
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
                  width: "50%",
                  height: "4rem",
                  fontSize: "2rem",
                },
              }}
              onClick={() => {
                setPaymentClicked(!isPaymentCliked);
                sessionStorage.setItem(
                  "itemsArray",
                  JSON.stringify(itemsArray)
                );
                navigate("/cart");
                // window.location.href = "/cart";
              }}
            >
              Checkout
            </Button>
          </Stack>

          {/* <ImageToBase64Converter/> */}
        </section>
        <Footer />
      </>
    );
  // } else {
    // return <Navigate replace to="/nhome" />;
  // }
}

export const cartObject = [
  {
    title: "Lorem Item1",
    description: "Lorem Item description",
    price: 190.0,
    qty: 1,
    imgSrc: apple,
    probability: 81,
  },
  {
    title: "Lorem Item2",
    description: "Lorem Item description",
    price: 90.0,
    qty: 2,
    imgSrc: pineApple,
    probability: 52,
  },
  {
    title: "Lorem Item3",
    description: "Lorem Item description",
    price: 93.0,
    qty: 1,
    imgSrc: Pomegranate,
    probability: 58,
  },
  {
    title: "Lorem Item4",
    description: "Lorem Item description",
    price: 32.0,
    qty: 3,
    imgSrc: mango,
    probability: 91,
  },
  {
    title: "Lorem Item5",
    description: "Lorem Item description",
    price: 93.0,
    qty: Math.floor(Math.random() * 8) + 1,
    imgSrc: capscicumGreen,
    probability: 50,
  },
];
// console.log(totalItemsGlobal);
// export { totalItemsGlobal, itemsArrayGlobal };

// const fruitsFromDb = [
//   {name: 'Litchi',price: 32, imgSrc: litchi, probability: 46},
//   { name: 'Apple', price: 20, imgSrc: apple,probability: 61},
//   { name: 'Banana', price: 21,imgSrc: banana,probability: 54 },
//   { name: 'Orange', price: 22, imgSrc: orange,probability: 76},
//   { name: 'Grapes', price: 23, imgSrc: grapes,probability: 73 },
//   { name: 'Mango', price: 24, imgSrc: mango,probability: 90 },
//   { name: 'Pineapple', price: 25, imgSrc: pineApple, probability: 84 },
//   { name: 'Watermelon', price: 26, imgSrc: Watermelon, probability: 81 },
//   { name: 'Strawberry', price: 27, imgSrc: strawberry, probability: 63 },
//   { name: 'Cherry', price: 28, imgSrc: strawberry, probability: 42 },
//   { name: 'Blueberry', price: 29, imgSrc: grapes, probability: 81 },
//   { name: 'Peach', price: 30, imgSrc: orange, probability: 47 },
//   { name: 'Pear', price: 31, imgSrc: mango, probability: 90 },
//   { name: 'Plum', price: 32, imgSrc: litchi,probability: 69 },
//   { name: 'Kiwi', price: 33 , imgSrc: apple, probability: 49},
//   { name: 'Lemon', price: 34, imgSrc:orange,probability: 59 },
//   { name: 'Lime', price: 35, imgSrc: pineApple, probability: 70 },
//   { name: 'Raspberry', price: 36 , imgSrc: grapes, probability: 84},
//   { name: 'Blackberry', price: 37, imgSrc: grapes, probability: 66 },
//   { name: 'Cantaloupe', price: 38, imgSrc: Watermelon, probability: 43 },
//   { name: 'Pomegranate', price: 39, imgSrc: Pomegranate, probability: 67 },
// ];

// const ImageToBase64Converter = () => {

// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   console.log(file);
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result;
//       console.log(base64String);
//     };
//     reader.readAsDataURL(file);
//   }
// };
// console.log(handleImageUpload(apples));

//   return (
//     <div>
//       <h1>Image to Base64 Conversion</h1>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//     </div>
//   );
// };
