import { useState } from "react";
import { Button,Stack,TextField,Typography,Modal,Box,Select,MenuItem,InputLabel } from "@mui/material";

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

export default function AddNewProduct(prop){
  // const [openAddNewProductModal, setOpenAddNewProductModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemAvailable, setItemAvailable] = useState("");
  const [itemPhoto, setItemPhoto] = useState(null);


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