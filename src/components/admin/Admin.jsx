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
// import { useRef } from "react";
// import { objectDetectionProbability } from "../../rowData";
import ReactEcharts from "echarts-for-react";
import {
  Paper,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  TableHead,
  TextField,
  Modal,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
} from "@mui/material";
// import PaidIcon from '@mui/icons-material/Paid';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SellIcon from "@mui/icons-material/Sell";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EditIcon from "@mui/icons-material/Edit";
import totalItemInDb from "../../rowData";
import { useState } from "react";
import CountUp from "react-countup";
import Footer from "../../newcomponents/Footer";
import { useRef } from "react";
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
    formatter: (params) => {
      const dataIndex = params[0]?.dataIndex;
      if (dataIndex !== undefined) {
        const data = totalItemInDb.reduce((accumulator, current) => {
          return [...accumulator, current.imgSrc];
        }, []);
        return `
            <img src="${data[dataIndex]}" alt="${params[0]?.name}" style="width: 4rem; height: 4rem;" />
            <div>${params[0]?.name}: ${params[0]?.value}%</div>
        `;
      }
      return "";
    },
  },
  xAxis: {
    name: "Item Name",
    type: "category",
    boundaryGap: false,
    data: totalItemInDb.reduce((accumulator, current) => {
      return [...accumulator, current.productName];
    }, []),
  },
  yAxis: {
    name: "Probability %",
    type: "value",
    // data: objectDetectionProbability.objectProbability,
  },
  series: [
    {
      data: totalItemInDb.reduce((accumulator, current) => {
        return [...accumulator, (current.probability * 100).toFixed(2)];
      }, []),
      type: "line",
    },
  ],
};

