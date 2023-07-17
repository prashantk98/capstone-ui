import { notification } from "antd";
import axios from "axios";
import { apiLocalPath } from "../rowData";
// import { useNavigate } from "react-router-dom";


export function userPresentApi(value, setIsUserNameFound, setAccessToken, setName, setNumber) {
  let data = JSON.stringify({
    phoneNumber: value,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiLocalPath + "/auth/user/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      setIsUserNameFound(true);
      setAccessToken(response.data.token);
      setName(response.data.username);
      setNumber(value);
      sessionStorage.setItem('isUserFound', true)
    })
    .catch((error) => {
      console.error("user not found");
      setIsUserNameFound(false);
      sessionStorage.setItem('isUserFound', false)
      // if (error.code) {
      //   notification.error({
      //     message: error.name,
      //     description: error.message,
      //     placement: 'bottomRight',
      //   });
      // }
      // return error;
    });
}

export function newUserApi(name, number,setAccessToken) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: name,
    phoneNumber: number,
    created_by: "Omesh",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // const navigate = useNavigate();

  return fetch(apiLocalPath + "/signup/user/", requestOptions);
  //   .then((response) => response.text())
  //   .then((result) => {
  //     return new Promise((resolve, reject) => {
  //       result = JSON.parse(result);
  //       console.log(result);
  //       setAccessToken(result.token);
  //       sessionStorage.setItem("userName", name);
  //       sessionStorage.setItem("userMobile", number);
  //       sessionStorage.setItem("accessToken", result.token);
  //       window.location.href= '/ncart';
  //       resolve();
  //     })
  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  //     if (error.code) {
  //       notification.error({
  //         message: error.name,
  //         description: error.message,
  //         placement: 'bottomRight',
  //       });
  //     }
  //     return error;
      
  // });
}

// export async function newUserApi(name, number, setAccessToken) {
//   try {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({
//       name: name,
//       phoneNumber: number,
//       created_by: "Omesh",
//     });

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     const response = await fetch(apiLocalPath + "/signup/user/", requestOptions);
//     const result = await response.json();
//     console.log(result);

//     setAccessToken(result.token);
//     sessionStorage.setItem("userName", name);
//     sessionStorage.setItem("userMobile", number);
//     sessionStorage.setItem("accessToken", result.token);
//   } catch (error) {
//     console.log("error", error);
//     if (error.code) {
//       notification.error({
//         message: error.name,
//         description: error.message,
//         placement: 'bottomRight',
//       });
//     }
//     return error;
//   }
// }
