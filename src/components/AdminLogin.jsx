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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import cartBg from "../images/homeBgFull.svg";

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
  gap: "2.4rem",
  margin: "0 auto",
  alignItems: "center",
  // justifyContent: "center",
  // width: "100%",
  // height: "100%",
  backgroundColor: "#eee",
  "& .MuiTypography-root": {
    fontSize: "2rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  "& .MuiPaper-root": {
    width: "70%",
    padding: "4rem",
    "& .admin__login": {
      width: "100%",
      textAlign: "center",
      "& .MuiFormControl-root": {
        width: "100%",
        m: "2rem auto",
        "& .MuiFormControl-root": {
          width: "80%",
        },
        "& input": {
          display: "inline-block",
          width: "100%",
          fontSize: "2rem",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "1.6rem",
        },
      },
      "& .MuiButton-root": {
        margin: "1rem 0",
        width: "80%",
        fontSize: "1.6rem",
      },
    },
  },
};

function userName() {
  let data = JSON.stringify({
    phoneNumber: "8239363793",
    password: "Smartcheckoutadmin",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/auth/admin/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [openLoginAdminModal, setOpenLoginAdminModal] = useState(true);
  // const [adminUserName, setAdminUserName] = useState('');
  // const [adminPassword, setAdminPassword]= useState('');
  const [adminDetails, setAdminDetails] = useState({
    adminUserName: "",
    adminPassword: "",
  });
  const [passwordHelperText, setPasswordHelperText] = useState("");
  function handleLoginDetails(event) {
    console.log(adminDetails);
    event.preventDefault();
    if (
      adminDetails.adminUserName === "prashant" &&
      adminDetails.adminPassword === "Yolo"
    ) {
      console.log('Inside it')
      // setOpenLoginAdminModal(false);
      sessionStorage.setItem("adminAuthenticated", true);
      navigate("/admin");
    } else {
      setPasswordHelperText("Password is incorrect");
    }
  }
  return (
    <>
      <Modal
        open={openLoginAdminModal}
        sx={{
          justifyItems: "center",
          background: `url(${cartBg})`,
          backgroundSize: "cover",
        }}
      >
        <Box sx={addLoginModalStyle}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography>Login To Continue In Admin Page</Typography>
          <Paper>
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
                {adminDetails.adminUserName === "prashant" && (
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
              {passwordHelperText !== "" && (
                <Link href="/admin/login">Forget Password</Link>
              )}
              <Button
                variant="contained"
                type="submit"
                onClick={handleLoginDetails}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}
