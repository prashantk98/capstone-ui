import axios from "axios";
import { apiLocalPath } from "../rowData";

export function paymentApi(price) {
  let data = JSON.stringify({
    orderID: sessionStorage.getItem("orderId"),
    amount: price,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiLocalPath + "/payments/addNew/",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
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