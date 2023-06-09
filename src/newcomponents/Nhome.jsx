import { Button,TextField,Box,Stack, Typography } from "@mui/material";
import logo from '../images/webLogo.png';
import newHomeBg from '../images/newHomeBg.svg';
export default function Nhome(){
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
    <Stack direction='row'
    sx={
      {
        '&':{
          height: '102.4rem'
        },
        '& .css-0':{
          width: '50%'
        }
      }
    }
    >
      <Box>
      <div className="logo__nhome">
            <img src={logo} alt="website logo" />
            <Typography
            sx={{
              fontSize: '3rem'
            }}
            >Smart Cart</Typography>
            </div>
      <Box
            component="form"
            // action="/#"
            onSubmit={(e) => e.preventDefault}
            sx={{
              '&':{
                // marginTop: '10rem',
                // width: '100%'
                paddingTop: '10rem'
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
              
            }}
            noValidate
          >
            
            <Typography
            sx={{
              fontWeight: '800',
              margin: '0 auto',
              // width: '100%',
              fontSize: '4.4rem',
              textTransform: 'capitalize',
              textAlign: 'center',
            }}
            >welcome to Smart Cart</Typography>
            <Typography 
            sx={
              {
                margin: '0 auto',
                // width: '100%',/
                fontSize: '2.4rem',
                textTransform: 'capitalize',
                textAlign: 'center',
                color: '#6e6d7a'
              }
            }
            >
              Please Enter your Details</Typography>
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
          </Box>
          

      </Box>
      <Box>
        <img src={newHomeBg} alt="new home Bg" width='100%' height='100%' /></Box>
    </Stack>
    </>
  );
}