import { Grid, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import React from "react";
import { apiLocalPath } from "../rowData";
import ReactEcharts from "echarts-for-react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function ChartComponent() {
  const defaultCategory = ["Fruits"];
  // const [defaultCategory, setDefaultCategory]= useState(['Fruits']);
  const [isCategoryListOpen, setCategoryListOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(defaultCategory);
  const [totalItemInDb, setTotalItemInDb] = useState([]);

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    if (value.length === 0) {
      setSelectedCategories([...defaultCategory]);
    // totalProductApi(category);
    } else {
      setSelectedCategories(value);

    // totalProductApi();
    }
    setCategoryListOpen(false);
  };
  // const handleCategoryChange = (event) => {
  //   setSelectedCategory(event.target.value); // Update the selected category
  // };
  // const getChartOption = (category) => {
  //   const chartOption = {
  //     tooltip: {
  //       trigger: "axis",
  //       formatter: (params) => {
  //         const dataIndex = params[0]?.dataIndex;
  //         if (dataIndex !== undefined) {
  //           const data = totalItemInDb.reduce((accumulator, current) => {
  //             if (category === current.category) {
  //               return [...accumulator, current.imgSrc];
  //             } else {
  //               return [...accumulator];
  //             }
  //           }, []);
  //           return `
  //               <img src="${data[dataIndex]}" alt="${params[0]?.name}" style="width: 4rem; height: 4rem;" />
  //               <div>${params[0]?.name}: ${params[0]?.value}%</div>
  //           `;
  //         }
  //         return "";
  //       },
  //     },
  //     xAxis: {
  //       name: "Product Name",
  //       nameGap: 40,
  //       nameTextStyle: {
  //         fontSize: 14,
  //         fontWeight: "800",
  //       },
  //       type: "category",
  //       boundaryGap: false,
  //       nameLocation: "middle",
  //       data: totalItemInDb.reduce((accumulator, current) => {
  //         if (category === current.category) {
  //           return [...accumulator, current.productName];
  //         } else {
  //           return [...accumulator];
  //         }
  //       }, []),
  //     },
  //     yAxis: {
  //       name: "Probability %",
  //       nameGap: 40,
  //       nameTextStyle: {
  //         fontSize: 14,
  //         fontWeight: "800",
  //       },
  //       type: "value",
  //       nameLocation: "middle",
  //       axisName: {
  //         fontWeight: "bold",
  //       },
  //       // data: objectDetectionProbability.objectProbability,
  //     },
  //     series: [
  //       {
  //         data: totalItemInDb.reduce((accumulator, current) => {
  //           return [...accumulator, (current.probability * 100).toFixed(2)];
  //         }, []),
  //         type: "line",
  //       },
  //     ],
  //   };
  //   return chartOption;
  // };

  function totalProductApi(){
    const token = sessionStorage.getItem("adminAccessToken")
    let config = {
      method: 'GET',
      url: `${apiLocalPath}/inventory/products?page=${0}&page_size=2000`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    axios.request(config)
    .then((response) => {
      // console.log(response.data);
      // setDefaultCategory(response.data.results);
      setTotalItemInDb(response.data.results);
      // setTotalProductsArray(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
      }
  const getChartOptions = (category) => {
    // console.log(totalItemInDb);
    const chartOptions = {
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const dataIndex = params[0]?.dataIndex;
          if (dataIndex !== undefined) {
            const data = category!=="All Product"? totalItemInDb.reduce((accumulator, current) => {
              if (current.categories.includes(category)) {
                return [...accumulator, current.image];
              } else {
                return [...accumulator];
              }
            }, []): totalItemInDb.map((item) => item.image);
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
         data: category!=="All Product"?totalItemInDb.reduce((accumulator, current) => {
            if (current.categories.includes(category)) {
              return [...accumulator, current.name];
            } else {
              return [...accumulator];
            }
          }, []): totalItemInDb.map((item) => item.name),
        // data: totalItemInDb.reduce((accumulator, current) => {
        //   if (category === current.category) {
        //     return [...accumulator, current.productName];
        //   } else {
        //     return [...accumulator];
        //   }
        // }, []),
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
    return chartOptions;
  };
  useEffect(()=>{
    totalProductApi();
  },[])
  
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          "&": {
            padding: "7rem 3rem 3rem",
            marginBottom: "3rem",
            position: 'relative'
          },
        }}
      >
        <Select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          open={isCategoryListOpen}
          onOpen={() => setCategoryListOpen(true)}
          onClose={() => setCategoryListOpen(false)}
          sx={{ 
            position: 'absolute',
            right: '7rem',
            zIndex: '1',
            fontSize: '1.6rem',
            top: '2rem',
            '& .MuiSelect-select':{
              padding: '.8rem 1.2rem',
              minWidth: '5rem'
            }
          }}
        >
          <MenuItem value="Fruits">Fruit</MenuItem>
          <MenuItem value="Vegetables">Vegetable</MenuItem>
          <MenuItem value="All Product">All</MenuItem>
        </Select>
        <Grid container spacing={3}>
        {selectedCategories.map((category) => (
          <Grid item xs 
          key={category}>
            <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "700",
          }}
        >
          Probability Of {category} Detection
        </Typography>
              <ReactEcharts
                option={getChartOptions(category)}
                style={{ height: '40rem', marginBottom: '1rem' }}
              />
          </Grid>
            ))}
      </Grid>
      </Paper>
    </>
  );
}