export default function Admin() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const sortTable = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedData = [...totalItemInDb].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUpwardIcon />
      ) : (
        <ArrowDownwardIcon />
      );
    }
    return null;
  };

  return (
    <>
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
                fontSize: "1.8rem",
              },
              "& svg": {
                fontSize: "1.8rem",
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
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, fontSize: "1.4rem", width: "90%" }}
        >
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
                elevation={3}
                sx={{
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    // gap: '1rem'
                    // justifyContent: 'space-between'
                  }}
                >
                  <CurrencyRupeeIcon
                    fontSize="large"
                    sx={{
                      "&": {
                        backgroundColor: "green",
                        color: "white",
                        fontSize: "5.4rem",
                        position: "absolute",
                        top: "-3.2rem",
                        left: "-3.2rem",
                        borderRadius: ".8rem",
                      },
                    }}
                  />
                  Total Revenue
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                  }}
                >
                  <CurrencyRupeeIcon fontSize="large" />

                  <CountUp end={612839} duration={1} />
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2.5}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <ReceiptIcon
                    fontSize="large"
                    sx={{
                      "&": {
                        backgroundColor: "orange",
                        color: "white",
                        fontSize: "5.4rem",
                        position: "absolute",
                        top: "-3.2rem",
                        left: "-3.2rem",
                        borderRadius: ".8rem",
                      },
                    }}
                  />
                  Total Transaction
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                  }}
                >
                  <CountUp end={54231} duration={1} />
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2.5}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <SellIcon
                    fontSize="large"
                    sx={{
                      "&": {
                        backgroundColor: "blue",
                        color: "white",
                        fontSize: "5.4rem",
                        position: "absolute",
                        top: "-3.2rem",
                        left: "-3.2rem",
                        borderRadius: ".8rem",
                      },
                    }}
                  />
                  Total Product Sold
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CountUp end={12333} duration={1} />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Paper
            elevation={3}
            sx={{
              "&": {
                padding: "1rem",
                marginBottom: "3rem",
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
            <ReactEcharts option={chartOption} style={{ height: "40rem" }} />
          </Paper>
          <AddItemAdmin />
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              maxHeight: "40rem",
              margin: "3rem 0",
              // margin: '0 4rem 0 4rem'
            }}
          >
            <Table
              aria-label="simple table"
              stickyHeader
              sx={{
                "& thead th": {
                  fontWeight: "600",
                  color: "black",
                  backgroundColor: "#42a5f5",
                  fontSize: "1.6rem",
                },
                "& tbody td": {
                  fontSize: "1.2rem",
                  fontWeight: "500",
                },
                "& tbody tr:hover": {
                  backgroundColor: "#fffbf2",
                  cursor: "pointer",
                  //  fontWeight: '500'
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => sortTable("id")}>
                    Id{getSortIcon("id")}
                  </TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell onClick={() => sortTable("name")}>
                    Name{getSortIcon("name")}
                  </TableCell>
                  <TableCell onClick={() => sortTable("category")}>
                    Category {getSortIcon("category")}
                  </TableCell>
                  <TableCell onClick={() => sortTable("probability")}>
                    Probability % {getSortIcon("probability")}{" "}
                  </TableCell>
                  <TableCell onClick={() => sortTable("available")}>
                    Available {getSortIcon("available")}{" "}
                  </TableCell>
                  <TableCell>Edit </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((current, index) => {
                  return (
                    <TableRow
                      key={current.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "td img": {
                          width: "3.2rem",
                          height: "3.2rem",
                        },
                      }}
                    >
                      <TableCell>{current.id}</TableCell>
                      <TableCell>
                        <img src={current.imgSrc} alt={current.productName} />
                      </TableCell>
                      <TableCell>{current.productName}</TableCell>
                      <TableCell>{current.category}</TableCell>

                      <TableCell
                        sx={
                          current.probability * 100 <= 50
                            ? {
                                color: "red",
                              }
                            : current.probability * 100 <= 70
                            ? {
                                color: "orange",
                              }
                            : {
                                color: "green",
                              }
                        }
                      >
                        {(current.probability * 100).toFixed(2)}
                      </TableCell>
                      <TableCell
                        sx={
                          current.available
                            ? {
                                color: "green",
                              }
                            : {
                                color: "red",
                              }
                        }
                      >
                        {current.available ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        <EditItemDetails currentItem={current} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <EditItemDetails/> */}
          <LoginAdminModal />
          <Footer />
        </Box>
      </Box>
    </>
  );
}

const addItemModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  margin: "0 auto",
  "& .MuiTypography-root": {
    fontSize: "2rem",
  },
  "& button, & .MuiSelect-select, & input, & label": {
    fontSize: "1.8rem",
  },
};

function AddItemAdmin() {
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemAvailable, setItemAvailable] = useState("");
  const [itemPhoto, setItemPhoto] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform form submission logic here
  //   console.log({
  //     itemName,
  //     itemPrice,
  //     itemCategory,
  //     itemAvailable,
  //     itemQuantity,
  //     itemPhoto,
  //   });
  //   // Reset form fields
  //   setItemName('');
  //   setItemPrice('');
  //   setItemCategory('');
  //   setItemAvailable('');
  //   setItemQuantity('');
  //   setItemPhoto(null);
  // };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(itemPhoto);
    setItemPhoto(file);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          fontSize: "1.8rem",
        }}
        onClick={() => setOpenAddItemModal(true)}
      >
        Add New Product
      </Button>
      <Modal open={openAddItemModal} onClose={() => setOpenAddItemModal(false)}>
        <Box sx={addItemModalStyle} component="form">
          <Typography>This is modal to add item </Typography>

          <TextField
            name="itemName"
            label="Item Name"
            variant="filled"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            name="itemPrice"
            label="Item Price"
            variant="filled"
            fullWidth
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <TextField
            name="itemCategory"
            label="Item Category"
            variant="filled"
            fullWidth
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
          />
          <TextField
            name="itemAvailable"
            label="Item Available"
            variant="filled"
            fullWidth
            value={itemAvailable}
            onChange={(e) => setItemAvailable(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          {/* <Button onClick={()=>setOpenAddItemModal(false)}>Close Modal</Button> */}
        </Box>
      </Modal>
    </>
  );
}

