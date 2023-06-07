import { useRef, useState } from "react";
import Navbar from "./Navbar";
import { Button, Stack, TextField, Box } from "@mui/material";
import axios from 'axios';

// function isMobile(value){
//   value = value.trim();
//   if(value.length===10){
//     return true;
//   }
//   return false;
// }

export default function Home() {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const handleStartCaptureClick = async () => {
    try {
      setImage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(err);
    }
  };
  const handleStopCaptureClick = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
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

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  // const [value, setValue] = useState('');
  return (
    <>
      <Navbar />
      <section className="home">
        <h3 className="home__line">Welcome to smart cart</h3>
        <div className="home__details">
          {/* <form
            action="/#"
            className="home__form"
            onSubmit={(event) => event.preventDefault}
          > */}
          <Box
            component="form"
            // action="/#"
            onSubmit={(e) => e.preventDefault}
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                // width: '25ch',
                width: "48%",
                backgroundColor: "white",
                fontSize: "3rem",
                borderRadius: ".4rem",
                background: "#F5F3EF",
              },
              "& .MuiInputBase-root": {
                fontSize: "1.8rem",
              },
              "& label": {
                fontSize: "2rem",
                textAlign: "center",
              },
              "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                {
                  color: "black",
                },
            }}
            noValidate
            // autoComplete="off"
          >
            <TextField
              type="number"
              label="Mobile Number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              value={number}
              onWheel={(e) => e.target.blur()}
              onChange={(event) => {
                setNumber(event.target.value);
                if (event.target.value.trim().length === 10) {
                  console.log(event.target.value);
                  handleStartCaptureClick();
                  // const axios = require("axios");
                  let data = JSON.stringify({
                    phoneNumber: "9765432810",
                    // phoneNumber: event.target.value.trim(),
                  });

                  let config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: "https://ad8bf3e1bf1d4c.lhr.life/auth/loginUser",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    data: data,
                  };

                  axios
                    .request(config)
                    .then((response) => {
                      // console.log(JSON.stringify(response.data));
                      setName(response.data.username)
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
              // error={!isMobile(value)}
              // helperText={isMobile(value) ? 'Valid': 'Enter valid mobile number'}
              name="mobile"
              required
            />
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="user-name"
            />
            <Stack
              direction="row"
              spacing={5}
              sx={{
                m: "2rem 0 0",
                width: "100%",
                padding: "1rem 0 0 1rem",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="contained"
                color="error"
                type="reset"
                sx={{ fontSize: "1.6rem" }}
                onClick={() => {
                  setNumber("");
                  setName("");
                }}
              >
                Reset
              </Button>
              {/* <Button
                variant="contained"
                color="success"
                sx={{ fontSize: "1.6rem" }}
                onClick={handleStartCaptureClick}
              >
                {image ? "Restart camera" : "Start Camera"}
              </Button> */}
              <Button
                variant="contained"
                sx={{ fontSize: "1.6rem" }}
                onClick={() => {
                  handleCaptureClick();
                }}
              >
                Take snapshot
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ fontSize: "1.6rem" }}
                href="/cart"
              >
                Go to cart
              </Button>
            </Stack>
            {/* </form> */}
          </Box>
        </div>
        <div className="home__camera">
          {!image ? (
            <div className="home__camera-screen">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                width={"100%"}
                height={"100%"}
              ></video>
            </div>
          ) : (
            <figure height={400} className="home__clicked-image">
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
          {/* <Stack direction="row" spacing={5}>
            <Button
              variant="contained"
              color="success"
              sx={{ fontSize: "1.6rem" }}
              onClick={handleStartCaptureClick}
            >
              {image ? "Restart camera" : "Start Camera"}
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: "1.6rem" }}
              onClick={() => {
                handleCaptureClick();
              }}
            >
              Take snapshot
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ fontSize: "1.6rem" }}
              href="/cart"
            >
              Go to cart
            </Button>
          </Stack> */}
        </div>
        {/* <div className="home__buttons">

        </div> */}
      </section>
    </>
  );
}
