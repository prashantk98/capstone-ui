import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import CartItem from "../components/CartItem";
import { apiLocalPath } from "../rowData";
import Footer from "../components/Footer";
import axios from "axios";
// import { Result } from "antd";
import Navbar from "../components/Navbar";
import Camera from "../components/Camera";
import AddItemManually from "../components/AddItemManually";
import ButtonStack from "../components/ButtonStack";
import { notification } from "antd";
import { addItemToCartApi, QuantityApi } from "../backendApis/NcartApis";

// let totalItemsGlobal;
// let itemsArrayGlobal;
export let itemsArrayGlobal = [];

export default function Ncart() {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [itemsArray, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem("itemsArray");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  // const [uploadItemPhoto, setUploadItemPhoto] = useState(null);
  // const [openUnAvailableModal, setOpenUnAvailableModal] = useState(false);
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
  // const [unAvailable, setUnAvailable] = useState([]);
  const [base64Image, setBase64Image] = useState(null);
  // const [openSnapshotSnackbar, setOpenSnapshotSnackbar] = useState(false);
  const [openAddItemToCartSnackbar, setOpenAddItemToCartSnackbar] =
    useState(false);
  const [isGotData, setIsGotData] = useState(true);

  // function resetCartApi() {
  //   console.log(orderID);
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: apiLocalPath + "/orders/orderItems/" + orderID,
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  //     },
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.code) {
  //         notification.error({
  //           message: error.name,
  //           description: error.message,
  //           placement: 'bottomRight',
  //         });
  //         return error;
  //       }

  //     });
  // }

  // function addItemToCartApi(productName, quantity) {
  //   let data = JSON.stringify({
  //     newOrderItem: {
  //       name: productName,
  //       quantity: quantity,
  //     },
  //   });

  //   let config = {
  //     method: "put",
  //     maxBodyLength: Infinity,
  //     url: apiLocalPath + "/orders/" + orderID,
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(response.data);
  //       let indexOfItem = -1;
  //       for (let index = 0; index < itemsArray.length; index++) {
  //         console.log(itemsArray[index].productID, productName);
  //         if (itemsArray[index].productID === productName) {
  //           indexOfItem = index;
  //         }
  //       }
  //       if (indexOfItem !== -1) {
  //         // console.log('This is called')
  //         QuantityApi(indexOfItem, itemsArray[indexOfItem].quantity + 1);
  //         // QuantityApi(itemsArray,indexOfItem,itemsArray[indexOfItem].quantity+1, setItems);
  //       } else {
  //         sessionStorage.setItem(
  //           "itemsArray",
  //           JSON.stringify([...itemsArray, response.data.data.available])
  //         );
  //         setItems((prev) => [...prev, response.data.data.available]);
  //       }
  //       // setItemManuallyObj({
  //       //   productName: "",
  //       // });
  //       // setShowSnackbar(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.code) {
  //         notification.error({
  //           message: error.name,
  //           description: error.message,
  //           placement: 'bottomRight',
  //         });
  //       }
  //       return error;
  //     });
  // }

  const addItemToCart = () => {
    if (itemSelectedManuallyObj.productName.trim() !== "") {
      // addItemToCartApi(itemSelectedManuallyObj.productName, 1);
      addItemToCartApi(
        itemSelectedManuallyObj.productName,
        1,
        orderID,
        itemsArray,
        setItems
      );
    } else {
      setOpenAddItemToCartSnackbar(true);
    }
  };
  // const removeItemFromCart = (index) => {
  //   let data = "";

  //   let config = {
  //     method: "delete",
  //     maxBodyLength: Infinity,
  //     url:
  //       apiLocalPath +
  //       "/orders/" +
  //       itemsArray[index].orderID +
  //       "/" +
  //       itemsArray[index].orderItemID,
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(response.data);
  //       sessionStorage.setItem(
  //         "itemsArray",
  //         JSON.stringify(
  //           itemsArray.filter((currentValue, idx) => {
  //             return idx !== index;
  //           })
  //         )
  //       );
  //       setItems((prevState) => {
  //         return prevState.filter((currentValue, idx) => {
  //           return idx !== index;
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleStartCaptureClick = async () => {
    try {
      setImage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.style.transform = "scaleX(-1)";
      videoRef.current.style.width = "100%";
      videoRef.current.style.height = "100%";
    } catch (error) {
      console.error(error);
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
          placement: "bottomRight",
        });
      }
      return error;
    }
  };

  // function QuantityApi(index, quantity) {
  //   console.log(itemsArray[index]);
  //   let data = JSON.stringify({
  //     productID: itemsArray[index].productID,
  //     quantity: quantity,
  //   });

  //   let config = {
  //     method: "put",
  //     maxBodyLength: Infinity,
  //     url:
  //       apiLocalPath +
  //       "/orders/" +
  //       itemsArray[index].orderID +
  //       "/" +
  //       itemsArray[index].orderItemID,
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       // console.log(response.data.data);
  //       const newItemsArray=itemsArray.slice();
  //       newItemsArray.filter((current, idx) => {
  //         if (idx === index) {
  //           Object.assign(current, response.data.data);
  //         }
  //         return true;
  //       })
  //       setItems(() => newItemsArray);
  //       console.log(newItemsArray);
  //       // setItems((prevState) => {
  //       //   return [...prevState.filter((current, idx) => {
  //       //     if (idx === index) {
  //       //       Object.assign(current, response.data.data);
  //       //     }
  //       //     return true;
  //       //   })];
  //       // });
  //       sessionStorage.setItem("itemsArray", JSON.stringify(newItemsArray));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.code) {
  //         notification.error({
  //           message: error.name,
  //           description: error.message,
  //           placement: 'bottomRight',
  //         });
  //       }
  //       return error;
  //     });
  // }

  function handleIncrement(index) {
    // QuantityApi(index, +itemsArray[index].quantity + 1);
    QuantityApi(itemsArray, index, itemsArray[index].quantity + 1, setItems);
  }
  function handleDecrement(index) {
    if (itemsArray[index].quantity > 1)
      if (itemsArray[index].quantity > 1)
        // QuantityApi(index, +itemsArray[index].quantity - 1);
        QuantityApi(
          itemsArray,
          index,
          itemsArray[index].quantity - 1,
          setItems
        );
  }
  function changeQuantity(index, value) {
    // QuantityApi(index, +value);
    QuantityApi(itemsArray, index, value, setItems);
  }
  function generateOrderId() {
    let data = "";
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
        sessionStorage.setItem("orderId", response.data.data.order.pk);
        // sessionStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("orderId") === null) {
      generateOrderId();
    }
    handleStartCaptureClick();
  }, []);
  // if (authenticated) {
  return (
    <>
      <section className="new-cart">
        <Navbar key={itemsArray} />
        <Stack
          direction="row"
          sx={{
            padding: "8rem 4rem 0rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
            "@media screen and (max-width: 1024px)": {
              flexDirection: "column",
              gap: "2rem",
              alignItems: 'center'
            },
            "@media screen and (max-width: 768px)": {
              flexDirection: "column",
              gap: "2rem",
            },
          }}
        >
          <Camera
            image={image}
            videoRef={videoRef}
            audioRef={audioRef}
            setBase64Image={setBase64Image}
            setImage={setImage}
          />
          <Box
            sx={{
              "&": {
                width: "50%",
                borderRadius: ".5rem",
                // height: "50.6rem",
                "@media screen and (max-width: 1024px)": {
                  width: "90%",
                },
                "@media screen and (max-width: 768px)": {
                  width: "100%",
                },
              },
            }}
          >
            <AddItemManually
              setItemManuallyObj={setItemManuallyObj}
              addItemToCart={addItemToCart}
            />

            <Box
              sx={{
                height: "37.3rem",
                // height: '70%',
                overflowY: "scroll",
                textAlign: "center",
              }}
            >
              {!isGotData && <CircularProgress />}
              {itemsArray.map((currentValue, index) => {
                return (
                  <CartItem
                    index={index}
                    item={currentValue}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    key={index}
                    changeQuantity={changeQuantity}
                    itemsArray={itemsArray}
                    setItems={setItems}
                  />
                );
              })}
            </Box>
          </Box>
        </Stack>
        <ButtonStack
          image={image}
          setImage={setImage}
          setBase64Image={setBase64Image}
          itemsArray={itemsArray}
          videoRef={videoRef}
          audioRef={audioRef}
          setItems={setItems}
          handleStartCaptureClick={handleStartCaptureClick}
          base64Image={base64Image}
          orderID={orderID}
          isGotData={isGotData}
          setIsGotData={setIsGotData}
        />
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