function EditItemDetails(prop) {
  const [editableItemModal, setEditableItemModal] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedAge, setEditedAge] = useState("");
  const [itemName, setItemName] = useState(prop.currentItem.productName);
  const [itemPrice, setItemPrice] = useState(prop.currentItem.price);
  const [itemCategory, setItemCategory] = useState(prop.currentItem.category);
  const [itemAvailable, setItemAvailable] = useState(
    prop.currentItem.available
  );
  const [itemPhoto, setItemPhoto] = useState(null);
  // const [editableItemModal, setEditableItemModal] = useState(false);

  const handleEdit = (item) => {
    setEditableItemModal(item);
    // setEditedName(item.name);
    // setEditedAge(item.age);
  };
  // const chartRef = useRef(null);

  const handleCancel = () => {
    setEditableItemModal(false);
    setEditedName("");
    setEditedAge("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(itemPhoto);
    setItemPhoto(file);
  };
  const handleSave = () => {
    const updatedData = totalItemInDb.map((item) => {
      if (item.id === editableItemModal.id) {
        return { ...item, name: editedName, age: editedAge };
      }
      return item;
    });

    // setData(updatedData);
    setEditableItemModal(null);
    setEditedName("");
    setEditedAge("");
  };
  return (
    <>
      <IconButton onClick={() => handleEdit(prop.currentItem)}>
        <EditIcon />
      </IconButton>
      <Modal open={Boolean(editableItemModal)} onClose={handleCancel}>
        {/* <div className="modal-container"> */}
        <Box sx={addItemModalStyle} component="form">
          <h2>Edit Details</h2>
          <TextField
            name="itemName"
            label="Item Name"
            variant="filled"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            name="itemPrice"
            label="Item Price"
            variant="filled"
            fullWidth
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <TextField
            name="itemCategory"
            label="Item Category"
            variant="filled"
            fullWidth
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
          />
          {/* <TextField
        name="itemAvailable"
        label="Item Available"
        variant="filled"
        fullWidth
        value={itemAvailable}
        onChange={(e) => setItemAvailable(e.target.value)}
      /> */}
          <InputLabel id="demo-simple-select-standard-label">
            Item Available
          </InputLabel>
          <Select
            name="itemAvailable"
            label="Item Available"
            variant="filled"
            value={itemAvailable}
            onChange={(event) => setItemAvailable(event.target.value)}
            // defaultValue={itemAvailable}
          >
            <MenuItem value={true} sx={{ fontSize: "1.8rem", color: "green" }}>
              Yes
            </MenuItem>
            <MenuItem value={false} sx={{ fontSize: "1.8rem", color: "red" }}>
              No
            </MenuItem>
          </Select>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}

const addLoginModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
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
    // width: '70%',
    "& #admin-login, & #admin-signup": {
      display: "none",
    },
    "& button, & label": {
      fontSize: "1.8rem",
    },
    "& label": {
      display: "inline-block",
      width: "50%",
      textAlign: "center",
      p: 2,
      backgroundColor: "#ddd",
    },
    "& input:checked+label": {
      borderTop: "2px solid blue",
      backgroundColor: "white",
    },
    "& .admin__login, & .admin__signup": {
      width: "100%",
      textAlign: 'center',
      "& .MuiFormControl-root": {
        width: '100%',
        m: "2rem auto",
        "& .MuiFormControl-root": {
          width: "80%",
        },
        "& input": {
          display: "inline-block",
          width: "100%",
          fontSize: "2rem",
        },
      },
      "& .MuiButton-root": {
        width: "80%",
        fontSize: "1.6rem",
      },
    },
    // '& .MuiTextField-root, & .MuiInputBase-root':{
    //   width: '100%',
    //   display: 'inline-block',
    //   // fontSize: '7rem'
    // }
  },
};

function LoginAdminModal() {
  const [openLoginAdminModal, setOpenLoginAdminModal] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState("admin-login");
  return (
    <>
      <Modal
        open={openLoginAdminModal}
        sx={{
          justifyItems: "center",
        }}
      >
        <Box sx={addLoginModalStyle}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography>Login To Continue In Admin Page</Typography>
          <Paper>
            {/* <TextField></TextField> */}
            <input
              type="radio"
              name="tabs"
              id="admin-login"
              // checked
              onChange={(e) => {
                console.log(e.target.value);
                console.log("login");
              }}
              readOnly
              onClick={() => setSelectedRadio("admin-login")}
            />

            <label htmlFor="admin-login">Login</label>
            <input
              type="radio"
              name="tabs"
              id="admin-signup"
              // checked
              onChange={(e) => {
                console.log(e.target.value);
                console.log("signup");
              }}
              onClick={() => setSelectedRadio("admin-signup")}
            />

            <label htmlFor="admin-signup">Sign Up</label>
            <form
              action=""
              className="admin__login"
              style={
                selectedRadio === "admin-signup"
                  ? {
                      display: "none",
                    }
                  : {height: '30rem'}
              }
            >
              <FormControl name="admin-login">
                <Typography>Enter Admin Login Details</Typography>
                <TextField
                  variant="standard"
                  placeholder="Enter Mobile number"
                />
                <TextField
                  type="password"
                  variant="standard"
                  placeholder="password"
                />
              </FormControl>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </form>
            <form
              action=""
              className="admin__signup"
              style={
                selectedRadio === "admin-login"
                  ? {
                      display: "none",
                    }
                  : {height: '55rem'}
              }
            >
              <FormControl name="admin-signup">
                <Typography>Create a new account</Typography>
                <TextField
                  variant="standard"
                  required
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  variant="standard"
                  placeholder="Enter Email"
                  required
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="standard"
                  placeholder="Enter Mobile number"
                />
                <TextField
                  type="password"
                  required
                  variant="standard"
                  placeholder="password"
                />
                <TextField
                  type="password"
                  variant="standard"
                  required
                  placeholder="Confirm password"
                />
              </FormControl>
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            </form>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}
