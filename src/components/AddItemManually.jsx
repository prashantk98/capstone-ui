import React from 'react';
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Autocomplete,TextField,Button,Snackbar, } from '@mui/material';
import { useState } from 'react';
import { ShowItemToAddManually } from '../rowData';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const defaultProps = {
  options: ShowItemToAddManually.sort((a, b) => {
    return a.productName < b.productName
      ? -1
      : a.productName > b.productName
      ? 1
      : 0;
  }),
  getOptionLabel: (option) => option.productName,
};

export default function AddItemManually(prop) {
  const [openAddItemToCartSnackbar, setOpenAddItemToCartSnackbar] = useState(false);
  return (
    <>
     <div className="cart__input">
              <Autocomplete
                {...defaultProps}
                onChange={(event, newValue) => {
                  prop.setItemManuallyObj(newValue);
                }}
                autoHighlight
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add item manually"
                    variant="standard"
                    sx={{
                      "&": {
                        // backgroundColor: 'white',
                        // height:'3rem'
                      },
                      "& label": {
                        fontSize: "1.8rem",
                      },
                    }}
                  />
                )}
                sx={{
                  width: "40%",
                }}
              />

              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={prop.addItemToCart}
                sx={{
                  "&, & svg": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                Add
                <Snackbar
                  open={openAddItemToCartSnackbar}
                  autoHideDuration={4000}
                  onClose={() => setOpenAddItemToCartSnackbar(false)}
                  message={
                    <>
                      <InfoOutlined /> Select The Item for Add To Cart
                    </>
                  }
                  sx={{
                    position: "relative",
                    "& .MuiPaper-root ": {
                      background: "orange",
                      position: "absolute",
                      bottom: "-11rem",
                      right: "35rem",
                      justifyContent: 'center'
                    },
                    "& .MuiSnackbarContent-message": {
                      fontSize: "1.2rem",
                      padding: "0",
                    },
                    "& svg": {
                      fontSize: "1.6rem",
                      verticalAlign: "middle",
                    },
                  }}
                />
              </Button>
            </div>
    </>
  )
}
