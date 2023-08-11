import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Stack, Typography, tooltipClasses } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { removeItemFromCartApi } from "../backendApis/NcartApis";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1.2rem",
    display: 'block',
    padding: '8px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
    
  },
}));

export default function CartItem(props) {
  const quantityValue=props.item.quantity;
  const [value, setValue] = useState(+quantityValue);

  return (
    <>
      <div className="cart-item" key={props.index}>
        <img
          src={"data:image/jpeg;base64," + props.item.imgSrc}
          alt={props.item.imgSrc}
        />
        <div className="cart-item__details">
          <h3 className="cart-item__title">{props.item.productName}</h3>
          <p className="cart-item__description">
            Description Of {props.item.productName}
          </p>
        </div>
        <Stack direction={'row'} spacing={1}>
        <LightTooltip
          title={
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              alignItems={"center"}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "1.2rem",
                  position: "relative",
                },
              }}
            >Product Probability %
              <Typography
                sx={{
                    color: "red",
                    margin: "0 .4rem",
                }}
              >
                0-50
              </Typography>
              <Typography
                sx={{
                    color: "orange",
                    margin: "0 .4rem",
                }}
              >
                51-70
              </Typography>
              <Typography
                color={"green"}
                sx={{
                    color: "green",
                    margin: "0 .4rem",
                }}
              >
                71-100
              </Typography>
            </Stack>
          }
          arrow
        >
         <InfoOutlinedIcon sx={{'&':{color: 'rgba(0, 0, 0, 0.367)'}, '&:hover':{cursor: 'pointer'}}}/>
          
        </LightTooltip>
        <p
            className="cart-item__detection-probability"
            style={{
              color:
                props.item.probability * 100 <= 50
                  ? "red"
                  : props.item.probability * 100 <= 70
                  ? "orange"
                  : "green",
            }}
          >
            {Math.floor(props.item.probability * 100)}% 
          </p>
        </Stack>
        
        <div className="cart-item__quantity">
          <IconButton
            size="large"
            onClick={() => {
              props.handleDecrement(props.index);
            }}
          >
            <RemoveIcon />
          </IconButton>
          <input
            type="number"
            min="1"
            height="2rem"
            // value={props.item.quantity}
            value={props.item.quantity}
            onWheel={(e) => e.target.blur()}
            onChange={(event) => {
              setValue((preValue)=>{
                return event.target.value;
              })
              if (+value <= 0) {
                event.target.value = 1;
                setValue(1);
              }
            }}
          />
          <IconButton
            size="large"
            onClick={() => {
              props.handleIncrement(props.index);
            }}
          >
            <AddIcon />
          </IconButton>
        </div>

        {/* <p className="cart-item__price">₹{value * props.item.price}</p> */}
        <p className="cart-item__price">₹{ props.item.total}</p>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            removeItemFromCartApi(props.index, props.itemsArray, props.setItems);
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </>
  );
}
