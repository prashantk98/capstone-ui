import { notification } from "antd";
import axios from "axios";
import { apiLocalPath } from "../rowData";

export function generateOrderIdApi(setOrderId) {
  console.log('order id created')
  let data = "";
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiLocalPath + "/orders/addNew/",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      // console.log(response.data);

      setOrderId(response.data.data.order.pk);
      sessionStorage.setItem("orderId", response.data.data.order.pk);
      // sessionStorage.clear();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function resetCartApi(orderID,setItems) {
  // console.log(orderID);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: apiLocalPath + "/orders/orderItems/" + orderID,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setItems([]);
      notification.warning({
        message: 'Cart Reset',
        placement: 'bottomRight',
      });
    })
    .catch((error) => {
      console.log(error);
      if(error.response.status===403){
        notification.error({
          message: 'Invalid token',
          description: 'Oops Session expired, Fill the details again',
          placement: "bottomRight",
        });
      }else if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
          placement: "bottomRight",
        });
      }
      return error;
    });
}

export function QuantityApi(itemsArray, index, quantity, setItems) {
  // console.log(itemsArray[index]);
  let data = JSON.stringify({
    productID: itemsArray[index].productID,
    quantity: quantity,
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url:apiLocalPath +"/orders/" +itemsArray[index].orderID +"/" +itemsArray[index].orderItemID,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios.request(config).then((response) => {
    // console.log(itemsArray[index].quantity, response.data.data.quantity)
    itemsArray[index].quantity<response.data.data.quantity? notification.success({
      message: 'Increment in Quantity',
      placement: 'bottomRight',
    }): notification.success({
      message: 'Decrement in Quantity',
      placement: 'bottomRight',
    })
    const newItemsArray = itemsArray.slice();
    Object.assign(newItemsArray[index], response.data.data);
    setItems([...newItemsArray]);
    sessionStorage.setItem("itemsArray", JSON.stringify([...newItemsArray]));
      
    // console.log(itemsArray);  

    }).catch((error) => {
      console.log(error);
      if(error.response.status===403){
        notification.error({
          message: 'Invalid token',
          description: 'Oops Session expired, Fill the details again',
          placement: "bottomRight",
        });
      }else if (error.code) {
        notification.error({
          message: error.name,
          description: error.response.data.error,
          placement: "bottomRight",
        });
      }
      return error;
    });
}

export function addItemToCartApi(productName, quantity, orderID, itemsArray, setItems) {
  let data = JSON.stringify({
    newOrderItem: {
      name: productName,
      quantity: quantity,
    },
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: apiLocalPath + "/orders/" + orderID,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      let indexOfItem = -1;
      for (let index = 0; index < itemsArray.length; index++) {
        if (itemsArray[index].productID === productName) {
          indexOfItem = index;
        }
      }
      if (indexOfItem !== -1) {
        // console.log('This is called')
        // QuantityApi(indexOfItem, itemsArray[indexOfItem].quantity + 1);
        QuantityApi(itemsArray, indexOfItem, itemsArray[indexOfItem].quantity + 1, setItems);
      } else {
        sessionStorage.setItem("itemsArray", JSON.stringify([...itemsArray, response.data.data.available]));
        setItems((prev) => [...prev, response.data.data.available]);
        notification.success({
          message: 'Items Added Successfully',
          placement: 'bottomRight',
        });
      }
      
    })
    .catch((error) => {
      console.log(error);
      if(error.response.status===403){
        notification.error({
          message: 'Invalid token',
          description: 'Oops Session expired, Fill the details again',
          placement: "bottomRight",
        });
      }else if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
          placement: "bottomRight",
        });
      }
      return error;
    });
}

export function removeItemFromCartApi(index, itemsArray, setItems) {
  let data = "";

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url:
      apiLocalPath +
      "/orders/" +
      itemsArray[index].orderID +
      "/" +
      itemsArray[index].orderItemID,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      // console.log(response.data);
      
      sessionStorage.setItem(
        "itemsArray",
        JSON.stringify(
          itemsArray.filter((currentValue, idx) => {
            return idx !== index;
          })
        )
      );
      setItems((prevState) => {
        return prevState.filter((currentValue, idx) => {
          return idx !== index;
        });
      });
      notification.success({
        message: 'Product deleted successfully',
        placement: 'bottomRight',
      })
    })
    .catch((error) => {
      console.log(error);
      if(error.response.status===403){
        notification.error({
          message: 'Invalid token',
          description: 'Oops Session expired, Fill the details again',
          placement: "bottomRight",
        });
      }else if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
          placement: "bottomRight",
        });
      }
      return error;
    });
    
}


export function UpdateCartApi(setIsGotData, base64Image, itemsArray, orderID, setItems, setUnAvailable, setOpenUnAvailableModal, setUploadItemPhoto) {
    setIsGotData(false);
    let data = JSON.stringify({
      image: base64Image,
      existingOrderItems: itemsArray,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: apiLocalPath + "/orders/" + orderID,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios.request(config).then((response) => {
        setIsGotData(true);
        console.log(response.data);
        setItems([...response.data.available]);
        sessionStorage.setItem("itemsArray",JSON.stringify([...response.data.available]));
        if (response.data.unavailable.length !== 0) {
          setUnAvailable([...response.data.unavailable]);
          setOpenUnAvailableModal(true);
        }
        setUploadItemPhoto(null);
        notification.success({
          message: 'Items Added Successfully',
          placement: 'bottomRight',
        });
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status===403){
          notification.error({
            message: 'Invalid token',
            description: 'Oops Session expired, Fill the details again',
            placement: "bottomRight",
          });
        }else if (error.code) {
          notification.error({
            message: error.name,
            description: error.message,
            placement: "bottomRight",
          });
        }
        return error;
      });
  }
