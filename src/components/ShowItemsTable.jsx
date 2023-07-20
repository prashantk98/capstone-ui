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
  Skeleton,
  Select,
  MenuItem,
  InputLabel,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditItemDetails from "./EditItemDetails";
import { totalProductTableApi } from "../backendApis/AdminApis";

function TableRowsLoader({ rowsNum, colNum }) {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow
      key={index}
      style={{
        backgroundColor:
          index % 2 !== 0 ? "rgb(207 250 254)" : "rgb(236 254 255)",
      }}
    >
      {[...Array(colNum)].map((column, index) => (
        <TableCell component="th" scope="row" key={index}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
}

export default function ShowItemsTable({
  totalProductsArray,
  setTotalProductsArray,
  rowsPerPage,
  setRowsPerPage,
  isDataChanged,
  setIsDataChanged,
}) {
  const [isTotalData, setIsTotalData] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tableCategory, setTableCategory] = useState("/Fruits");
  const [tableCategoryListOpen, setTableCategoryListOpen] = useState(false);

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
    setIsDataChanged(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setIsDataChanged(true);
  };
  useEffect(() => {
    if (isDataChanged) {
      totalProductTableApi(
        setIsTotalData,
        page,
        rowsPerPage,
        setTotalProductsArray,
        setCount,
        tableCategory
      );
      setIsDataChanged(false);
    }
  }, [page, rowsPerPage, tableCategory]);

  return (
    <div style={{ position: "relative", paddingTop: "5rem", width: "100%" }}>
      <Stack
        sx={{
          position: "absolute",
          right: "0",
          zIndex: "1",
          top: "2rem",
          display: "inline",
        }}
      >
        <InputLabel sx={{ fontSize: "1.8rem", m: "0 2rem", display: "inline" }}>
          Select the Category
        </InputLabel>
        <Select
          // multiple
          value={tableCategory}
          onChange={(e) => {
            setTableCategory(e.target.value);
            setIsDataChanged(true);
            setPage(0);
          }}
          open={tableCategoryListOpen}
          onOpen={() => setTableCategoryListOpen(true)}
          onClose={() => setTableCategoryListOpen(false)}
          sx={{
            fontSize: "1.6rem",
            "& .MuiSelect-select": {
              padding: ".8rem 1.2rem",
              minWidth: "5rem",
            },
          }}
        >
          <MenuItem value="/Fruits">Fruit</MenuItem>
          <MenuItem value="/Vegetables">Vegetable</MenuItem>
          <MenuItem value="?/">All</MenuItem>
        </Select>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          // maxHeight: "40rem",
          // margin: "3rem 0",
          margin: "4rem 0",
          position: "relative",
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
            {isTotalData ? (
              sortedData.map((current, index) => {
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
                      <EditItemDetails
                        currentItem={current}
                        setRowsPerPage={setRowsPerPage}
                        setIsDataChanged={setIsDataChanged}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRowsLoader
                rowsNum={rowsPerPage}
                colNum={8}
              ></TableRowsLoader>
            )}
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
                sx={{
                  "& input, p, div": {
                    fontSize: "1.32rem",
                    minHeight: "unset",
                  },
                  "& svg": {
                    fontSize: "3rem",
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
