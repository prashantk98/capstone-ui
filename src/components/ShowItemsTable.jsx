import {TableContainer,Table, TableHead,TableBody,TableCell,TableRow,Paper,Modal,Button,Select,InputLabel,Stack,MenuItem,TextField,Box, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import totalItemInDb, { apiLocalPath } from '../rowData';
import axios from 'axios';
import TableFooter from './TableFooterComponent';
export default function ShowItemsTable(){

  const [totalProductsArray,setTotalProductsArray]=useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const currentPage = 0; // Example current page number
  const totalPages = 5; // Example total number of pages

  const handleChangePage = (event, newPage) => {
    // Handle page change logic
    console.log(newPage);
  };
  const sortTable = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // const sortedData = [...totalItemInDb].sort((a, b) => {
  //   if (a[sortConfig.key] < b[sortConfig.key]) {
  //     return sortConfig.direction === "asc" ? -1 : 1;
  //   }
  //   if (a[sortConfig.key] > b[sortConfig.key]) {
  //     return sortConfig.direction === "asc" ? 1 : -1;
  //   }
  //   return 0;
  // });

  const sortedData = [...totalProductsArray].sort((a, b) => {
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
  function totalProductApi(){
    const token = sessionStorage.getItem("adminAccessToken")
    let config = {
      method: 'GET',
      url: `${apiLocalPath}/inventory/products`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    // console.log(config.headers)
    
    axios.request(config)
    .then((response) => {
      console.log(response.data);
      setTotalProductsArray(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
      }
  useEffect(()=>{
    // console.log(totalProductsArray);
    totalProductApi();
  },[])
  return(
    <>
    <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                // maxHeight: "40rem",
                // margin: "3rem 0",
                margin: '4rem 0'
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
                    <TableCell onClick={() => {sortTable("id"); totalProductApi();}}>
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
                    <TableCell onClick={() => sortTable("quantity")}>
                      Quantity {getSortIcon("quantity")}{" "}
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
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "td img": {
                            width: "3.2rem",
                            height: "3.2rem",
                          },
                        }}
                      >
                        <TableCell>{index +1}</TableCell>
                        <TableCell>
                          <img src={"data:image/jpeg;base64,"+current.image} alt={current.name} />
                        </TableCell>
                        <TableCell>{current.name}</TableCell>
                        <TableCell>{current.categories}</TableCell>

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
                          {
                          (current.probability * 100).toFixed(2)
                          // (Math.random()*50+index).toFixed(2)
                          }
                        </TableCell>

                        <TableCell>{current.quantity}</TableCell>
                        <TableCell
                          sx={
                            current.isActive
                              ? {
                                  color: "green",
                                }
                              : {
                                  color: "red",
                                }
                          }
                        >
                          {current.isActive ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          <EditItemDetails currentItem={current} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter currentPage={currentPage} totalPages={totalPages} handleChangePage={handleChangePage} />
              </Table>
            </TableContainer>
    </>
  );
}


const editItemModalStyle = {
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


function EditItemDetails(prop) {
  const [editableProductModal, setEditableProductModal] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedAge, setEditedAge] = useState("");
  // const [productName, setProductName] = useState(prop.currentItem.name);
  // const [productPrice, setProductPrice] = useState(prop.currentItem.price);
  // const [productCategory, setProductCategory] = useState(prop.currentItem.categories);
  // const [productAvailable, setProductAvailable] = useState(prop.currentItem.isActive);
  // const [productQuantity, setProductQuantity]= useState(prop.currentItem.quantity);
  const [productPhoto, setProductPhoto] = useState(null);
  const [productDetails, setProductDetails]= useState({
    productName: prop.currentItem.name,
    productPrice: prop.currentItem.price,
    productCategory: prop.currentItem.categories,
    productAvailable: prop.currentItem.isActive,
    productPhoto: prop.currentItem.image,
    productQuantity: prop.currentItem.quantity
  });
  // const [editableItemModal, setEditableItemModal] = useState(false);

  const handleEdit = (item) => {
    setEditableProductModal(item);
    // setEditedName(item.name);
    // setEditedAge(item.age);
  };
  // const chartRef = useRef(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      [name]: value
    }));
  };
  const handleCancel = () => {
    setEditableProductModal(false);
    setEditedName("");
    setEditedAge("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(productPhoto);
    setProductPhoto(file);
  };
  const handleSave = () => {
    const updatedData = totalItemInDb.map((item) => {
      if (item.id === editableProductModal.id) {
        return { ...item, name: editedName, age: editedAge };
      }
      return item;
    });

    // setData(updatedData);
    setEditableProductModal(null);
    setEditedName("");
    setEditedAge("");
  };

  return (
    <>
      <IconButton onClick={() => {handleEdit(prop.currentItem)}}>
        <EditIcon />
      </IconButton>
      <Modal open={Boolean(editableProductModal)} onClose={handleCancel}>
        {/* <div className="modal-container"> */}
        <Box sx={editItemModalStyle} component="form">
          <Typography>Edit Details</Typography>
          <TextField
            name='productName'
            label="Product Name"
            variant="filled"
            fullWidth
            value={productDetails.productName}
            onChange={handleChange}
          />
          <TextField
            name='productPrice'
            label="Product Price"
            variant="filled"
            fullWidth
            value={productDetails.productPrice}
            onChange={handleChange}
          />
          <TextField
            name='productQuantity'
            label="Product Quantity"
            variant="filled"
            fullWidth
            value={productDetails.productQuantity}
            onChange={handleChange}
          />
          <TextField
            name='productCategory'
            label="Product Category"
            variant="filled"
            fullWidth
            value={productDetails.productCategory}
            onChange={handleChange}
          />
          <Stack>
            <InputLabel id="demo-simple-select-standard-label">
              Product Available
            </InputLabel>
            <Select
              name='productAvailable'
              label="Product Available"
              variant="filled"
              value={productDetails.productAvailable}
              onChange={handleChange}
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
