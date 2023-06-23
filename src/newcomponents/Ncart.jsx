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
  Modal,
  List,
  ListItem,
  ListItemText,
  IconButton,
  // MuiAlert
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useRef } from "react";
import { useState } from "react";
// import Navbar from "../components/Navbar";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CloseIcon from "@mui/icons-material/Close";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
import apple from "../images/apple.jpeg";
import apples from "../images/apples.jpg";
import mango from "../images/mango.jpeg";
import mangos from "../images/mangos.jpeg";
import pineApple from "../images/pineapple.jpeg";
import Pomegranate from "../images/pomegranate.jpeg";
import capscicumGreen from "../images/capscicum-green.jpeg";
import totalItemInDb, { apiLocalPath } from "../rowData";
import { useNavigate, Navigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { Result } from "antd";

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
  const [uploadItemPhoto, setUploadItemPhoto] = useState(null);
  const [openUnAvailableModal, setOpenUnAvailableModal] = useState(false);
  const [itemSelectedManuallyObj, setItemManuallyObj] = useState({
    productName: "",
  });
  const [authenticated, setauthenticated] = useState(
    sessionStorage.getItem("accessToken") || false
  );
  const [orderID, setOrderId] = useState(null);
  const [unAvailable, setUnAvailable] = useState([]);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  const [isPaymentCliked, setPaymentClicked] = useState(false);

  const defaultProps = {
    // options: fruitsFromDb,
    options: totalItemInDb,
    getOptionLabel: (option) => option.productName,
  };
  const flatProps = {
    // options: fruitsFromDb.map((option) => option.name),
    options: totalItemInDb.map((option) => option.productName),
  };
  function addItemToCartApi(productName, quantity) {
    let data = JSON.stringify({
      newOrderItem: {
        name: productName,
        quantity: quantity,
      },
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: apiLocalPath + "/orders/" + orderID,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setItems([...itemsArray, response.data.data.available]);
        setItemManually(null);
        // itemsArrayGlobal.push(obj);
        setShowSnackbar(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addItemToCart = () => {
    if (itemSelectedManuallyObj.productName.trim() !== "") {
      // const obj = {
      //   productName: itemSelectedManuallyObj.productName,
      //   description: ` description of ${itemSelectedManuallyObj.productName}`,
      //   price: itemSelectedManuallyObj.price,
      //   quantity: 1,
      //   imgSrc: itemSelectedManuallyObj.imgSrc,
      //   probability: itemSelectedManuallyObj.probability,
      // };
      // setTotalItems(totalItems + 1);
      // setItems([...itemsArray, obj]);
      // setItemManually(null);
      // itemsArrayGlobal.push(obj);
      // setShowSnackbar(true);
      addItemToCartApi(itemSelectedManuallyObj.productName, 1);
    }
    // console.log(itemsArray);
  };
  const removeItemFromCart = (index) => {
    let data = "";

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url:
        apiLocalPath +
        "/orders/" +
        itemsArray[index].orderID +
        "/" +
        itemsArray[index].orderItemID,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setItems((prevState) => {
          return prevState.filter((currentValue, idx) => {
            if (idx === index) {
              setTotalItems(totalItems - currentValue.quantity);
            }
            return idx !== index;
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // setTotalItems(totalItems - 1);
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
  // const axios = require('axios');

  function QuantityApi(index, quantity) {
    console.log(itemsArray[index]);
    let data = JSON.stringify({
      productID: itemsArray[index].productID,
      quantity: quantity,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url:
        apiLocalPath +
        "/orders/" +
        itemsArray[index].orderID +
        "/" +
        itemsArray[index].orderItemID,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data.data);
        setItems((prevState) => {
          return prevState.filter((current, idx) => {
            if (idx === index) {
              Object.assign(current, response.data.data);
            }
            return true;
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleIncrement(index) {
    QuantityApi(index, +itemsArray[index].quantity + 1);
  }
  function handleDecrement(index) {
    QuantityApi(index, +itemsArray[index].quantity - 1);
  }
  function changeQuantity(index, value) {
    QuantityApi(index, +value);
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

    const imageData = capturedImage.split(",")[1];
    setBase64Image(imageData);
    // handleStopCaptureClick();
  };

  const [base64Image, setBase64Image] = useState(null);
  const fetchImage = async (imagePath) => {
    // console.log(imagePath);

    // const imageData = imagePath.split(",")[1];
    // setBase64Image(imageData);
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader);
        const base64String = reader.result;
        const imageData = base64String.split(",")[1];
        setBase64Image(imageData);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  useEffect(() => {
    handleStartCaptureClick();

    // fetchImage();
  }, []);
  if (authenticated) {
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
          <Box>
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
                    width: "64rem",
                    height: "48rem",
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
              {itemsArray.map((currentValue, index) => {
                return (
                  <CartItem
                    index={index}
                    item={currentValue}
                    removeItemFromCart={removeItemFromCart}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    key={index}
                    changeQuantity={changeQuantity}
                  />
                );
              })}
            </Stack>
            {/* production Detection probability */}
            {/* <Stack
              direction={"row"}
              // spacing={2}
              justifyContent={"space-around"}
              mt={2}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "1.8rem",
                  // width: "10%",
                  position: "relative",
                  // alignItems:'center'
                  // display: 'block'
                },
                ".MuiTypography-root:: after": {
                  content: "''",
                  position: "absolute",
                  top: "-.2rem",
                  right: "-3.2rem",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                },
              }}
            >
              <Typography>Product Detection Probability</Typography>
              <Typography
                sx={{
                  "&": {
                    position: "relative",
                  },
                  "&::after": {
                    background: "red",
                  },
                }}
              >
                0-50%:-
              </Typography>
              <Typography
                sx={{
                  "&::after": {
                    background: "orange",
                  },
                }}
              >
                51-70%:-
              </Typography>
              <Typography
                sx={{
                  "&::after": {
                    background: "green",
                  },
                }}
              >
                71-100%:-{" "}
              </Typography>
            </Stack> */}
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
                alignItems: "center",
              },
              ".css-1jspvjo-MuiStack-root>:not(style)+:not(style)": {
                marginLeft: "0px",
              },
              "& .MuiButton-root": {
                fontSize: "1.4rem",
              },
            }}
          >
            <Button
              variant="contained"
              // color="orange"
              type="reset"
              sx={{
                "&": {
                  backgroundColor: "orange",
                },
                "&:hover": {
                  backgroundColor: "#ff7300",
                },
              }}
              onClick={() => {
                setItems([]);
              }}
            >
              Reset
            </Button>
            <input
              type="file"
              id="upload-button"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUploadItemPhoto(reader.result);
                    setImage(reader.result);
                    const base64String = reader.result;
                    // console.log(base64String);
                    const imageData = base64String.split(",")[1];
                    setBase64Image(imageData);
                  };
                  reader.readAsDataURL(file);
                }
                // setUploadItemPhoto(file);
                // console.log(uploadItemPhoto)
                e.target.value = null;
              }}
            />
            <label htmlFor="upload-button">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {image !== null ? (
              <Button
                variant="contained"
                color="success"
                onClick={handleStartCaptureClick}
              >
                {image ? "Restart camera" : "Start Camera"}
              </Button>
            ) : (
              <Button
                variant="contained"
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
              // href="/cart"
              onClick={() => {
                if (image) {
                  if (!orderID) {
                    handleStartCaptureClick();
                    let data = JSON.stringify({
                      image: base64Image,
                    });

                    let config = {
                      method: "post",
                      maxBodyLength: Infinity,
                      url: apiLocalPath + "/orders/addNew/",
                      headers: {
                        Authorization:
                          "Bearer " + sessionStorage.getItem("accessToken"),
                      },
                      data: data,
                    };

                    axios
                      .request(config)
                      .then((response) => {
                        console.log(response.data);
                        // console.log(response.data.data.orderItems.available.reduce((accumulator,current)=>{
                        //   return [...accumulator, current.fields]
                        // },[]));

                        // console.log(response.data.data);
                        setShowSnackbar(true);
                        setOrderId(response.data.data.order.pk);
                        console.log(response.data.data.orderItems.available);
                        setItems([
                          ...itemsArray,
                          ...response.data.data.orderItems.available.reduce(
                            (accumulator, current) => {
                              return [...accumulator, current.fields];
                            },
                            []
                          ),
                        ]);
                        if (response.data.data.orderItems.unavailable.length !== 0) {
                          setUnAvailable([...response.data.data.orderItems.unavailable]);
                          setOpenUnAvailableModal(true);
                        }

                        setUploadItemPhoto(null);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    handleStartCaptureClick();
                    console.log(itemsArray);
                    let data = JSON.stringify({
                      image: base64Image,
                      existingOrderItems: itemsArray,
                    });

                    let config = {
                      method: "put",
                      maxBodyLength: Infinity,
                      url: apiLocalPath + "/orders/" + orderID,
                      headers: {
                        Authorization:
                          "Bearer " + sessionStorage.getItem("accessToken"),
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };

                    axios
                      .request(config)
                      .then((response) => {
                        console.log(response.data);
                        setShowSnackbar(true);
                        setItems([...response.data.data.available]);
                        if (response.data.data.unavailable.length !== 0) {
                          setUnAvailable([...response.data.data.unavailable]);
                          setOpenUnAvailableModal(true);
                        }
                        setUploadItemPhoto(null);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
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
              sessionStorage.setItem("itemsArray", JSON.stringify(itemsArray));
              navigate("/cart");
              // window.location.href = "/cart";
            }}
          >
            Checkout
          </Button>
        </Stack>

        {/* <ImageToBase64Converter/> */}
        <Modal
          open={Boolean(openUnAvailableModal)}
          onClose={() => {
            setUnAvailable(false);
          }}
        >
          <Box sx={addItemModalStyle}>
            {/* <h2></h2>

            
             */}
            <IconButton
              onClick={(e) => setOpenUnAvailableModal(false)}
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
                "&: hover": {
                  color: "red",
                },
                "& svg": {
                  fontSize: "2.4rem",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <Result
              icon={
                <SentimentVeryDissatisfiedIcon
                  sx={{ fontSize: "5rem", color: "#ff7416" }}
                />
              }
              title={<>Sorry, {unAvailable.length===1?<>This item is not</>:<>These items are not</>} unavailable</>}
              extra={
                <>
                  <List sx={{
                    '& .MuiTypography-root':{
                      fontSize: '2rem',
                      textAlign: 'center',
                      textTransform: 'capitalize'
                    }
                  }}>
                    { unAvailable.map((currentValue, index) => {
                      return (
                        <ListItem key={index}>
                          {Object.entries(currentValue).map(([key, value]) => (
                            <ListItemText key={key}>
                              {value}
                            </ListItemText>
                            
                          ))}
                        </ListItem>
                      );
                    })}
                  </List>
                </>
              }
            />
            {/* <Button
              type="primary"
              onClick={() => setOpenUnAvailableModal(false)}
            >
              Close It
            </Button> */}
          </Box>
        </Modal>
      </section>
      <Footer />
    </>
  );
  } else {
    return (
      <>
        <Modal open={!sessionStorage.getItem("accessToken")}>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "2rem",
              height: "20rem",
            }}
          >
            <Typography variant="h2" gutterBottom>
              Please Login
            </Typography>
            <Typography variant="body1" color="textSecondary" fontSize="3rem">
              You need to log in to access this page.
            </Typography>
            <Button
              variant="contained"
              onClick={
                () => (window.location.href = "nhome")
                // <Navigate replace to="/nhome" />
              }
              style={{ marginTop: "1rem", fontSize: "1.8rem" }}
            >
              Go to home
            </Button>
          </Box>
        </Modal>

        {/* <Navigate replace to="/nhome" /> */}
      </>
    );
  }
}

const addItemModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  margin: "0 auto",
  fontSize: "1.8rem",
  textAlign: "center",
  "& .MuiButton-root": {
    fontSize: "1.4rem",
  },
  "& .ant-result": {
    // padding: 0
  },
  // "& button, & .MuiSelect-select, & input, & label": {
  //   fontSize: "1.8rem",
  // },
};

export const cartObject = [
  {
    productName: "Lorem Item1",
    description: "Lorem Item description",
    price: 190.0,
    quantity: 1,
    imgSrc: apple,
    probability: 81,
  },
  {
    productName: "Lorem Item2",
    description: "Lorem Item description",
    price: 90.0,
    quantity: 2,
    imgSrc: pineApple,
    probability: 52,
  },
  {
    productName: "Lorem Item3",
    description: "Lorem Item description",
    price: 93.0,
    quantity: 1,
    imgSrc: Pomegranate,
    probability: 58,
  },
  {
    productName: "Lorem Item4",
    description: "Lorem Item description",
    price: 32.0,
    quantity: 3,
    imgSrc: mango,
    probability: 91,
  },
  {
    productName: "Lorem Item5",
    description: "Lorem Item description",
    price: 93.0,
    quantity: Math.floor(Math.random() * 8) + 1,
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
