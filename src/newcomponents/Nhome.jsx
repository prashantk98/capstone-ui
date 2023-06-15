import {
  Button,
  TextField,
  Box,
  Stack,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import logo from "../images/webLogo.png";
import newHomeBg from "../images/homeBgFull.svg";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import axios from "axios";
import { apiLocalPath } from "../rowData";
import Footer from "./Footer";
import { orange } from "@mui/material/colors";
function isMobileNumberValid(value) {
  value = value.trim();
  return value.length === 10;
}
function isUserNameValid(value) {
  return value.trim().length !== 0;
}
export let LoginToken = '';

export default function Nhome() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");
  const [numberHelperText, setNumberHelperText] = useState("");
  const [isUserNameFound, setIsUserNameFound] = useState(false);
  return (
    <>
      {/* <Container 
    sx={
      {
        '&':{
        backgroundColor: '#ececec',
        width: '50%',
        height: '60rem',
        marginTop: '10rem',
        padding: '4rem 0',
        borderRadius: '4px',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        // background: 'linear-gradient(#e66465, #9198e5)'
        // backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'

        },
      }
    }
    >
      <Box
            component="form"
            // action="/#"
            onSubmit={(e) => e.preventDefault}
            sx={{
              '&':{
                marginTop: '5.4rem',
              },
              "& .MuiTextField-root": {
                // m: 1,
                // width: '25ch',
                width: "50%",
                backgroundColor: "white",
                fontSize: "3rem",
                borderRadius: ".4rem",
                background: "#F5F3EF",
                // margin: '0 auto',
                display: 'block',
                margin: '2.4rem auto',
              },
              "& .MuiInputBase-root": {
                fontSize: "1.8rem",
                width: '100%'
              },
              "& label": {
                fontSize: "2rem",
                textAlign: "center",
              },
              // "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
              //   {
              //     color: "black",
              //   },
            }}
            noValidate
            // autoComplete="off"
          >
            <figure className="logo__nhome">
            <img src={logo} alt="website logo" />
            </figure>
            <Typography
            sx={{
              fontWeight: '800',
              margin: '0 auto',
              width: '50%',
              fontSize: '2.4rem',
              textTransform: 'capitalize',
              textAlign: 'center',
            }}
            >Hello welcome to Smart Cart</Typography>
            <Typography 
            sx={
              {
                margin: '0 auto',
                width: '40%',
                fontSize: '1.8rem',
                textTransform: 'capitalize',
                textAlign: 'center',
                color: '#6e6d7a'
              }
            }
            >
              Please Enter your mobile number and name for billing</Typography>
            <TextField
              type="number"
              label="Mobile Number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              // value={number}
              onWheel={(e) => e.target.blur()}
              onChange={(event) => {
                
              }}
              name="mobile"
              required
            />
            <TextField
              label="Name"
              variant="outlined"
              name="user-name"
            />
          </Box>
          <Stack direction='row' 
          sx={{
            '&':{
            justifyContent: 'center'
            },
            '& .MuiButtonBase-root':{
              margin: '0 3rem',
              fontSize: '1.6rem'
            }
          }}
          >
            <Button
            variant="contained" 
            color="error" 
            >
              Reset
            </Button>
            <Button variant="contained" 
            type="submit"
            href="/ncart"
            >
              Continue
            </Button>
          </Stack>
    </Container> */}
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
                  if (
                    /^[0-9]*$/.test(event.target.value) &&
                    !event.target.value.includes("e")
                  ) {
                    if (event.target.value.trim().length === 10) {
                      // console.log(event.target.value);
                      let data = JSON.stringify({
                        phoneNumber: event.target.value.trim(),
                      });

                      let config = {
                        method: "post",
                        maxBodyLength: Infinity,
                        url: apiLocalPath+'/auth/user/login',
                        headers: {
                          "Content-Type": "application/json",
                        },
                        data: data,
                      };

                      axios
                        .request(config)
                        .then((response) => {
                          setName(response.data.username);
                          setIsUserNameFound(true);
                          // LoginToken = 
                          sessionStorage.setItem('LoginToke', response.data.token);
                        })
                        .catch((error) => {
                          console.error('user not found')
                          console.log(error);
                        });
                    }
                    setNumber(event.target.value);
                    setNumberHelperText("");
                  } else {
                    setNumberHelperText("Enter digit 0-9");
                  }
                }}
                name="mobile"
                // error={!isMobileNumberValid(number)}
                // helperText= {isMobileNumberValid(number)?'': numberHelperText}
                helperText={numberHelperText}
                required
              />
              <TextField
                label="Name"
                required
                // variant="outlined"
                variant="standard"
                onWheel={(e) => e.target.blur()}
                value={name}
                onChange={(event) => {
                  if (/^[A-Za-z]*$/.test(event.target.value)) {
                    setName(event.target.value);
                    setNameHelperText("");
                    setIsUserNameFound(true);
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
                    justifyContent: "center",
                    marginTop: "5rem",
                  },
                  "& .MuiButtonBase-root": {
                    margin: "0 3rem",
                    fontSize: "1.6rem",
                  },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    '&': {
                      background: 'orange'
                    },
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#ff7300",
                    },
                  }}
                  onClick={() => {
                    setName("");
                    setNumber("");
                  }}
                >
                  <RestartAltIcon
                    sx={{
                      "&": {
                        fontSize: "4rem",
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
                    margin: "0 8rem",
                    "&:hover": {
                      backgroundColor: "var(--primary)",
                    },
                  }}
                  onClick={() => {
                    if (isMobileNumberValid(number)) {
                      if (!isUserNameFound &&!isUserNameValid(name)) {
                        setNameHelperText("Please Enter user Name");
                      } else {
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        var raw = JSON.stringify({
                          name: name,
                          phoneNumber: number,
                          created_by: "Omesh",
                        });

                        var requestOptions = {
                          method: "POST",
                          headers: myHeaders,
                          body: raw,
                          redirect: "follow",
                        };

                        fetch(
                          apiLocalPath+'/signup/user/',
                          requestOptions
                        )
                          .then((response) => response.text())
                          .then((result) =>{ 
                            console.log(result)
                          })
                          .catch((error) => console.log("error", error));

                        window.location.href = "/ncart"; 
                      }
                    }
                  }}
                >
                  Continue
                  <ArrowForwardIcon
                    sx={{
                      fontSize: "4rem",
                    }}
                  />
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
        <Box
          sx={{
            width: "60%",
          }}
        >
          <img src={newHomeBg} alt="new home Bg" width="100%" height="100%" />
        </Box>
      </Stack>
      <Footer></Footer>
    </>

  );
}

//I have to add header and footer
