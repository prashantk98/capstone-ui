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
  Modal,
  Box,
} from "@mui/material";

import { Result } from "antd";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import QrCodeIcon from "@mui/icons-material/QrCode";

import Gpay from "../images/google_pay.svg";
import phonePe from "../images/Phonepe.svg";
import paytm from "../images/paytmLogo.svg";
import visa from "../images/visa.svg";
import mastercard from "../images/mastercard.svg";
import rupay from "../images/rupay.svg";
import cash from "../images/cash.jpeg";
import coinCash from '../images/coinCash.png';
import coins from "../images/coins.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentApi } from "../backendApis/BillApis";

const creditCard = [
  { src: visa, alt: "visa card" },
  { src: mastercard, alt: "mastercard card" },
  { src: rupay, alt: "rupay card" },
];
const onlinePaymentMethod = [
  { src: Gpay, alt: "Google pay" },
  { src: phonePe, alt: "PhonePe" },
  { src: paytm, alt: "Payment pay" },
];
const cashPaymentMethod = [
  { src: cash, alt: "cash " },
  { src: coins, alt: "coin exchange" },
  { src: coinCash, alt: "coin Cash" },
];
const selectedAccordionStyle = {
  border: "2px solid #4BB543",
  background: "#F5F3EF",
  boxShadow: "1px 1px 7px green",
};
const PaymentAccordionStyle = {
  "& .MuiAccordionSummary-content": {
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .MuiTypography-root": {
    fontSize: "1.8rem",
  },
  "& .MuiImageList-root .MuiImageListItem-root .MuiImageListItem-img": {
    objectFit: "contain",
    width: "3.8rem",
  },
  "& .MuiButtonBase-root": {
    width: "100%",
    height: "3.6rem",
    fontSize: "1.4rem",
  },
};

// function paymentAPI(price) {
//   let data = JSON.stringify({
//     orderID: sessionStorage.getItem("orderId"),
//     amount: price,
//   });

//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: apiLocalPath + "/payments/addNew/",
//     headers: {
//       Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
//     },
//     data: data,
//   };

//   axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export default function PaymentAccordion() {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [itemsArray, setItems] = useState(
    !JSON.parse(sessionStorage.getItem("itemsArray"))
      ? []
      : JSON.parse(sessionStorage.getItem("itemsArray"))
  );
  // const [itemName, setItemName] = useState("");
  const [totalPrice, setTotalPrice] = useState(
    itemsArray.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    )
  );
  return (
    <>
      <Card
        sx={{
          // background: "none",
          boxShadow: "unset",
        }}
      >
        <CardContent sx={PaymentAccordionStyle}>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={
              expanded === "panel3"
                ? selectedAccordionStyle
                : { background: "#F5F3EF" }
            }
          >
            <AccordionSummary
              expandIcon={
                expanded === "panel3" ? (
                  <RadioButtonCheckedIcon color="success" />
                ) : (
                  <RadioButtonUncheckedIcon />
                )
              }
            >
              <Typography>Pay with Credit Card</Typography>
              <ImageList sx={{ width: 200 }} cols={3} gap={8}>
                {creditCard.map((item, index) => (
                  <ImageListItem
                    key={index}
                    sx={
                      {
                        // ".MuiImageListItem-img": {
                        //   objectFit: "contain",
                        //   // width: '4rem'
                        // },
                      }
                    }
                  >
                    <img src={item.src} alt={item.alt} />
                  </ImageListItem>
                ))}
              </ImageList>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontSize: "1.4rem" }}>
                Seamless and Secure Payments: Pay with Confidence Using Your
                Credit Card!
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  setOpenModal(true);
                  paymentApi((totalPrice - totalPrice * 0.1).toFixed(2));
                  sessionStorage.clear();
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
                ? selectedAccordionStyle
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
            >
              <Typography
                sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
              >
                Pay with UPI QR Code
              </Typography>
              <ImageList sx={{ width: 200 }} cols={3} gap={8}>
                {onlinePaymentMethod.map((item, index) => (
                  <ImageListItem key={index}>
                    <img src={item.src} alt={item.alt} />
                  </ImageListItem>
                ))}
              </ImageList>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontSize: "1.4rem" }}>
                Seamless and Secure Payments: Pay with Confidence Using Online
                Payments Method!
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  setOpenModal(true);
                  paymentApi((totalPrice - totalPrice * 0.1).toFixed(2));
                  sessionStorage.clear();
                }}
              >
                <QrCodeIcon />
                Show QR
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={
              expanded === "panel2"
                ? selectedAccordionStyle
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
            >
              <Typography
                sx={{ width: "50%", flexShrink: 0, fontSize: "1.8rem" }}
              >
                Cash Payment
              </Typography>
              <ImageList sx={{ width: 200 }} cols={3} gap={8}>
                {cashPaymentMethod.map((item, index) => (
                  <ImageListItem key={index} >
                    <img src={item.src} alt={item.alt} />
                    {/* <img src={coins} alt={'coins'} /> */}
                  </ImageListItem>
                ))}
              </ImageList>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontSize: "1.4rem" }}>
                Flexible and Traditional: Experience the Ease of Cash Payments!
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenModal(true);
                  paymentApi((totalPrice - totalPrice * 0.1).toFixed(2));
                  sessionStorage.clear();
                }}
              >
                Pay Now
              </Button>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
      <Modal open={openModal}>
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
            title={
              <>
                Paid ₹{(totalPrice - totalPrice * 0.1).toFixed(2)} Successfully{" "}
              </>
            }
            subTitle={
              <>
                Thank You {sessionStorage.getItem("userName")} for Shopping!
                Visit again
              </>
            }
            extra={[
              <Button variant="contained" key="print Bill">
                Print Bill
              </Button>,
              <Button
                variant="contained"
                key="Home"
                onClick={() => navigate("/")}
                color="success"
              >
                Home
              </Button>,
            ]}
          />
        </Box>
      </Modal>
    </>
  );
}
