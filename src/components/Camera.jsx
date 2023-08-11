import React from "react";
import { Box } from "@mui/material";

export default function Camera(prop) {
  return (
    <>
      <Box
        width={"48%"}
        sx={{
          "@media screen and (max-width: 1024px)": {
            width: "90%",
          },
          "@media screen and (max-width: 768px)": {
            width: "100%",
          },
        }}
      >
        {!prop.image ? (
          <div className="home__camera-screen">
            <video ref={prop.videoRef} autoPlay></video>
          </div>
        ) : (
          <figure className="home__clicked-image">
            <img
              src={prop.image}
              alt="click on take snapshot"
              style={{
                animation: "pulse .2s 1",
              }}
            />
          </figure>
        )}
        <audio ref={prop.audioRef} src={require("../shutter.wav")} />
      </Box>
    </>
  );
}
