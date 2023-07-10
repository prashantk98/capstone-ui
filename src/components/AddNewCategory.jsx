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
  FormLabel,
  Autocomplete,
} from "@mui/material";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { apiLocalPath } from "../rowData";
import { useEffect } from "react";

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

export default function AddNewCategory(prop) {
  // const [openAddNewProductModal, setOpenAddNewProductModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState(false);
  const [category, setCategory] = useState([]);
  const [inputCategory, setInputCategory] = useState("");

  const defaultProps = {
    options: category.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    }),
    getOptionLabel: (option) => (option.name || ""),
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setError(false);
  };

  function handleSubmit() {
    console.log(category,inputCategory)
    // addNewProductApi(itemName, itemPrice, itemQuantity, itemCategory, itemPhoto ,itemAvailable);
    prop.closeAddNewCategory();
  }
  function getCategories() {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: apiLocalPath + "/inventory/category",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("adminAccessToken"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(()=>{
    getCategories();
  },[])

  return (
    <>
      <Modal open={prop.openAddItemCategoryModal}>
        <Box sx={addCategoryModalStyle} component="form">
          <Typography>Add New Category </Typography>

          <Autocomplete
            value={category}
            onChange={(event, newValue) => {
              setCategory(newValue);
            }}
            inputValue={inputCategory}
            onInputChange={(event, newInputValue) => {
              setInputCategory(newInputValue);
            }}
            id="controllable-states-demo"
            {...defaultProps}
            // options={options}
            // sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="filled" />
            )}
          />
          <FormLabel id="demo-controlled-radio-buttons-group">
            Category is Active or not
          </FormLabel>
          <RadioGroup
            name="radio-buttons"
            value={selectedValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="option1"
              control={
                <Radio
                  sx={{
                    borderRadius: "0",
                    "& .MuiSvgIcon-root": {
                      borderRadius: "0",
                      borderColor:
                        selectedValue === "option1" ? "green" : "currentColor",
                    },
                  }}
                />
              }
              label="Option 1"
            />
            <FormControlLabel
              value="option2"
              control={
                <Radio
                  sx={{
                    borderRadius: "0",
                    "& .MuiSvgIcon-root": {
                      borderRadius: "0",
                      borderColor:
                        selectedValue === "option2" ? "green" : "currentColor",
                    },
                  }}
                />
              }
              label="Option 2"
            />
            <FormControlLabel
              value="option3"
              control={
                <Radio
                  sx={{
                    borderRadius: "0",
                    "& .MuiSvgIcon-root": {
                      borderRadius: "0",
                      borderColor:
                        selectedValue === "option3" ? "green" : "currentColor",
                    },
                  }}
                />
              }
              label="Option 3"
            />
          </RadioGroup>
          {error && <FormHelperText>Please select an option.</FormHelperText>}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="contained" onClick={prop.closeAddNewCategory}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
