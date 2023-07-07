import { useState } from "react";
import { Button,Stack,TextField,Typography,Modal,Box,Select,MenuItem,InputLabel } from "@mui/material";
import axios from "axios";
import { apiLocalPath } from "../rowData";

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
  const [itemCategory, setItemCategory] = useState('Fruits');
  const [itemAvailable, setItemAvailable] = useState("");
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemQuantity, setItemQuantity] = useState('');


  const handlePhotoChange = (e) => {
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
  
  function addNewProductApi(name,price,quantity,category,imgSrc,available){
    let data = JSON.stringify({
      "name": name,
      "price": +price,
      "quantity": +quantity,
      "image": imgSrc,
      "isActive": available
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: apiLocalPath+'/inventory/products/'+category,
      headers: { 
        'Authorization': 'Bearer '+sessionStorage.getItem('adminAccessToken'), 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
    
    
    
    
    
  }
  function handleSubmit(){
    // console.log("item category->", itemCategory)
    addNewProductApi(itemName, itemPrice, itemQuantity, itemCategory, itemPhoto ,itemAvailable);
    prop.closeAddNewItemModal();
  }

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
            required
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            name="itemPrice"
            label="Product Price"
            variant="filled"
            required
            fullWidth
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <TextField
            name="productQuantity"
            label="Product Quantity"
            variant="filled"
            required
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
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
              onChange={(event) => setItemCategory(event.target.value)}
              // defaultValue={itemAvailable}
            >
              <MenuItem
                value='Fruits'
                sx={{ fontSize: "1.8rem",}}
              >
                Fruits
              </MenuItem>
              <MenuItem value={'Vegetables'} sx={{ fontSize: "1.8rem", }}>
                Vegetables
              </MenuItem>
            </Select>
          </Stack>
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
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