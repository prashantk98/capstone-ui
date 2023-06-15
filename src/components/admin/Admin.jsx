// import Navbar from "../Navbar";
// import "./Admin.css";
// import { useState } from "react";
// import {
//   Typography,
//   Button,
//   TextField,
//   Autocomplete,
//   Table,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Paper,
//   // DataGrid
// } from "@mui/material";
// import rowDataArray from "../../rowData";

// const options = ["Grocery", "Electronics", "Option 1", "Option 2"];

// export default function Admin() {
//   const [value, setValue] = useState(options[0]);
//   const [inputValue, setInputValue] = useState("");

//   return (
//     // sx={{margin:'8rem 4rem 0 4rem'}}
//     // sx={{ margin: "1.6rem 0" }}
//     <>
//       <Navbar />
//       <form action="/#" className="admin" >
//         <Typography variant="h4" >
//           Add new category
//         </Typography>
//         <Autocomplete
//           value={value}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           inputValue={inputValue}
//           onInputChange={(event, newInputValue) => {
//             setInputValue(newInputValue);
//           }}
//           id="controllable-states-demo"
//           options={options}
//           sx={{ width: 300, fontSize: 30, margin: "1.6rem 0" }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Category"
//               sx={{ fontSize: '6rem' }}
//               required
//             />
//           )}
//         />
//         <Button variant="contained" color="success" sx={{ margin: "1.6rem 0" }}>
//           Success
//         </Button>
//       </form>

//       <form action="/#" className="admin__sub-category">
//         <Typography variant="h4" sx={{ margin: "1.6rem 0" }}>
//           Add new Sub-category
//         </Typography>
//         <Autocomplete
//           value={value}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           inputValue={inputValue}
//           onInputChange={(event, newInputValue) => {
//             setInputValue(newInputValue);
//           }}
//           id="controllable-states-demo"
//           options={options}
//           sx={{ width: 300, fontSize: 30, margin: "1.6rem 0", border: "none" }}
//           renderInput={(params) => (
//             <TextField {...params} label="sub-category" required />
//           )}
//         />
//         <Autocomplete
//           value={value}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           inputValue={inputValue}
//           onInputChange={(event, newInputValue) => {
//             setInputValue(newInputValue);
//           }}
//           id="controllable-states-demo"
//           options={options}
//           sx={{ width: 300, fontSize: 30, margin: "1.6rem 0" }}
//           renderInput={(params) => (
//             <TextField {...params} label="Category" required />
//           )}
//         />
//         <Button
//           variant="contained"
//           color="success"
//           className="admin__sub-category__button"
//           sx={{ margin: "1.6rem 0" }}
//         >
//           Success
//         </Button>
//       </form>
//       <TableContainer component={Paper} sx={{width:'90%',margin: '0 4rem 0 4rem'}}>
//       <Table  aria-label="simple table" sx={{'& thead th': {
//             fontWeight: '600',
//             color: 'black',
//             backgroundColor: '#42a5f5',
//             fontSize:'1.6rem'
//         },
//         '& tbody td': {
//             fontWeight: '300',
//             fontSize:'1.2rem'
//         },
//         '& tbody tr:hover': {
//             backgroundColor: '#fffbf2',
//             cursor: 'pointer',
//         }}}>
//         <TableHead>
//           <TableRow >
//             <TableCell>First Name</TableCell>
//             <TableCell>Last Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Gender</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rowDataArray.map((current, index) => {
//             return (
//               <TableRow key={current.id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
//                 <TableCell>{current.first_name}</TableCell>
//                 <TableCell>{current.last_name}</TableCell>
//                 <TableCell>{current.email}</TableCell>
//                 <TableCell>{current.gender}</TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>

//       </Table>
//       </TableContainer>
//     </>
//   );
// }

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import AddIcon from "@mui/icons-material/Add";
// import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useEffect } from "react";
import { useRef } from "react";
import * as echarts from "echarts";
import { objectDetectionProbability } from "../../rowData";
import ReactEcharts from "echarts-for-react";
import { Paper, Grid,Table,TableCell, TableRow,TableContainer,TableBody,TableHead } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SellIcon from '@mui/icons-material/Sell';
import totalItemInDb from "../../rowData";
// import Grid from '@mui/material/Grid';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const chartOption = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    name: "Fruits Name",
    type: "category",
    boundaryGap: false,
    data: objectDetectionProbability.objectName,
  },
  yAxis: {
    name: "Probability",
    type: "value",
  },
  series: [
    {
      data: objectDetectionProbability.objectProbability,
      type: "line",
    },
  ],
};

