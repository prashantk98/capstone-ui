import { useRef, useState } from "react";
import Navbar from "./Navbar";
import { Button, Stack, TextField } from "@mui/material";

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
        <div className="home__details">
          <p className="home__address">
            <span>Setproduct Inc.,</span>
            Arbat street, 1-15, 121165, Moscow, Russian Federation +7 (926)
            721-4127
          </p>
          <h3 className="home__line">
            Welcome to smart cart, centre for Shopping lover
          </h3>
          <form
            action="/#"
            className="home__form"
            onSubmit={(event) => event.preventDefault}
          >
            {/* <TextField
          type='number'
          error={!isMobile(value)}
          // id="outlined-password-input"
          label="Enter Mobile number"
          value={value}
          onChange= {(e)=>{
            setValue(e.target.value);
          }}
          helperText={isMobile(value) ? 'Valid': 'Enter valid mobile number'}
          sx={{width:'60%', background: '#14a8fd',fontSize:'30px',border:'none', borderRadius:'32px'}}
          required
        /> */}
            <TextField
              type="number"
              label="Mobile Number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0} }}
              sx={{
                "&": {
                  backgroundColor: "white",
                  width: "80%",
                  fontSize: "3rem",
                  borderRadius: ".4rem",
                  margin: '1.8rem 0px'
                },
                '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':{
                  color: 'black'
                },
                "& label": {
                  fontSize: "2rem",
                  textAlign: "center",
                  // color: 'black'
                },
                "& .MuiInputBase-root": {
                  fontSize: "1.8rem",
                }
              }}

              value={number}
              onChange={(event) => setNumber(event.target.value)}
              name="mobile"
            />
            <TextField
              label="Name"
              variant="outlined"
              sx={{
                "&": {
                  backgroundColor: "white",
                  width: "80%",
                  fontSize: "3rem",
                  borderRadius: ".4rem",
                  margin: '1.8rem 0px 7.4rem'
                },
                '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':{
                  color: 'black'
                },
                "& label": {
                  fontSize: "2rem",
                  textAlign: "center",
                  // color: 'black'
                },
                "& .MuiInputBase-root": {
                  fontSize: "1.8rem",
                },
              }}
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="user-name"
            />
            <Stack direction="row" spacing={5}>
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
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ fontSize: "1.6rem" }}
                onClick={() => {
                  console.log("continue button");
                }}
              >
                Continue
              </Button>
            </Stack>
          </form>
        </div>
        <div className="home__camera">
          <h1>Camera Capture Example</h1>
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
          <Stack direction="row" spacing={5}>
            <Button
              variant="contained"
              color="success"
              sx={{ fontSize: "1.6rem" }}
              onClick={handleStartCaptureClick}
            >{image?"Restart camera":'Start Camera'}
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
          </Stack>
        </div>
        {/* <div className="home__buttons">

        </div> */}
        
      </section>
      <Stack direction="row" spacing={5}>
            <Button
              variant="contained"
              color="success"
              sx={{ fontSize: "1.6rem" }}
              onClick={handleStartCaptureClick}
            >{image?"Restart camera":'Start Camera'}
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
            </Stack>
    </>
  );
}
