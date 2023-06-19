import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
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
      <div className="cart-item" key={prop.index} >
        <img src={prop.item.imgSrc} alt={prop.item.imgSrc} />
        <div className="cart-item__details">
          <h3 className="cart-item__title">{prop.item.title}</h3>
          <p className="cart-item__description">{prop.item.description}</p>
        </div>
        <p className="cart-item__detection-probability" style={{ color: prop.item.probability <= 50 ? 'red' : prop.item.probability <=70 ? 'orange' : 'green' }}>{prop.item.probability}%</p>
        <div className="cart-item__quantity">
          <IconButton size="large" onClick={()=>{
            handleDecrement();
            prop.deleteQuantity(prop.index);
          }}>
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
          <IconButton size="large" onClick={()=>{
            handleIncrement();
            prop.addQuantity(prop.index)
          }}>
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
