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









// import { useState } from "react";
// import {
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   Modal,
//   Box,
//   Select,
//   MenuItem,
//   InputLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { addNewProductApi } from "../backendApis/AdminApis";

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

// export default function AddNewProduct({
//   navigateToAddNewItem,
//   openAddNewProductModal,
//   closeAddNewItemModal,
//   // setIsChanged
// }) {
//   const [itemName, setItemName] = useState("");
//   const [itemPrice, setItemPrice] = useState("");
//   const [itemCategory, setItemCategory] = useState("");
//   const [itemAvailable, setItemAvailable] = useState(true);
//   const [itemPhoto, setItemPhoto] = useState(null);
//   const [itemQuantity, setItemQuantity] = useState("");

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //       const imageData = base64String.split(",")[1];
  //       setItemPhoto(imageData);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   // e.target.value = null;
  // };

//   // function addNewProductApi(name,price,quantity,category,imgSrc,available){
//   //   let data = JSON.stringify({
//   //     "name": name,
//   //     "price": +price,
//   //     "quantity": +quantity,
//   //     "image": imgSrc,
//   //     "isActive": available
//   //   });

//   //   let config = {
//   //     method: 'post',
//   //     maxBodyLength: Infinity,
//   //     url: apiLocalPath+'/inventory/products/'+category,
//   //     headers: {
//   //       'Authorization': 'Bearer '+sessionStorage.getItem('adminAccessToken'),
//   //       'Content-Type': 'application/json'
//   //     },
//   //     data : data
//   //   };

//   //   axios.request(config)
//   //   .then((response) => {
//   //     console.log(JSON.stringify(response.data));
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });

//   // }
//   function handleSubmit() {
//     // console.log("item category->", itemCategory)
//     addNewProductApi(
//       itemName,
//       itemPrice,
//       itemQuantity,
//       itemCategory,
//       itemPhoto,
//       itemAvailable,
//       // setIsChanged
//     );
//     setItemName("");
//     setItemPrice("");
//     setItemCategory("");
//     setItemAvailable("");
//     setItemPhoto(null);
//     setItemQuantity(1);
//     closeAddNewItemModal();
//   }

//   return (
//     <>
      // <Button
      //   variant="outlined"
      //   sx={{
      //     fontSize: "1.8rem",
      //   }}
      //   onClick={navigateToAddNewItem}
      // >
      //   Add New Product
      // </Button>
//       <Modal
//         open={openAddNewProductModal}
//         //  onClose={() => setOpenAddItemModal(false)}
//       >
//         <Box sx={addItemModalStyle} component="form">
//           <Typography>Add New Product </Typography>

//           <TextField
//             name="itemName"
//             label="Item Name"
//             variant="filled"
//             required
//             fullWidth
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//           />
//           <TextField
//             name="itemPrice"
//             label="Product Price"
//             variant="filled"
//             required
//             fullWidth
//             value={itemPrice}
//             onChange={(e) => setItemPrice(e.target.value)}
//           />
//           <TextField
//             name="productQuantity"
//             label="Product Quantity"
//             variant="filled"
//             required
//             fullWidth
//             value={itemQuantity}
//             onChange={(e) => setItemQuantity(e.target.value)}
//           />
//           <Stack>
//             <InputLabel id="demo-simple-select-standard-label">
//               Item Category
//             </InputLabel>
//             <Select
//               name="itemCategory"
//               label="Item Category"
//               variant="filled"
//               value={itemCategory}
//               onChange={(event) => setItemCategory(event.target.value)}
//               // defaultValue={itemAvailable}
//             >
//               <MenuItem value="Fruits" sx={{ fontSize: "1.8rem" }}>
//                 Fruits
//               </MenuItem>
//               <MenuItem value={"Vegetables"} sx={{ fontSize: "1.8rem" }}>
//                 Vegetables
//               </MenuItem>
//             </Select>
//           </Stack>
//           <Stack>
//             <InputLabel >Item Available</InputLabel>
//             <RadioGroup
//               name="itemAvailable"
//               value={itemAvailable}
//               onChange={(event) => setItemAvailable(event.target.value)}
//               row
//             >
//               <FormControlLabel
//                 value={true}
//                 control={<Radio color="success" />}
//                 label="Yes"
//               />
//               <FormControlLabel
//                 value={false}
//                 control={<Radio color="success" />}
//                 label="No"
//               />
//             </RadioGroup>
//             {/* </FormControl> */}
//           </Stack>
//           <input type="file" accept="image/*" onChange={handlePhotoChange} />
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//           <Button variant="contained" onClick={closeAddNewItemModal}>
//             Cancel
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// }



// export default function AddNewProduct({navigateToAddNewItem, openAddNewProductModal, closeAddNewItemModal}) {
//   const [itemName, setItemName] = useState("");
//   const [itemPrice, setItemPrice] = useState("");
//   const [itemCategory, setItemCategory] = useState("");
//   const [itemAvailable, setItemAvailable] = useState(true);
//   const [itemPhoto, setItemPhoto] = useState(null);
//   const [itemQuantity, setItemQuantity] = useState("");

//   const [itemNameError, setItemNameError] = useState(false);
//   const [itemPriceError, setItemPriceError] = useState(false);
//   const [itemCategoryError, setItemCategoryError] = useState(false);

  // function handlePhotoChange(e){
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //       const imageData = base64String.split(",")[1];
  //       setItemPhoto(imageData);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   // e.target.value = null;
  // };

