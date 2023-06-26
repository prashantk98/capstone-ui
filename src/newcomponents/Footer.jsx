import { Link, Box, Grid, Typography, TextField } from "@mui/material";
// import { Button } from "antd";
import { NavLink } from "react-router-dom";
import logo from "../images/webLogo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MessageIcon from "@mui/icons-material/Message";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
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
                color: 'black',
                fontWeight: '600'
              },
              "& .MuiTypography-root": {
                fontSize: "1.2rem",
                textAlign: "left",
                fontWeight: 300,
                lineHeight: '2.4rem',
                wordSpacing: '.2rem',
                // color: 'rgba(0, 0, 0, 0.6)'
              },
            }}
          >
            <NavLink to="/#" className="footer__logo">
              <img src={logo} alt="website logo" />
              Smart Cart
            </NavLink>
            <Typography>
              Experience seamless and efficient shopping with our smart checkout
              technology, eliminating queues and enhancing convenience for a
              faster and smoother transaction process.
            </Typography>
            <Link href="/#" textAlign="left">
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
                textAlign: "left",
              },
              '& a':{
                fontSize: '1.6rem'
              }
            }}
          >
            <Typography fontSize="1.8rem" fontWeight='600' >Useful Links</Typography>
            <Link href="/#">Home</Link>
            <Link href="/#">About</Link>
            <Link href="/#">Support</Link>
            <Link href="/#">Products</Link>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".8rem",
              "& p": {
                textAlign: "left",
                fontSize: '1.4rem',
                color: 'rgba(0, 0, 0, 0.6)'
              },
              '& a':{
                fontSize: '1.4rem',
              },
              '& svg':{
                fontSize: '2rem'
              },
              '& .MuiTypography-root':{
                fontSize:"1.8rem",
                 fontWeight:'600',
                 color: 'black'
              },
            }}
          >
            <Typography>Contect Us</Typography>
            <p>
              <LocationOnIcon sx={{verticalAlign: 'top',}}/> <span style ={{display: 'inline-block',maxWidth: '20rem'}}> 5th Floor, Silpa Gram Craft Village, HITEC City, Hyderabad, Telangana 500081 </span></p>
            <p><LocalPhoneIcon sx={{verticalAlign: 'top',}}/>  +1 (650) 523-5000</p>
            <p><EmailIcon sx={{verticalAlign: 'top',}}/>  info.india@griddynamics.com</p>
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
                <Link href="/#">
                <FacebookIcon />
                </Link>
              </Grid>
              <Grid item>
                <Link href="/#">
                <InstagramIcon/>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/#">
                <TwitterIcon/>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/#">
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
