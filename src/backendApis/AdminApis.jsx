import { notification } from "antd";
import axios from "axios";
import { apiLocalPath } from "../rowData";

export function totalProductApi(setIsGotData, setTotalItemInDb) {
  setIsGotData(false);
  const token = sessionStorage.getItem("adminAccessToken");
  let config = {
    method: "GET",
    url: `${apiLocalPath}/inventory/products?page=${0}&page_size=2000`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      setTotalItemInDb(response.data.results);
      setIsGotData(true);
    })
    .catch((error) => {
      console.log(error);
      if (error.code) {
        notification.error({
          message: error.message,
          description: error.resonse.data.details,
          placement: 'bottomRight',
        });
      }
      return error;
    });
}

export function addNewProductApi(name,price,quantity,category,imgSrc,available){
  let data = JSON.stringify({
    "name": name,
    "price": +price,
    "quantity": +quantity,
    "image": imgSrc,
    "isActive": available
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: apiLocalPath+'/inventory/products/'+category,
    headers: { 
      'Authorization': 'Bearer '+sessionStorage.getItem('adminAccessToken'), 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    // setIsChanged(true);
    notification.success({
      message: name+' Added Successfully',
      placement: 'bottomRight',
    });
  })
  .catch((error) => {
    console.log(error);
    if (error.code) {
      notification.error({
        message: error.code,
        description: 'Check the form and fill all details',
        placement: 'bottomRight',
      });
    }
    return error;
  }); 
  
}

export function getCategoriesApi(setCategory) {
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
      setCategory(response.data.results)
    })
    .catch((error) => {
      console.log(error);
      if (error.code) {
        notification.error({
          message: error.code,
          description: error.message,
          placement: 'bottomRight',
        });
      }
      return error;
    });
}

export function totalProductTableApi(setIsTotalData,page,rowsPerPage,setTotalProductsArray, setCount,tableCategory) {
  setIsTotalData(false);
  const token = sessionStorage.getItem("adminAccessToken");
  let config = {
    method: "GET",
    url: `${apiLocalPath}/inventory/products${tableCategory}?page=${page+1}&page_size=${rowsPerPage}`,
    // /?next_page_number=${
    //   page + 1
    // }&page_size=${rowsPerPage}
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  // console.log(config.headers)

  axios
    .request(config)
    .then((response) => {
      // console.log(response.data);
      setTotalProductsArray(response.data.results);
      setCount(response.data.count);
      setIsTotalData(true);
    })
    .catch((error) => {
      console.log(error);
      if (error.code) {
        notification.error({
          message: error.message,
          description: error.resonse.data.details,
          placement: 'bottomRight',
        });
      }
      return error;
    });
} 
export function editProductDetailsApi(productName, productPrice, productQuantity, productCategory, productAvailable, productPhoto, currentItem) {
  let data = JSON.stringify({
    categories: productCategory,
    image: productPhoto,
    isActive: productAvailable,
    name: productName,
    price: +productPrice,
    quantity: +productQuantity,
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: apiLocalPath + "/inventory/updateProducts/" + currentItem.name,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("adminAccessToken"),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
          placement: "bottomRight",
        });
      }
      return error;
    });
}