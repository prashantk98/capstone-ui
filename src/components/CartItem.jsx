import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// import DeleteIcon from '@mui/icons-material/Delete';
import banana from "../images/Banana.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

export default function CartItem(prop) {
  const [value, setValue] = useState(prop.item.qty);
  const handleIncrement = () => {
    setValue(+value + 1);
    // prop.qty-=1;
  };

  const handleDecrement = () => {
    if (value > 1) {
      setValue(+value - 1);
      // prop.qty-=1;
    } 
  };

  return (
    <>
      {/* <div className="cart-item" id={prop.id} >
        <img src={banana} alt="banana " />
        <div className="cart-item__details">
          <h3 className="cart-item__title">{prop.title}</h3>
          <p className="cart-item__description">{prop.description}</p>
        </div>
        <div className="cart-item__quantity">
          <IconButton size="large" onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <input
            type="number"
            min="1"
            value={value}
            onWheel={(e) => e.target.blur()}
            onChange={(event) => {
              setValue(Math.floor(event.target.value));
              if (+value <= 0) {
                event.target.value = 1;
                setValue(1);
              }
            }}
          />
          <IconButton size="large" onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </div>
        <p className="cart-item__price">₹{value * prop.price}</p>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            prop.onSelect(prop.id);
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div> */}

      <div className="cart-item" key={prop.index} >
        <img src={banana} alt="banana " />
        <div className="cart-item__details">
          <h3 className="cart-item__title">{prop.item.title}</h3>
          <p className="cart-item__description">{prop.item.description}</p>
        </div>
        <div className="cart-item__quantity">
          <IconButton size="large" onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <input
            type="number"
            min="1"
            height='2rem'
            value={value}
            onWheel={(e) => e.target.blur()}
            onChange={(event) => {
              setValue(Math.floor(event.target.value));
              if (+value <= 0) {
                event.target.value = 1;
                setValue(1);
              }
            }}
          />
          <IconButton size="large" onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </div>
        <p className="cart-item__price">₹{value * prop.item.price}</p>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            prop.removeItemFromCart(prop.index);
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </>
  );
}

// import React, { useState } from 'react';
// import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';


// export default function CartItem(prop){
//     return<>
//   <ListItem key={prop.index}>
//       <ListItemText primary={prop.item.title} />
//       <ListItemText secondary={prop.item.description}/>
//       <ListItemText secondary={prop.item.price} />
//       <ListItemText secondary={prop.item.qty} />
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={() => {
//           prop.removeItemFromCart(prop.index)
//         }}
//       >
//         Delete
//       </Button>
//     </ListItem>
//       </>
    
// }