export default function Admin() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const chartRef = useRef(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          // fontSize: '3rem'
          backgroundColor: "#558044",
          fontSize: "3rem",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            Smart Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            ".css-10hburv-MuiTypography-root": {
              fontSize: "1.4rem",
            },
          }}
        >
          {[
            "Dashboard",
            "Add new Item",
            "Add Category",
            "Add Sub-Category",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <DashboardIcon /> : <AddIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          sx={{
            ".css-10hburv-MuiTypography-root": {
              fontSize: "1.4rem",
            },
          }}
        >
          {["All Item", "All Category", "All SubCategory"].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    "&": {
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <AddIcon /> : <AddIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, fontSize: "1.4rem",width: '90%' }}>
        <DrawerHeader />

        <Grid
          container
          // spacing={4}
          justifyContent="space-between"
          alignItems="center"
          paddingBottom="3rem"
        >
          <Grid item xs={2.5}>
            <Paper 
            sx={{
              p:3
            }}>
              <Typography
              sx={{
                fontSize: "1.8rem",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              >
              <PaidIcon fontSize="large"/>
              Total Revenue
              </Typography>
              <Typography
              sx={{
                fontSize: "1.8rem",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: "700",
              }}
              >
              <CurrencyRupeeIcon fontSize="large"/>
              612,839
              </Typography>
              </Paper>
          </Grid>
          <Grid item xs={2.5}>
          <Paper 
          sx={{
            p:3
          }}
          >
              <Typography
              sx={{
                fontSize: "1.8rem",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              >
                <ReceiptIcon fontSize="large"/>
              Total Transaction
              </Typography>
              <Typography
              sx={{
                fontSize: "1.8rem",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: "700",
              }}
              >
              54,231
              </Typography>
              </Paper>
          </Grid>
          <Grid item xs={2.5}>
          <Paper 
          sx={{
            p:3
          }}
          >
              <Typography
              sx={{
                fontSize: "1.8rem",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              >
              <SellIcon fontSize="large"/>
              Total Product Sold
              </Typography>
              <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: "700",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              >
              12,333
              </Typography>
              </Paper>
          </Grid>
        </Grid>
        <Paper
          sx={{
            "&": {
              padding: "1rem",
              marginBottom: '3rem'
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "700",
            }}
          >
             Probability Of Object Detection
          </Typography>
          <ReactEcharts option={chartOption} width="80%" style={{height: '40rem'}} />
        </Paper>

        <TableContainer component={Paper} sx={{width:'100%',
        // margin: '0 4rem 0 4rem'
        }}>
       <Table  aria-label="simple table" 
       sx={{'& thead th': {
             fontWeight: '600',
             color: 'black',
             backgroundColor: '#42a5f5',
             fontSize:'1.6rem'
         },
         '& tbody td': {
             fontWeight: '300',
             fontSize:'1.2rem',
             fontWeight: '500'
        },
         '& tbody tr:hover': {
             backgroundColor: '#fffbf2',
             cursor: 'pointer',
            //  fontWeight: '500'
         }}}>
         <TableHead>
           <TableRow >
             <TableCell>Id</TableCell>
             <TableCell>Name</TableCell>
             <TableCell>Category</TableCell>
             <TableCell>Available</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {totalItemInDb.map((current, index) => {
             return (
               <TableRow key={current.id}
               sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                 <TableCell>{current.id}</TableCell>
                 <TableCell>{current.name}</TableCell>
                 <TableCell>{current.category}</TableCell>
                 <TableCell
                 sx={
                  current.available?{
                    color: 'green'
                 }:{
                  color: 'red'
                 }}
                 >{current.available?'Yes':'No'}</TableCell>
               </TableRow>
             );
           })}
         </TableBody>

       </Table>
       </TableContainer>
      </Box>
    </Box>
  );
}

export function AddItemAdmin(){
  return (
    <>
    </>
  );
}