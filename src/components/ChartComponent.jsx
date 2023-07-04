import { MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import React from "react";
import totalItemInDb from "../rowData";
import ReactEcharts from "echarts-for-react";
import { useState } from "react";

export default function ChartComponent() {
  const [selectedCategory, setSelectedCategory] = useState("Fruit"); // State for selected category

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update the selected category
  };
  const getChartOption = (category) => {
    const chartOption = {
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const dataIndex = params[0]?.dataIndex;
          if (dataIndex !== undefined) {
            const data = totalItemInDb.reduce((accumulator, current) => {
              if (category === current.category) {
                return [...accumulator, current.imgSrc];
              } else {
                return [...accumulator];
              }
            }, []);
            return `
                <img src="${data[dataIndex]}" alt="${params[0]?.name}" style="width: 4rem; height: 4rem;" />
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
          if (category === current.category) {
            return [...accumulator, current.productName];
          } else {
            return [...accumulator];
          }
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
        // data: objectDetectionProbability.objectProbability,
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
    return chartOption;
  };
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          "&": {
            padding: "3rem",
            marginBottom: "3rem",
            position: 'relative'
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "700",
          }}
        >
          Probability Of {selectedCategory} Detection
        </Typography>
        {/* <Stack direction={'row'} justifyContent={'end'}> */}
        {/* <Typography>Select The Category</Typography> */}
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{ 
            position: 'absolute',
            right: '7rem',
            zIndex: '1'
          }}
          // fullWidth
        >
          <MenuItem value="Fruit">Fruit</MenuItem>
          <MenuItem value="Vegetable">Vegetable</MenuItem>
        </Select>
        {/* </Stack> */}

        <ReactEcharts
          option={getChartOption(selectedCategory)}
          style={{ height: "40rem" }}
        />
      </Paper>
    </>
  );
}
