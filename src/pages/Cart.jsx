import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Camera from "../components/Camera";
import AddItemManually from "../components/AddItemManually";
import ButtonStack from "../components/ButtonStack";
import { notification } from "antd";
import { addItemToCartApi, generateOrderIdApi, QuantityApi } from "../backendApis/NcartApis";
import { useContext } from "react";
import { AppStateContext } from "../App";


export default function Ncart() {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const { itemsArray, setItems } = useContext(AppStateContext);
  const [itemSelectedManuallyObj, setItemManuallyObj] = useState({
    productName: "",
  });
  const [orderID, setOrderId] = useState(() => {
    const sessionOrderId = sessionStorage.getItem("orderId");
    console.log(sessionOrderId)
    return sessionOrderId ? JSON.parse(sessionOrderId) : null;
  });
  // const [unAvailable, setUnAvailable] = useState([]);
  const [base64Image, setBase64Image] = useState(null);
  const [isGotData, setIsGotData] = useState(true);

  const addItemToCart = () => {
    if (itemSelectedManuallyObj.productName.trim() !== "") {
      addItemToCartApi(
        itemSelectedManuallyObj.productName,
        1,
        orderID,
        itemsArray,
        setItems
      );
    } else {
      notification.info({
        message: 'Please Select the Product',
        placement: 'bottomRight',
      });
    }
  };

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

  function handleIncrement(index) {
    QuantityApi(itemsArray, index, itemsArray[index].quantity + 1, setItems);
  }
  function handleDecrement(index) {
      if (itemsArray[index].quantity > 1){
        QuantityApi(itemsArray, index, itemsArray[index].quantity - 1, setItems);
      }
  }
  function changeQuantity(index, value) {
    // QuantityApi(index, +value);
    QuantityApi(itemsArray, index, value, setItems);
  }

  useEffect(() => {
    // const fetchOrderId= sessionStorage.getItem("orderId");
    if (!orderID) {
      generateOrderIdApi(setOrderId);
    }
    handleStartCaptureClick();
  }, [orderID]);
  // if (authenticated) {
  return (
    <>
      <section className="new-cart">
        <Navbar key={itemsArray} itemsArray={itemsArray} />
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
}
