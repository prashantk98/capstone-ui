import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
  Link,
  Stack,
  AppBar
} from "@mui/material";
// import PaidIcon from '@mui/icons-material/Paid';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SellIcon from "@mui/icons-material/Sell";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import totalItemInDb from "../../rowData";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Footer from "../../newcomponents/Footer";
// import homeBg from '../../images/cart_bg.svg';
import { useRef } from "react";
import DrawerCustom from "../DrawerCustom";



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
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  const sidebarButton = [
    { title: "Dashboard", onClickFuntion: navigateToDashborad },
    { title: "Add New Item", onClickFuntion: navigateToAddNewItem },
    { title: "Add Category", onClickFuntion: navigateToAddNewItem },
    { title: "Add Sub-Category", onClickFuntion: navigateToAddNewItem },
  ];

  function navigateToDashborad() {
    navigate("/admin");
  }
  function navigateToAddNewItem() {
    setOpenAddItemModal(true);
  }
  function closeAddNewItemModal() {
    setOpenAddItemModal(false);
  }
  function navigateToAddNewCategory() {
    console.log("add new category");
  }
  function navigateToAddNewSubCategory() {
    console.log("add new subcategory");
  }
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
  // if (sessionStorage.getItem("adminAuthenticated") === true) {
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
          <DrawerCustom
          sidebarButton={sidebarButton}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, fontSize: "1.4rem", width: "90%" }}
          >
            

            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              mb="3rem"
              sx={{
                // border: '4px solid black',
                "& .MuiPaper-root": {
                  p: "2rem 4rem",
                  height: "100%",
                },
                "& .MuiGrid-item": {
                  // height: '100%',
                  minHeight: "9.4rem",
                  // border: '2px solid red'
                },
              }}
              columns={{ xs: 2.5, sm: 6, md: 12 }}
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
                      textAlign: "center",
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
                          fontSize: "4.4rem",
                          position: "absolute",
                          top: "-3.2rem",
                          left: "-4.4rem",
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
                      textAlign: "center",
                    }}
                  >
                    <ReceiptIcon
                      fontSize="large"
                      sx={{
                        "&": {
                          backgroundColor: "orange",
                          color: "white",
                          fontSize: "4.4rem",
                          position: "absolute",
                          top: "-3.2rem",
                          left: "-4.4rem",
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
                      textAlign: "center",
                      // padding: '0 .8rem'
                    }}
                  >
                    <PageviewIcon
                      fontSize="large"
                      sx={{
                        "&": {
                          backgroundColor: "#0078ff",
                          color: "white",
                          fontSize: "4.4rem",
                          position: "absolute",
                          top: "-3.2rem",
                          left: "-4.4rem",
                          borderRadius: ".8rem",
                        },
                      }}
                    />
                    Avarage Probability
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
                    <CountUp
                      end={Math.floor(Math.random() * 40 + 50)}
                      duration={1}
                    />
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
                      textAlign: "center",
                    }}
                  >
                    <SellIcon
                      fontSize="large"
                      sx={{
                        "&": {
                          backgroundColor: "blue",
                          color: "white",
                          fontSize: "4.4rem",
                          position: "absolute",
                          top: "-3.2rem",
                          left: "-4.4rem",
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
            <AddItemAdmin
              navigateToAddNewItem={navigateToAddNewItem}
              openAddItemModal={openAddItemModal}
              closeAddNewItemModal={closeAddNewItemModal}
            />
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
                    <TableCell onClick={() => sortTable("productName")}>
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
            {/* <LoginAdminModal /> */}
            <Footer />
          </Box>
        </Box>
      </>
    );
  // }else{
  //   return <Navigate replace to="/adminlogin" />
  // }
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
    textAlign: "center",
    fontWeight: "600",
  },
  "& button, & .MuiSelect-select, & input, & label": {
    fontSize: "1.8rem",
  },
};

function AddItemAdmin(prop) {
  // const [openAddItemModal, setOpenAddItemModal] = useState(false);
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
        onClick={prop.navigateToAddNewItem}
      >
        Add New Product
      </Button>
      <Modal
        open={prop.openAddItemModal}
        //  onClose={() => setOpenAddItemModal(false)}
      >
        <Box sx={addItemModalStyle} component="form">
          <Typography>Add New Product </Typography>

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
          <Stack>
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
              <MenuItem
                value={true}
                sx={{ fontSize: "1.8rem", color: "green" }}
              >
                Yes
              </MenuItem>
              <MenuItem value={false} sx={{ fontSize: "1.8rem", color: "red" }}>
                No
              </MenuItem>
            </Select>
          </Stack>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <Button variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="contained" onClick={prop.closeAddNewItemModal}>
            Cancel
          </Button>
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
          <Stack>
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
              <MenuItem
                value={true}
                sx={{ fontSize: "1.8rem", color: "green" }}
              >
                Yes
              </MenuItem>
              <MenuItem value={false} sx={{ fontSize: "1.8rem", color: "red" }}>
                No
              </MenuItem>
            </Select>
          </Stack>
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
