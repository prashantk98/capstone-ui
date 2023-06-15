import { Stack, Typography,List, ListItem,ListItemText,Button,TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CartItem from "../components/CartItem";
// import { totalItemsGlobal,itemsArrayGlobal } from "./Ncart";
import Ncart from "./Ncart";
import { useState } from "react";


export default function Bill(){
  const [inputText, setInputText] = useState('');
  const [cartItems, setCartItems] = useState(cartObject);

  const addItemToCart = () => {
    if (inputText.trim() !== '') {
      const obj = {
        title: inputText,
      description: ` description of ${inputText}`,
      price: 93.0,
      qty: Math.floor(Math.random() * 8) + 1,
      }
      setCartItems([...cartItems, obj]);
      setInputText('');
    }

    console.log(cartItems);
  };

  const removeItemFromCart = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  return (
    <>
    <Stack>
      <Typography>you have {Ncart.itemsArray} items in your cart</Typography>
      <TextField
        label="Item name"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={addItemToCart}>
        Add to Cart
      </Button>
      <List>

        {cartItems.map((item, index) => (
          // <ListItem key={index}>
          //   <ListItemText primary={item.title} />
          //   <ListItemText secondary={item.description}/>
          //   <ListItemText secondary={item.price} />
          //   <ListItemText secondary={item.qty} />
          //   <Button
          //     variant="contained"
          //     color="secondary"
          //     onClick={() => removeItemFromCart(index)}
          //   >
          //     Delete
          //   </Button>
          // </ListItem>
          <CartItem
          index = {index}
          item = {item}
          removeItemFromCart ={removeItemFromCart}
          ></CartItem>
        ))
        }
      </List>
    </Stack>
    </>
  );
}

const cartObject = [
  {
    title: "Lorem Item1",
    description: "Lorem Item description",
    price: 190.0,
    qty: 1,
  },
  {
    title: "Lorem Item2",
    description: "Lorem Item description",
    price: 90.0,
    qty: 2,
  },
  {
    title: "Lorem Item3",
    description: "Lorem Item description",
    price: 93.0,
    qty: 1,
  },
  {
    title: "Lorem Item4",
    description: "Lorem Item description",
    price: 32.0,
    qty: 3,
  },
  {
    title: "Lorem Item5",
    description: "Lorem Item description",
    price: 93.0,
    qty: Math.floor(Math.random() * 8) + 1,
  }
];