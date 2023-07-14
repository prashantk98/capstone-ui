import React from 'react';
// import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Autocomplete,TextField,Button, } from '@mui/material';
// import { useState } from 'react';
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

export default function AddItemManually({setItemManuallyObj, addItemToCart}) {
  return (
    <>
     <div className="cart__input">
              <Autocomplete
                {...defaultProps}
                onChange={(event, newValue) => {
                  setItemManuallyObj(newValue);
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
                onClick={addItemToCart}
                sx={{
                  "&, & svg": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                Add
              </Button>
            </div>
    </>
  )
}