//   function handleSubmit() {
//     // Validate form fields
//     let isValid = true;

//     if (!itemName) {
//       setItemNameError(true);
//       isValid = false;
//     } else {
//       setItemNameError(false);
//     }

//     if (!itemPrice) {
//       setItemPriceError(true);
//       isValid = false;
//     } else {
//       setItemPriceError(false);
//     }

//     if (!itemCategory) {
//       setItemCategoryError(true);
//       isValid = false;
//     } else {
//       setItemCategoryError(false);
//     }

//     if (isValid) {
//       // Perform form submission
//       addNewProductApi(itemName, itemPrice, itemQuantity, itemCategory, itemPhoto, itemAvailable);
//       // Reset form fields
//       resetFormFields();
//       closeAddNewItemModal();
//     }
//   }

//   function resetFormFields() {
//     setItemName("");
//     setItemPrice("");
//     setItemCategory("");
//     setItemAvailable(true);
//     setItemPhoto(null);
//     setItemQuantity("");
//     setItemNameError(false);
//     setItemPriceError(false);
//     setItemCategoryError(false);
//   }

//   return (
//     <>
//       {/* Add New Product button */}
//       <Button
//         variant="outlined"
//         sx={{
//           fontSize: "1.8rem",
//         }}
//         onClick={navigateToAddNewItem}
//       >
//         Add New Product
//       </Button>
//       <Modal open={openAddNewProductModal}>
//         <Box sx={addItemModalStyle}>
//           {/* Modal content */}
//           <Typography>Add New Product</Typography>

//           <TextField
//             name="itemName"
//             label="Item Name"
//             variant="filled"
//             required
//             fullWidth
//             value={itemName}
//             onChange={(e) => {
//               setItemName(e.target.value);
//               setItemNameError(false); // Clear error state when user starts filling the field
//             }}
//             error={itemNameError}
//             helperText={itemNameError && "Item Name is required"}
//           />

//           <TextField
//             name="itemPrice"
//             label="Product Price"
//             variant="filled"
//             required
//             fullWidth
//             value={itemPrice}
//             onChange={(e) => {
//               setItemPrice(e.target.value);
//               setItemPriceError(false); // Clear error state when user starts filling the field
//             }}
//             error={itemPriceError}
//             helperText={itemPriceError && "Product Price is required"}
//           />
//           <TextField
//             name="productQuantity"
//             label="Product Quantity"
//             variant="filled"
//             required
//             fullWidth
//             value={itemQuantity}
//             onChange={(e) => setItemQuantity(e.target.value)}
//           />

//           <Stack>
//             <InputLabel id="demo-simple-select-standard-label">
//               Item Category
//             </InputLabel>
//             <Select
//               name="itemCategory"
//               label="Item Category"
//               variant="filled"
//               value={itemCategory}
//               onChange={(event) => {
//                 setItemCategory(event.target.value);
//                 setItemCategoryError(false); // Clear error state when user starts filling the field
//               }}
//               error={itemCategoryError}
//               helperText={itemCategoryError && "Item Category is required"}
//             >
//               <MenuItem value="Fruits" sx={{ fontSize: "1.8rem" }}>
//                 Fruits
//               </MenuItem>
//               <MenuItem value={"Vegetables"} sx={{ fontSize: "1.8rem" }}>
//                 Vegetables
//               </MenuItem>
//             </Select>
//           </Stack>

//           <Stack>
//             <InputLabel>Item Available</InputLabel>
//             <RadioGroup
//               name="itemAvailable"
//               value={itemAvailable.toString()}
//               onChange={(event) => setItemAvailable(event.target.value === "true")}
//               row
//             >
//               <FormControlLabel
//                 value="true"
//                 control={<Radio color="success" />}
//                 label="Yes"
//               />
//               <FormControlLabel
//                 value="false"
//                 control={<Radio color="success" />}
//                 label="No"
//               />
//             </RadioGroup>
//           </Stack>

//           {/* File input */}
//           {/* Submit and Cancel buttons */}
//           <input type="file" accept="image/*" onChange={handlePhotoChange} />
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Submit</Button>
//             <Button variant="contained" 
//             onClick={()=>{
//               closeAddNewItemModal();
//               resetFormFields();
//             }}
//               >Cancel</Button>
//         </Box>
//       </Modal>
//     </>
//   );
// }

export default function AddNewProduct({
  navigateToAddNewItem,
  openAddNewProductModal,
  closeAddNewItemModal,
  setRowsPerPage
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
      // Perform form submission
      addNewProductApi(itemName, itemPrice, itemQuantity, itemCategory, itemPhoto, itemAvailable);
      // Reset form fields
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
      {/* Add New Product button */}

      <Button
        variant="outlined"
        sx={{
          fontSize: "1.8rem",
        }}
        onClick={navigateToAddNewItem}
      >       Add New Product </Button>
      <Modal open={openAddNewProductModal}>
        <Box sx={addItemModalStyle}>
          {/* Modal content */}
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
              setItemNameError(false); // Clear error state when user starts filling the field
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
                setItemCategoryError(false); // Clear error state when user starts filling the field
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
