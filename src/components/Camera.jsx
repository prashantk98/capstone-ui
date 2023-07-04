import React from 'react';
import { Box,Snackbar, } from '@mui/material';
// import InfoOutlined from "@mui/icons-material/InfoOutlined";


export default function Camera(prop) {
  return (
    <>
    <Box width={'48%'}
    sx={{
      "@media screen and (max-width: 1024px)": {
        width: '90%'
  }, 
  "@media screen and (max-width: 768px)": {
    width: '100%'
},
    }}
    >
            {/* <Snackbar
              open={showSnackbar}
              autoHideDuration={1000}
              onClose={() => setShowSnackbar(false)}
              message="Item added to cart"
              sx={{
                "& .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": {
                  fontSize: "1.4rem",
                },
              }}
            /> */}
            {/* <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openSnapshotSnackbar}
              autoHideDuration={4000}
              onClose={() => setOpenSnapshotSnackbar(false)}
              message={
                <>
                  <InfoOutlined /> Upload image or take snapshot for add to cart
                </>
              }
              sx={{
                "& .MuiPaper-root ": {
                  background: "orange",
                },
                "& .MuiSnackbarContent-message": {
                  fontSize: "1.6rem",
                  padding: "0",
                },
                "& svg": {
                  fontSize: "1.6rem",
                  verticalAlign: "middle",
                },
              }}
            /> */}
            

            {!prop.image ? (
              <div className="home__camera-screen">
                <video
                  ref={prop.videoRef}
                  autoPlay
                ></video>
              </div>
            ) : (
              <figure className="home__clicked-image">
                <img
                  src={prop.image}
                  alt="click on take snapshot"
                  style={{
                    animation: "pulse .2s 1",
                    // border: "2px solid salmon",
                  }}
                />
              </figure>
            )}
            <audio ref={prop.audioRef} src={require("../shutter.wav")} />
          </Box>
    </>
  )
}
