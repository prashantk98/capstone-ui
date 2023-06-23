import { Link, Box, Grid, Typography, TextField } from "@mui/material";
// import { Button } from "antd";
import { NavLink } from "react-router-dom";
import logo from "../images/webLogo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MessageIcon from "@mui/icons-material/Message";
import Button from '@mui/material/Button';

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          textAlign: "center",
          fontSize: "1.8rem",
          padding: "4rem",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            "&": {
              alignItems: "top",
              fontSize: "2rem",
              justifyContent: "space-between",
              // padding: '.8rem'
            },
            "& .MuiGrid-item": {
              padding: "0",
            },
          }}
        >
          <Grid
            item
            sx={{
              "&": {
                display: "flex",
                flexDirection: "column",
                gap: ".8rem",
                width: "20%",
              },
              "& .footer__logo img": {
                width: "3rem",
                verticalAlign: "middle",
              },
              "& .footer__logo": {
                padding: ".8rem",
                textAlign: "left",
              },
              "& .MuiTypography-root": {
                fontSize: "1.2rem",
                textAlign: "left",
                fontWeight: 300,
                lineHeight: '2.4rem',
                wordSpacing: '.2rem'
              },
            }}
          >
            <NavLink to="/" className="footer__logo">
              <img src={logo} alt="website logo" />
              Smart Cart
            </NavLink>
            <Typography>
              Experience seamless and efficient shopping with our smart checkout
              technology, eliminating queues and enhancing convenience for a
              faster and smoother transaction process.
            </Typography>
            <Link href="/nhome" textAlign="left">
              Privacy Policy
            </Link>
          </Grid>
          {/* <Grid item sm></Grid> */}

          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".8rem",
              "& .MuiTypography-root": {
                // textAlign: "left",
              },
              '& a':{
                fontSize: '1.8rem'
              }
            }}
          >
            <Typography fontSize="1.6rem" >Useful Links</Typography>
            <Link to="/home">Home</Link>
            <Link href="/nhome">About</Link>
            <Link to="/nhome">Support</Link>
            <Link to="/nhome">Products</Link>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              width: "20%",
              '& button':{
                fontSize: '1.2rem'
              }
            }}
          >
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              sx={{
                // backgroundColor: "white",
                fontSize: "1.8rem",
                "& .MuiFilledInput-root": {
                  backgroundColor: "white",
                  fontSize: '1.4rem'
                },
                '& label':{
                  fontSize: '1.4rem'
                }
              }}
            />

            <Button variant="contained" 
            sx={{
              width: '40%',
              backgroundColor: '#6b6d6c'
            }}
            >Subscribe</Button>
            <Grid
              container
              spacing={2}
              justifyContent="space-evenly"
              sx={{
                "& svg": {
                  fontSize: "2rem",
                },
                
              }}
            >
              <Grid item
              >
                <Link href="/nhome">
                <FacebookIcon />
                </Link>
              </Grid>
              <Grid item>
                <Link href="/nhome">
                <InstagramIcon/>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/nhome">
                <TwitterIcon/>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/nhome">
                <MessageIcon />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography
          sx={{
            fontSize: "1.6rem",
            color: "#404646",
            marginTop: "3rem",
          }}
        >
          © 2023 Copyright: All rights reserved
        </Typography>
      </Box>
    </>
  );
}
