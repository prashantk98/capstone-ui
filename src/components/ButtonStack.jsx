import React from "react";
import { Stack, Button, Snackbar, Modal, Box, IconButton } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import CloseIcon from "@mui/icons-material/Close";
import { Result } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLocalPath } from "../rowData";
import axios from "axios";

export default function ButtonStack(props) {
  // console.log(props.setItems)
  const navigate = useNavigate();
  const [openCheckoutSnackbar, setOpenCheckoutSnackbar] = useState(false);
  const [openSnapshotSnackbar, setOpenSnapshotSnackbar] = useState(false);
  const [openUnAvailableModal, setOpenUnAvailableModal] = useState(false);
  const [unAvailable, setUnAvailable] = useState([]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        props.setUploadItemPhoto(reader.result);
        props.setImage(reader.result);
        const base64String = reader.result;
        // console.log(base64String);
        const imageData = base64String.split(",")[1];
        props.setBase64Image(imageData);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  }
  const handleCaptureClick = () => {
    props.audioRef.current.play();
    const canvas = document.createElement("canvas");
    canvas.width = props.videoRef.current.videoWidth;
    canvas.height = props.videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(props.videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL();
    props.setImage(capturedImage);

    const imageData = capturedImage.split(",")[1];
    props.setBase64Image(imageData);
    // handleStopCaptureClick();
  };
  function UpdateCartApi(base64Image) {
    // console.log(props.itemsArray);
    let data = JSON.stringify({
      image: base64Image,
      existingOrderItems: props.itemsArray,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: apiLocalPath + "/orders/" + props.orderID,
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
        props.setShowSnackbar(true);
        props.setItems([...response.data.data.available]);
        sessionStorage.setItem(
          "itemsArray",
          JSON.stringify([...response.data.data.available])
        );
        if (response.data.data.unavailable.length !== 0) {
          setUnAvailable([...response.data.data.unavailable]);
          setOpenUnAvailableModal(true);
        }
        props.setUploadItemPhoto(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Stack
        direction="row"
        sx={{
          "&": {
            margin: "1.4rem 4rem",
            alignItems: "center",
            "@media screen and (max-width: 1024px)": {
              "& .MuiButton-root": {
                fontSize: "1rem",
                // width: 'unset'
              },
            },
            "@media screen and (max-width: 768px)": {
              "& .MuiButton-root": {
                width: 'unset'
              },
            },
            "@media screen and (max-width: 425px)": {
              "& .MuiButton-root": {
                fontSize: ".6rem",
                // width: 'unset'
              },
            },
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            "&": {
              gap: "1rem",
              width: "50%",
              justifyContent: "space-around",
              alignItems: "center",
              "@media screen and (max-width: 768px)": {
                flexGrow: '1.3'
              },
            },
            "& .MuiButton-root": {
              fontSize: "1.4rem",
            },
            "@media screen and (max-width: 1024px)": {
              "& .MuiButton-root": {
                fontSize: "1rem",
              },
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
              props.setItems([]);
              props.resetCartApi();
            }}
          >
            Reset
          </Button>
          <input
            type="file"
            id="upload-button"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="upload-button">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {props.image !== null ? (
            <Button
              variant="contained"
              color="success"
              onClick={props.handleStartCaptureClick}
            >
              {props.image ? "Restart camera" : "Start Camera"}
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
              if (props.image) {
                props.handleStartCaptureClick();
                UpdateCartApi(props.base64Image);
              } else {
                setOpenSnapshotSnackbar(true);
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
              // height: "4rem",
              fontSize: "1.4rem",
              position: "relative",
            },
          }}
          onClick={() => {
            if (props.itemsArray.length !== 0) {
              sessionStorage.setItem(
                "itemsArray",
                JSON.stringify(props.itemsArray)
              );
              navigate("/cart");
            } else {
              setOpenCheckoutSnackbar(true);
            }
          }}
        >
          Checkout
          <Snackbar
            open={openCheckoutSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenCheckoutSnackbar(false)}
            message={
              <>
                <InfoOutlined /> Add at least 1 item into cart
              </>
            }
            sx={{
              position: "relative",
              "& .MuiPaper-root ": {
                background: "orange",
                position: "absolute",
                top: "-4rem",
                left: "-25rem",
              },
              "& .MuiSnackbarContent-message": {
                fontSize: "1.2rem",
                padding: "0",
              },
              "& svg": {
                fontSize: "1.6rem",
                verticalAlign: "middle",
              },
            }}
          />
        </Button>
      </Stack>
      <Modal open={Boolean(openUnAvailableModal)}>
        <Box sx={addUnAvailableModalStyle}>
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
              <SentimentNeutralIcon
                sx={{ fontSize: "5rem", color: "#ff7416" }}
              />
            }
            title="This Photo is not valid."
            extra="It is important for the photo to have clear and valid."
          />
        </Box>
      </Modal>
    </>
  );
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
