import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  
  TablePagination,
  TableFooter,
  Skeleton
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import totalItemInDb, { apiLocalPath } from "../rowData";
// import axios from "axios";
import EditItemDetails from "./EditItemDetails";
// import { notification } from "antd";
import { totalProductTableApi } from "../backendApis/AdminApis";




function TableRowsLoader({ rowsNum,colNum }){
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index} style={{ backgroundColor: index % 2 !== 0 ? 'rgb(207 250 254)' : 'rgb(236 254 255)' }} >
      {
          [...Array(colNum)].map((column,index)=>(
              <TableCell component="th" scope="row" key={index}>
                  <Skeleton animation="wave" variant="text" />
              </TableCell>
          ))
      }
      
    </TableRow>
  ));
};

export default function ShowItemsTable() {
  const [isTotalData, setIsTotalData]= useState(false);
  const [totalProductsArray, setTotalProductsArray] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const [count,setCount]= useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const sortTable = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedData = [...totalProductsArray].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUpwardIcon />
      ) : (
        <ArrowDownwardIcon />
      );
    }
    return null;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // function totalProductApi(rowsPerPage) {
  //   setIsTotalData(false);
  //   const token = sessionStorage.getItem("adminAccessToken");
  //   let config = {
  //     method: "GET",
  //     url: `${apiLocalPath}/inventory/products?page=${page+1}&page_size=${rowsPerPage}`,
  //     // /?next_page_number=${
  //     //   page + 1
  //     // }&page_size=${rowsPerPage}
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   // console.log(config.headers)

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(response.data);
  //       setTotalProductsArray(response.data.results);
  //       setCount(response.data.count);
  //       setIsTotalData(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.code) {
  //         notification.error({
  //           message: error.name,
  //           description: error.message,
  //           placement: 'bottomRight',
  //         });
  //       }
  //       return error;
  //     });
  // } 
  useEffect(() => {
    // console.log(totalProductsArray);
    totalProductTableApi(setIsTotalData,page,rowsPerPage,setTotalProductsArray, setCount);
  }, [page,rowsPerPage,]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          // maxHeight: "40rem",
          // margin: "3rem 0",
          margin: "4rem 0",
        }}
      >
        <Table
          // aria-label="simple table"
          // stickyHeader
          sx={{
            "& thead th": {
              fontWeight: "600",
              color: "black",
              backgroundColor: "#42a5f5",
              fontSize: "1.6rem",
            },
            "& tbody td": {
              fontSize: "1.4rem",
              fontWeight: "500",
            },
            "& tbody tr:hover": {
              backgroundColor: "#fffbf2",
              cursor: "pointer",
              //  fontWeight: '500'
            },
          }}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell
                onClick={() => {
                  sortTable("id");
                  totalProductApi();
                }}
              >
                Id{getSortIcon("id")}
              </TableCell> */}
              <TableCell>Image</TableCell>
              <TableCell onClick={() => sortTable("name")}>
                Name{getSortIcon("name")}
              </TableCell>
              <TableCell onClick={() => sortTable("categories")}>
                Category {getSortIcon("categories")}
              </TableCell>
              <TableCell onClick={() => sortTable("probability")}>
                Probability % {getSortIcon("probability")}{" "}
              </TableCell>
              <TableCell onClick={() => sortTable("price")}>
                Price {getSortIcon("price")}{" "}
              </TableCell>
              <TableCell onClick={() => sortTable("quantity")}>
                Quantity {getSortIcon("quantity")}{" "}
              </TableCell>
              <TableCell onClick={() => sortTable("available")}>
                Available {getSortIcon("available")}{" "}
              </TableCell>
              <TableCell>Edit </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              isTotalData?sortedData.map((current, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    // "&:last-child td, &:last-child th": { border: 0 },
                    "td img": {
                      width: "3.2rem",
                      height: "3.2rem",
                    },
                  }}
                >
                  {/* <TableCell>{index + 1}</TableCell> */}
                  <TableCell>
                    <img
                      src={"data:image/jpeg;base64," + current.image}
                      alt={current.name}
                    />
                  </TableCell>
                  <TableCell>{current.name}</TableCell>
                  <TableCell>{current.categories}</TableCell>

                  <TableCell
                    sx={
                      current.probability * 100 <= 50
                        ? {
                            color: "red",
                          }
                        : current.probability * 100 <= 70
                        ? {
                            color: "orange",
                          }
                        : {
                            color: "green",
                          }
                    }
                  >
                    {
                      (current.probability * 100).toFixed(2)
                      // (Math.random()*50+index).toFixed(2)
                    }
                  </TableCell>
                  <TableCell>{current.price}</TableCell>
                  <TableCell>{current.quantity}</TableCell>
                  <TableCell
                    sx={
                      current.isActive
                        ? {
                            color: "green",
                          }
                        : {
                            color: "red",
                          }
                    }
                  >
                    {current.isActive ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <EditItemDetails currentItem={current} />
                  </TableCell>
                </TableRow>
              );
            })
            :
            <TableRowsLoader 
        rowsNum={rowsPerPage}
        colNum={8}
        ></TableRowsLoader>
          } 
          
          </TableBody>
          <TableFooter>
            <TableRow>
            <TablePagination
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              // rowsPerPageOptions={pages}
              onRowsPerPageChange={handleChangeRowsPerPage}

              sx={
                {
                  '& input, p, div':{
                    fontSize: '1.32rem',
                    minHeight: 'unset'
                  },
                  '& svg':{
                    fontSize: '3rem'
                  }
                }
              }
            />
            </TableRow>
          
          </TableFooter>
        </Table>
        

      </TableContainer>
    </>
  );
}

