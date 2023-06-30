import {TableContainer,Table, TableHead,TableBody,TableCell,TableRow,Paper,Modal,Button,Select,InputLabel,Stack,MenuItem,TextField,Box, Typography} from '@mui/material';
import { useState } from 'react';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import totalItemInDb, { apiLocalPath } from '../rowData';
import axios from 'axios';
export default function ShowItemsTable(){

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
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
  function totalProductApi(){

    // let config = {
    //   method: 'GET',
    //   url: 'https://9843-14-143-15-250.ngrok-free.app/inventory/products/',
    //   headers: { 
    //     'Authorization': 'Bearer '+sessionStorage.getItem('adminAccessToken'),
    //     'Content-Type': 'Application/json'
    //   }
    // };
    // console.log(config.headers)
    
    // axios.request(config)
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    //   }

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://9843-14-143-15-250.ngrok-free.app/inventory/products/',
  headers: { 
    'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNoaXJheXUiLCJleHAiOjE2ODgxMjIzNzcsInJvbGUiOiJhZG1pbiJ9.rUWUH93FRyyOBklzo0xtgFAST-ey-HBuDvQldlKBfMo'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
  }
  return(
    <>
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
                    <TableCell onClick={() => {sortTable("id"); totalProductApi();}}>
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
      <IconButton onClick={() => {handleEdit(prop.currentItem)}}>
        <EditIcon />
      </IconButton>
      <Modal open={Boolean(editableItemModal)} onClose={handleCancel}>
        {/* <div className="modal-container"> */}
        <Box sx={editItemModalStyle} component="form">
          <Typography>Edit Details</Typography>
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
