import {
  Modal,
  Box,
  Avatar,
  Typography,
  Paper,
  FormControl,
  TextField,
  Link,
  Button,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cartBg from "../images/homeBgFull.svg";
import { apiLocalPath } from "../rowData";

const addLoginModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
  gap: "1.8rem",
  margin: "0 auto",
  alignItems: "center",
  // backgroundColor: "#eee",
  "& .MuiTypography-root": {
    fontSize: "2rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  "& .admin__login": {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    "& .MuiFormControl-root": {
      width: "100%",
      m: "0rem auto",
      gap: "1.6rem",
      "& .MuiFormControl-root": {
        width: "80%",
      },
      "& input": {
        display: "inline-block",
        width: "100%",
        fontSize: "2rem",
        background: "#eee",
        padding: '1rem'
      },
      "& .MuiFormHelperText-root": {
        fontSize: "1.6rem",
      },
    },
    "& .MuiButton-root": {
      margin: "1rem 0",
      width: "100%",
      fontSize: "1.6rem",
    },
    "& button[type='reset']": {
      background: "orange",
    },
  },
};



export default function AdminLogin() {
  const navigate = useNavigate();
  const [openLoginAdminModal, setOpenLoginAdminModal] = useState(true);
  const [authentication, setAuthentication]= useState(false);
  const [adminDetails, setAdminDetails] = useState({
    adminUserName: "",
    adminPassword: "",
  });
  const [passwordHelperText, setPasswordHelperText] = useState("");

  function loginUser(adminDetails) {
    let data = JSON.stringify({
      "password": adminDetails.adminPassword,
      "username": adminDetails.adminUserName
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: apiLocalPath+'/auth/admin/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      // console.log(response.data);
      sessionStorage.setItem('adminAccessToken', response.data.token);
      setAuthentication(true);

    })
    .catch((error) => {
      console.log(error);
      // if(error.response.status===401){
        setPasswordHelperText(error.response.data.error);
      // }
    });
  }
  function handleLoginDetails(event) {
    loginUser(adminDetails);
    event.preventDefault();
    // console.log(authentication)
    if(sessionStorage.getItem('adminAccessToken')!==null) {
      sessionStorage.setItem("adminAuthorization", true);
      navigate("/admin");
    }
  }
  function handleReset() {
    setAdminDetails({
      adminUserName: "",
      adminPassword: "",
    });
  }
  return (
    <>
      <Modal
        open={openLoginAdminModal}
        sx={{
          justifyItems: "center",
          // background: `url(${cartBg})`,
          backgroundSize: "cover",
        }}
      >
        {/* <Box sx={addLoginModalStyle}> */}
        <Paper sx={addLoginModalStyle}>
          <Typography>Login To Continue In Admin Page</Typography>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <form action="" className="admin__login">
            <FormControl>
              <Typography>Enter Admin Login Details</Typography>
              <TextField
                variant="standard"
                placeholder="Enter Admin user-name "
                value={adminDetails.adminUserName}
                onChange={(e) =>
                  setAdminDetails({
                    adminUserName: e.target.value,
                    adminPassword: adminDetails.adminPassword,
                  })
                }
                required
              />
              {
              // adminDetails.adminUserName === "prashant" && 
              (
                <TextField
                  type="password"
                  variant="standard"
                  placeholder="Password"
                  value={adminDetails.adminPassword}
                  onChange={(e) => {
                    setAdminDetails({
                      adminUserName: adminDetails.adminUserName,
                      adminPassword: e.target.value,
                    });
                    setPasswordHelperText("");
                  }}
                  required
                  helperText={passwordHelperText}
                />
              )}
            </FormControl>
            {/* {passwordHelperText !== "" && ( */}
              <Link href="/admin/login">Forget Password</Link>
            {/* )} */}
            {
            // (adminDetails.adminPassword==='Yolo'&&adminDetails.adminUserName==='prashant')&&
            <Stack direction="row" width="80%" gap='10%' justifyContent="center">
              {/* {adminDetails.adminUserName !== "" && ( */}
                <Button type="reset" variant="contained" onClick={handleReset}>
                  Reset
                </Button>
              {/* )} */}
              <Button
                variant="contained"
                type="submit"
                onClick={handleLoginDetails}
              >
                Login
              </Button>
            </Stack>}
          </form>
        </Paper>
        {/* </Box> */}
      </Modal>
    </>
  );
}
