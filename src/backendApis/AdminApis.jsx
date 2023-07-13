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
  })
  .catch((error) => {
    console.log(error);
  }); 
  
}

export function getCategoriesApi() {
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
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export function totalProductTableApi(setIsTotalData,page,rowsPerPage,setTotalProductsArray, setCount) {
  setIsTotalData(false);
  const token = sessionStorage.getItem("adminAccessToken");
  let config = {
    method: "GET",
    url: `${apiLocalPath}/inventory/products?page=${page+1}&page_size=${rowsPerPage}`,
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
      console.log(response.data);
      setTotalProductsArray(response.data.results);
      setCount(response.data.count);
      setIsTotalData(true);
    })
    .catch((error) => {
      console.log(error);
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
          placement: 'bottomRight',
        });
      }
      return error;
    });
} 