import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Stack, Typography, tooltipClasses } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from "react";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.white,
    backgroundColor: 'white',
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1.2rem",
    display: 'block',
    // fontSize: '14px',
    padding: '4px 8px 1.6rem',
    borderRadius: '4px',
    // maxWidth: '250px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
    
  },
}));

export default function CartItem(prop) {
  // const [value, setValue] = useState(prop.item.qty);
  const quantityValue=prop.item.quantity;
  const [value, setValue] = useState(+quantityValue);
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
      {/* <div className="cart-item" key={prop.index} >
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
      </div> */}

      <div className="cart-item" key={prop.index}>
        <img
          src={"data:image/jpeg;base64," + prop.item.imgSrc}
          alt={prop.item.imgSrc}
        />
        <div className="cart-item__details">
          <h3 className="cart-item__title">{prop.item.productName}</h3>
          <p className="cart-item__description">
            Description Of {prop.item.productName}
          </p>
        </div>
        <Stack direction={'row'} spacing={1}>
        <LightTooltip
          title={
            <Stack
              direction={"column"}
              // spacing={2}
              // width={'50rem'}
              justifyContent={"space-around"}
              alignItems={"center"}
              mt={2}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "1.2rem",
                  position: "relative",
                },
                // ".MuiTypography-root:: after": {
                //   content: "''",
                //   position: "absolute",
                //   top: "-.2rem",
                //   right: "-3.2rem",
                //   width: "3rem",
                //   height: "3rem",
                //   borderRadius: "50%",
                // },
              }}
            >Product Probability %
              <Typography
                sx={{
                  // "&::after": {
                  //   background: "red",
                  // },
                  "&": {
                    color: "red",
                    margin: "0 .4rem",
                  },
                }}
              >
               
                0-50
              </Typography>
              <Typography
                sx={{
                  // "&::after": {
                  //   background: "orange",
                  // },
                  "&": {
                    color: "orange",
                    margin: "0 .4rem",
                  },
                }}
              >
                51-70
              </Typography>
              <Typography
                color={"green"}
                sx={{
                  // "&::after": {
                  //   background: "green",
                  // },
                  "&": {
                    color: "green",
                    margin: "0 .4rem",
                    
                  },
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
                prop.item.probability * 100 <= 50
                  ? "red"
                  : prop.item.probability * 100 <= 70
                  ? "orange"
                  : "green",
            }}
          >
            {Math.floor(prop.item.probability * 100)}% 
          </p>
        </Stack>
        
        <div className="cart-item__quantity">
          <IconButton
            size="large"
            onClick={() => {
              handleDecrement();
              prop.deleteQuantity(prop.index);
            }}
          >
            <RemoveIcon />
          </IconButton>
          <input
            type="number"
            min="1"
            height="2rem"
            value={prop.item.quantity}
            onWheel={(e) => e.target.blur()}
            onChange={(event) => {
              setValue(Math.floor(event.target.value));
              if (+value <= 0) {
                event.target.value = 1;
                setValue(1);
              }
              prop.changeQuantity(prop.index, value);
            }}
          />
          <IconButton
            size="large"
            onClick={() => {
              handleIncrement();
              prop.addQuantity(prop.index);
            }}
          >
            <AddIcon />
          </IconButton>
        </div>

        {/* <p className="cart-item__price">₹{value * prop.item.price}</p> */}
        <p className="cart-item__price">₹{ prop.item.total}</p>
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
