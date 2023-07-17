import {
  Modal,
  Button,
  Select,
  InputLabel,
  Stack,
  MenuItem,
  TextField,
  Box,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ProfilePhoto from "./ProfilePhoto";
// import { notification } from "antd";
import { useState } from "react";
// import { apiLocalPath } from "../rowData";
// import axios from "axios";
// import { FormControl } from "@mui/base";
import {editProductDetailsApi} from '../backendApis/AdminApis'

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

export default function EditItemDetails({ currentItem, setRowsPerPage, setIsDataChanged}) {
  const [editableProductModal, setEditableProductModal] = useState(false);
  const [productName, setProductName] = useState(currentItem.name);
  const [productPrice, setProductPrice] = useState(currentItem.price);
  const [productCategory, setProductCategory] = useState(
    currentItem.categories
  );
  const [productAvailable, setProductAvailable] = useState(
    currentItem.isActive
  );
  const [productQuantity, setProductQuantity] = useState(currentItem.quantity);
  const [productPhoto, setProductPhoto] = useState(currentItem.image);

  const handleEdit = (item) => {
    setEditableProductModal(true);
    setProductName(currentItem.name);
    setProductPrice(currentItem.price);
    setProductCategory(currentItem.categories);
    setProductAvailable(currentItem.isActive);
    setProductQuantity(currentItem.quantity);
    setProductPhoto(() => currentItem.image);
    console.log(productPhoto);
  };
 
  const handleCancel = () => {
    setEditableProductModal(false);
  };

  const handleSave = () => {
    editProductDetailsApi(
      productName,
      productPrice,
      productQuantity,
      productCategory,
      productAvailable,
      productPhoto,
      currentItem
    );
    setIsDataChanged(true);
    setRowsPerPage(25);
    setRowsPerPage(10);
    setEditableProductModal(false);
    // setData(updatedData);
  };
  

  return (
    <>
      <IconButton
        onClick={() => {
          handleEdit(currentItem);

        }}
      >
        <EditIcon />
      </IconButton>
      <Modal open={Boolean(editableProductModal)}>
        <Box sx={editItemModalStyle} component="form">
          <Typography>Edit Details</Typography>
          <ProfilePhoto
            image={productPhoto}
            setProductPhoto={setProductPhoto}
          />
          <TextField
            name="productName"
            label="Product Name"
            variant="filled"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            name="productPrice"
            label="Product Price"
            variant="filled"
            fullWidth
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <TextField
            name="productQuantity"
            label="Product Quantity"
            variant="filled"
            fullWidth
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
          <Stack>
            <InputLabel id="demo-simple-select-standard-label">
              Item Category
            </InputLabel>
            <Select
              name="productCategory"
              label="Product Category"
              variant="filled"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              // defaultValue={itemAvailable}
            >
              <MenuItem value="Fruits" sx={{ fontSize: "1.8rem" }}>
                Fruits
              </MenuItem>
              <MenuItem value={"Vegetables"} sx={{ fontSize: "1.8rem" }}>
                Vegetables
              </MenuItem>
            </Select>
          </Stack>

          <Stack>
          <FormLabel id="demo-row-radio-buttons-group-label">Product Available</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={productAvailable}
              onChange={(e)=>setProductAvailable(e.target.value)}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes"  />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
          </Stack>
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
