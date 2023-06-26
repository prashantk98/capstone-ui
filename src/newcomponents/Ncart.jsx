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
  Modal,
  List,
  ListItem,
  ListItemText,
  IconButton,
  // MuiAlert
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
// import Navbar from "../components/Navbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CloseIcon from "@mui/icons-material/Close";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
import { apiLocalPath, ShowItemToAddManually } from "../rowData";
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
  const [itemsArray, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem("itemsArray");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  // const [itemName, setItemName] = useState();
  // const [expanded, setExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  // const [itemSelectedManually, setItemManually] = useState(null);
  const [uploadItemPhoto, setUploadItemPhoto] = useState(null);
  const [openUnAvailableModal, setOpenUnAvailableModal] = useState(false);
  const [itemSelectedManuallyObj, setItemManuallyObj] = useState({
    productName: "",
  });
  const [authenticated, setauthenticated] = useState(
    sessionStorage.getItem("accessToken") || false
  );
  const [orderID, setOrderId] = useState(() => {
    const sessionOrderId = sessionStorage.getItem("orderId");
    return sessionOrderId ? JSON.parse(sessionOrderId) : null;
  });
  const [unAvailable, setUnAvailable] = useState([]);

  const defaultProps = {
    options: ShowItemToAddManually.sort((a, b) => {
      return (a.productName < b.productName) ? -1: ((a.productName > b.productName)?  1: 0)
    }),
    getOptionLabel: (option) => option.productName,
  };

  function resetCartApi(){
    console.log(orderID);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiLocalPath+'/orders/orderItems/'+orderID,
      headers: { 
        'Authorization': 'Bearer '+sessionStorage.getItem('accessToken')
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function UpdateCartApi(base64Image) {
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
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
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
        let indexOfItem = -1;
        for (let index = 0; index < itemsArray.length; index++) {
          console.log(itemsArray[index].productID, productName);
          if (itemsArray[index].productID === productName) {
            indexOfItem = index;
          }
        }
        if (indexOfItem !== -1) {
          // console.log('This is called')
          QuantityApi(indexOfItem, itemsArray[indexOfItem].quantity + 1);
        } else {
          setItems([...itemsArray, response.data.data.available]);
        }
        // setItemManuallyObj({
        //   productName: "",
        // });
        setShowSnackbar(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addItemToCart = () => {
    if (itemSelectedManuallyObj.productName.trim() !== "") {
      addItemToCartApi(itemSelectedManuallyObj.productName, 1);
    }
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
      videoRef.current.style.transform = "scaleX(-1)";
      videoRef.current.style.width = "100%";
      videoRef.current.style.height = "100%";
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
    if (itemsArray[index].quantity > 1)
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

  useEffect(() => {
    let data = "";

    if (sessionStorage.getItem("orderId") === null) {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: apiLocalPath + "/orders/addNew/",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(response.data);

          setOrderId(response.data.data.order.pk);
          sessionStorage.setItem('orderId', response.data.data.order.pk);
          // sessionStorage.clear();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    handleStartCaptureClick();
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
                resetCartApi();
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
                  // if (!orderID) {
                  //   handleStartCaptureClick();
                  //   let data = JSON.stringify({
                  //     image: base64Image,
                  //   });

                  //   let config = {
                  //     method: "post",
                  //     maxBodyLength: Infinity,
                  //     url: apiLocalPath + "/orders/addNew/",
                  //     headers: {
                  //       Authorization:
                  //         "Bearer " + sessionStorage.getItem("accessToken"),
                  //     },
                  //     data: data,
                  //   };

                  //   axios
                  //     .request(config)
                  //     .then((response) => {
                  //       console.log(response.data);
                  //       // console.log(response.data.data.orderItems.available.reduce((accumulator,current)=>{
                  //       //   return [...accumulator, current.fields]
                  //       // },[]));

                  //       // console.log(response.data.data);
                  //       setShowSnackbar(true);
                  //       console.log(response.data.data.orderItems.available);
                  //       setItems([
                  //         ...itemsArray,
                  //         ...response.data.data.orderItems.available.reduce(
                  //           (accumulator, current) => {
                  //             return [...accumulator, current.fields];
                  //           },
                  //           []
                  //         ),
                  //       ]);
                  //       if (
                  //         response.data.data.orderItems.unavailable.length !== 0
                  //       ) {
                  //         setUnAvailable([
                  //           ...response.data.data.orderItems.unavailable,
                  //         ]);
                  //         setOpenUnAvailableModal(true);
                  //       }

                  //       setUploadItemPhoto(null);
                  //     })
                  //     .catch((error) => {
                  //       console.log(error);
                  //     });
                  // } else {
                  handleStartCaptureClick();
                  UpdateCartApi(base64Image);
                  // }
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
              // sessionStorage.setItem("orderId", orderID);
              sessionStorage.setItem("itemsArray", JSON.stringify(itemsArray));
              navigate("/cart");
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
          <Box sx={addUnAvailableModalStyle}>
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
              title={
                <>
                  Sorry,{" "}
                  {unAvailable.length === 1 ? (
                    <>This item is not</>
                  ) : (
                    <>These items are not</>
                  )}{" "}
                  unavailable
                </>
              }
              extra={
                <>
                  <List
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "2rem",
                        textAlign: "center",
                        textTransform: "capitalize",
                        color: "orange",
                      },
                    }}
                  >
                    {unAvailable.map((currentValue, index) => {
                      return (
                        <ListItem key={index}>
                          {Object.entries(currentValue).map(([key, value]) => (
                            <ListItemText key={key}>{value}</ListItemText>
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
  // } else {
  //   return (
  //     <>
  //       <Modal open={!sessionStorage.getItem("accessToken")}>
  //         <Box
  //           style={{
  //             position: "absolute",
  //             top: "50%",
  //             left: "50%",
  //             transform: "translate(-50%, -50%)",
  //             backgroundColor: "#fff",
  //             padding: "2rem",
  //             height: "20rem",
  //           }}
  //         >
  //           <Typography variant="h2" gutterBottom>
  //             Please Login
  //           </Typography>
  //           <Typography variant="body1" color="textSecondary" fontSize="3rem">
  //             You need to log in to access this page.
  //           </Typography>
  //           <Button
  //             variant="contained"
  //             onClick={
  //               () => (window.location.href = "nhome")
  //               // <Navigate replace to="/nhome" />
  //             }
  //             style={{ marginTop: "1rem", fontSize: "1.8rem" }}
  //           >
  //             Go to home
  //           </Button>
  //         </Box>
  //       </Modal>

  //       {/* <Navigate replace to="/nhome" /> */}
  //     </>
  //   );
  // }
}

const addUnAvailableModalStyle = {
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
