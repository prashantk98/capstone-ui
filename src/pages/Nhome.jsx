import {
  Button,
  TextField,
  Box,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import logo from "../images/webLogo.png";
import newHomeBg from "../images/homeBgFull.svg";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { newUserApi, userPresentApi } from "../backendApis/NhomeApis";

function isMobileNumberValid(value) {
  value = value.trim();
  return value.length === 10;
}
function isUserNameValid(value) {
  return value.trim().length !== 0;
}

export default function Nhome() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(() => {
    const storedNumber = sessionStorage.getItem("userMobile");
    return storedNumber ? storedNumber : "";
  });
  const [name, setName] = useState(() => {
    const storedName = sessionStorage.getItem("userName");
    return storedName ? storedName : "";
  });
  const [nameHelperText, setNameHelperText] = useState("");
  const [numberHelperText, setNumberHelperText] = useState("");
  const [isUserNameFound, setIsUserNameFound] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [itemsArray, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem("itemsArray");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  function handleSubmit() {
    if (isMobileNumberValid(number)) {
      if (!isUserNameValid(name)) {
        setNameHelperText("Please Enter user Name");
      } else if (!isUserNameFound) {
        newUserApi(name, number,setAccessToken);
        navigate("/ncart");
      } else {
        sessionStorage.setItem("userName", name);
        sessionStorage.setItem("userMobile", number);
        sessionStorage.setItem("accessToken", accessToken);
        navigate("/ncart");
      }
    } else {
      setNumberHelperText('Enter both mobile number and name');
    }
  }
  return (
    <>
      <Navbar key={itemsArray} />
      <Stack
        direction="row"
        sx={{
          "&": {
            height: "102.4rem",
          },
        }}
      >
        <Box
          sx={{
            width: "40%",
            "@media screen and (max-width: 1024px) and (min-width: 768px)": {
              width: '60%',
          },
            "@media screen and (max-width: 768px) and (min-width: 0)": {
                width: '100%',
                background: `url(${newHomeBg})`,
                backgroundSize: 'cover'
            },
            "@media screen and (max-width: 425px)": {
              '& .logo__nhome':{
                paddingTop: '8.6rem'
              },'& .logo__nhome img':{
                width: '3.6rem'
              },
              '& .logo__nhome p':{
                fontSize: '2.4rem'
              },
              '& .MuiPaper-root':{
                width: '90%'
              }
        },
            
          }}
        >
          <div className="logo__nhome">
            <img src={logo} alt="website logo" />
            <Typography
              sx={{
                fontSize: "3rem",
              }}
            >
              Smart Cart
            </Typography>
          </div>
          <Box
            component="form"
            // action="/#"
            onSubmit={(e) => {
              e.preventDefault();
              if (!isMobileNumberValid(number)) {
                setNumberHelperText("Enter 10 digit mobile number");
              }
            }}
            sx={{
              "&": {
                paddingTop: "5rem",
              },
              "& .MuiTextField-root": {
                width: "80%",
                backgroundColor: "white",
                fontSize: "3rem",
                borderRadius: ".4rem",
                margin: "2.4rem auto",
                display: "block",
              },
              "& .MuiInputBase-root": {
                fontSize: "1.8rem",
                width: "100%",
              },
              "& label": {
                fontSize: "2rem",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "1.4rem",
              },
            }}
            noValidate
          >
            <Typography
              sx={{
                fontWeight: "800",
                margin: "0 4.8rem 6rem",
                fontSize: "4.4rem",
                textTransform: "capitalize",
                "@media screen and (max-width: 425px)": {
                    fontSize: '3.2rem',
                    textAlign: 'center'
              },
              }}
            >
              welcome to Smart Cart
            </Typography>

            <Paper
              elevation={1}
              sx={{
                width: "70%",
                margin: "0 auto",
                height: "35rem",
                paddingTop: "4rem",
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 1px 4px 0px rgba(0,0,0,0.14), 0px 1px 1px 0px rgba(0,0,0,0.12)",
              }}
            >
              <Typography
                sx={{
                  margin: "0 auto",
                  // width: '40%',
                  fontSize: "1.8rem",
                  textTransform: "capitalize",
                  textAlign: "center",
                  color: "#6e6d7a",
                }}
              >
                Enter details
              </Typography>

              <TextField
                // type="number"
                label="Mobile Number"
                variant="standard"
                InputProps={{ inputProps: { min: 0 } }}
                value={number}
                onWheel={(e) => e.target.blur()}
                onChange={(event) => {
                  sessionStorage.clear();
                  if (
                    /^[0-9]*$/.test(event.target.value) &&
                    !event.target.value.includes("e")
                  ) {
                    if (event.target.value.trim().length === 10) {
                      // console.log(event.target.value);
                      userPresentApi(event.target.value.trim(), setIsUserNameFound, setAccessToken, setName, setNumber);
                    }
                    setNumber(event.target.value);
                    setNumberHelperText("");
                  } else {
                    setNumberHelperText("Enter digit 0-9");
                  }
                }}
                name="mobile"
                error={numberHelperText!==''}
                helperText={numberHelperText}
                required
              />
              <TextField
                label="Name"
                required
                variant="standard"
                onWheel={(e) => e.target.blur()}
                value={name}
                onChange={(event) => {
                  sessionStorage.clear();
                  if (/^[A-Za-z]*$/.test(event.target.value)) {
                    setName(event.target.value);
                    setNameHelperText("");
                    // setIsUserNameFound(true);
                  } else {
                    setNameHelperText("Name contain a-z/A-Z only");
                  }
                }}
                helperText={nameHelperText}
                name="user-name"
              />
              <Stack
                direction="row"
                sx={{
                  "&": {
                    justifyContent: "space-evenly",
                    marginTop: "5rem",
                  },
                  "& .MuiButtonBase-root": {
                    // margin: "0 3rem",
                    fontSize: "1.6rem",
                  },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    "&": {
                      background: "orange",
                    },
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#ff7300",
                    },
                  }}
                  onClick={() => {
                    setAccessToken("");
                    setName("");
                    setNumber("");
                    sessionStorage.clear();
                    setItems([]);
                  }}
                >
                  <RestartAltIcon
                    sx={{
                      "&": {
                        fontSize: "2rem",
                      },
                    }}
                  />
                  Reset
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  // href="/ncart"
                  sx={{
                    // margin: "0 8rem",
                    "&:hover": {
                      backgroundColor: "var(--primary)",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Continue
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
        <Box
          sx={{
            width: "60%",
            background: `url(${newHomeBg})`,
            backgroundSize: 'cover',
            "@media screen and (max-width: 1024px) and (min-width: 768px)": {
              width: '40%',
              // background: `url(${newHomeBg})`,
              // backgroundSize: 'cover'
          },
            '@media screen and (max-width: 768px)': {
              display: 'none'
          },
          }}
        >
          {/* <img src={newHomeBg} alt="new home Bg" width="100%" height="100%" /> */}
        </Box>
      </Stack>
      <Footer></Footer>
    </>
  );
}

//I have to add header and footer
