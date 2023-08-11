import {
  Box,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import ReactEcharts from "echarts-for-react";
import { useState, useEffect, React } from "react";
import { totalProductTableApi } from "../backendApis/AdminApis";

export default function ChartComponent() {
  const [isCategoryListOpen, setCategoryListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("?/");
  const [totalItemInDb, setTotalItemInDb] = useState([]);
  const [isGotData, setIsGotData] = useState(false);
  const [count, setCount] = useState(0);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); 
  };
  const chartOptions = {
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const dataIndex = params[0]?.dataIndex;
        if (dataIndex !== undefined) {
          const data = totalItemInDb.reduce((accumulator, current) => {
            return [...accumulator, current.image];
          }, []);
          const imageSource = `data:image/jpeg;base64,${data[dataIndex]}`;
          return `
                <img src= "${imageSource}" alt="${params[0]?.name}" style="width: 4rem; height: 4rem;" />
                <div>${params[0]?.name}: ${params[0]?.value}%</div>
            `;
        }
        return "";
      },
    },
    xAxis: {
      name: "Product Name",
      nameGap: 40,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "800",
      },
      type: "category",
      boundaryGap: false,
      nameLocation: "middle",
      data: totalItemInDb.reduce((accumulator, current) => {
        return [...accumulator, current.name];
      }, []),
    },
    yAxis: {
      name: "Probability %",
      nameGap: 40,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "800",
      },
      type: "value",
      nameLocation: "middle",
      axisName: {
        fontWeight: "bold",
      },
    },
    series: [
      {
        data: totalItemInDb.reduce((accumulator, current) => {
          return [...accumulator, (current.probability * 100).toFixed(2)];
        }, []),
        type: "line",
      },
    ],
  };

  useEffect(() => {
    totalProductTableApi(
      setIsGotData,
      0,
      20000,
      setTotalItemInDb,
      setCount,
      selectedCategory
    );
  }, [selectedCategory]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          "&": {
            padding: "7rem 3rem 3rem",
            marginBottom: "3rem",
            position: "relative",
          },
        }}
      >
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          open={isCategoryListOpen}
          onOpen={() => setCategoryListOpen(true)}
          onClose={() => setCategoryListOpen(false)}
          sx={{
            position: "absolute",
            right: "7rem",
            zIndex: "1",
            fontSize: "1.6rem",
            top: "2rem",
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
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "700",
          }}
        >
          Probability Of{" "}
          {selectedCategory === "?/"
            ? "All Product"
            : selectedCategory.split("/")[1]}{" "}
          Detection, Total {count}
        </Typography>
        {isGotData ? (
          <ReactEcharts
            option={chartOptions}
            style={{ height: "40rem", marginBottom: "1rem" }}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="40rem"
            bgcolor="#f5f5f5"
            borderRadius="4px"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
          >
            <CircularProgress color="primary" size={48} thickness={4} />
            <Typography
              variant="caption"
              color="textSecondary"
              ml={1}
              fontSize={"1.6rem"}
            >
              Loading chart...
            </Typography>
          </Box>
        )}
      </Paper>
    </>
  );
}
