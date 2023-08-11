import { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Modal,
  Box,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { addNewProductApi } from "../backendApis/AdminApis";

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
  "& button, & .MuiSelect-select, & input, & label , & .MuiFormHelperText-root": {
    fontSize: "1.8rem",
  },
};

export default function AddNewProduct({
  navigateToAddNewItem,
  openAddNewProductModal,
  closeAddNewItemModal,
  setRowsPerPage,
  setIsDataChanged
}) {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemQuantity, setItemQuantity] = useState("");

  const [itemNameError, setItemNameError] = useState(false);
  const [itemPriceError, setItemPriceError] = useState(false);
  const [itemQuantityError, setItemQuantityError] = useState(false);
  const [itemCategoryError, setItemCategoryError] = useState(false);

  function handlePhotoChange(e){
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const imageData = base64String.split(",")[1];
        setItemPhoto(imageData);
      };
      reader.readAsDataURL(file);
    }
    // e.target.value = null;
  };

  function handleSubmit() {
    // Validate form fields
    let isValid = true;

    if (!itemName) {
      setItemNameError(true);
      isValid = false;
    } else {
      setItemNameError(false);
    }

    if (!itemPrice || isNaN(itemPrice)) {
      setItemPriceError(true);
      isValid = false;
    } else {
      setItemPriceError(false);
    }
    if (!itemQuantity || isNaN(itemQuantity)) {
      setItemQuantityError(true);
      isValid = false;
    } else {
      setItemQuantityError(false);
    }

    if (!itemCategory) {
      setItemCategoryError(true);
      isValid = false;
    } else {
      setItemCategoryError(false);
    }

    if (isValid) {
      addNewProductApi(itemName, itemPrice, itemQuantity, itemCategory, itemPhoto, itemAvailable);
      setIsDataChanged(true);
      setRowsPerPage(25);
      setRowsPerPage(10);
      resetFormFields();
      closeAddNewItemModal();
    }
  }

  function resetFormFields() {
    setItemName("");
    setItemPrice("");
    setItemCategory("");
    setItemAvailable(true);
    setItemPhoto(null);
    setItemQuantity("");
    setItemNameError(false);
    setItemPriceError(false);
    setItemCategoryError(false);
  }

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          fontSize: "1.8rem",
        }}
        onClick={navigateToAddNewItem}
      >       Add New Product </Button>
      <Modal open={openAddNewProductModal}>
        <Box sx={addItemModalStyle}>
          <Typography>Add New Product</Typography>

          <TextField
            name="itemName"
            label="Item Name"
            variant="filled"
            required
            fullWidth
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
              setItemNameError(false); 
            }}
            error={itemNameError}
            helperText={itemNameError && "Item Name is required"}
          />

          <TextField
            name="itemPrice"
            label="Product Price"
            variant="filled"
            required
            fullWidth
            value={itemPrice}
            onChange={(e) => {
              const value = e.target.value;
              setItemPrice(value);
              setItemPriceError(isNaN(value));
            }}
            error={itemPriceError}
            helperText={itemPriceError && "Product Price must be a numeric value"}
          />
          <TextField
            name="productQuantity"
            label="Product Quantity"
            variant="filled"
            required
            fullWidth
            value={itemQuantity}
            onChange={(e) => {
              setItemQuantity(e.target.value);
              setItemQuantityError(isNaN(e.target.value));
            }}
            error={itemQuantityError}
            helperText={itemQuantityError && "Product Quantity must be a numeric value"}
          />

          <Stack>
            <InputLabel id="demo-simple-select-standard-label">
              Item Category
            </InputLabel>
            <Select
              name="itemCategory"
              label="Item Category"
              variant="filled"
              value={itemCategory}
              onChange={(event) => {
                setItemCategory(event.target.value);
                setItemCategoryError(false); 
              }}
              error={itemCategoryError}
              helperText={itemCategoryError && "Item Category is required"}
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
            <InputLabel>Item Available</InputLabel>
            <RadioGroup
              name="itemAvailable"
              value={itemAvailable}
              onChange={(event) => setItemAvailable(event.target.value)}
              row
            >
              <FormControlLabel
                value={true}
                control={<Radio color="success" />}
                label="Yes"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="success" />}
                label="No"
              />
            </RadioGroup>
          </Stack>

          {/* File input */}
          {/* Submit and Cancel buttons */}

          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit</Button>
            <Button variant="contained" 
            onClick={()=>{
              closeAddNewItemModal();
              resetFormFields();
            }}
              >Cancel</Button>
        </Box>
      </Modal>
    </>
  );
}
