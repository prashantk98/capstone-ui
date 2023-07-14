import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
  Box,
  FormLabel,
  Autocomplete,
  Stack,
  InputLabel,
} from "@mui/material";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { useEffect } from "react";
import { getCategoriesApi } from "../backendApis/AdminApis";

const addCategoryModalStyle = {
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

export default function AddNewCategory({
  navigateToAddNewCategory,
  openAddItemCategoryModal,
  closeAddNewCategory,
}) {
  // const [openAddNewProductModal, setOpenAddNewProductModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState(false);
  const [category, setCategory] = useState([]);
  const [inputCategory, setInputCategory] = useState("");
  const [itemAvailable, setItemAvailable] = useState(true);

  const defaultProps = {
    options: category,
    getOptionLabel: (option) => option.name || "",
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setError(false);
  };
  function handleAutocompleteChange(event, newValue) {
    setInputCategory(newValue);
  }
  function handleSubmit() {
    console.log(inputCategory);
    // addNewProductApi(itemName, itemPrice, itemQuantity, itemCategory, itemPhoto ,itemAvailable);
    closeAddNewCategory();
  }
  // function getCategories() {
  //   let data = "";

  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: apiLocalPath + "/inventory/category",
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("adminAccessToken"),
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  useEffect(() => {
    getCategoriesApi(setCategory);
  }, []);

  return (
    <>
      <Modal open={openAddItemCategoryModal}>
        <Box sx={addCategoryModalStyle} component="form">
          <Typography>Add New Category </Typography>
          <Autocomplete
            {...defaultProps}
            freeSolo
            value={inputCategory}
            onChange={handleAutocompleteChange}
            id="controllable-states-demo"
            autoSelect
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
          <Stack>
            <InputLabel>Item Available</InputLabel>
            <RadioGroup
              name="itemAvailable"
              value={itemAvailable.toString()}
              onChange={(event) => setItemAvailable(event.target.value === "true")}
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

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="contained" onClick={closeAddNewCategory}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
