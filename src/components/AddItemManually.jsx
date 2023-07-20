import React, { useEffect } from 'react';
import { Autocomplete,TextField,Button, } from '@mui/material';
import { ShowItemToAddManually } from '../rowData';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { totalProductTableApi } from '../backendApis/AdminApis';
import { useState } from 'react';

// const defaultProps = {
//   options: ShowItemToAddManually.sort((a, b) => {
//     return a.productName < b.productName
//       ? -1
//       : a.productName > b.productName
//       ? 1
//       : 0;
//   }),
//   getOptionLabel: (option) => option.productName,
// };


export default function AddItemManually({setItemManuallyObj, addItemToCart}) {
  // const [totalProductItems, setTotalProductItems]= useState([]);
  // const [isTotalData, setIsTotalData]= useState([]);
  // const [count, setCount]= useState([]);

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
  // useEffect(()=>{
  //   totalProductTableApi(
  //     setIsTotalData,
  //     0,
  //     2000,
  //     setTotalProductItems,
  //     setCount,
  //     '?/'
  //   );
  // },[]);
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
