import * as React from "react";
import ReactEcharts from "echarts-for-react";
import { Paper, Grid, Typography, CssBaseline, Box } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SellIcon from "@mui/icons-material/Sell";
import PageviewIcon from "@mui/icons-material/Pageview";
import totalItemInDb from "../rowData";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
// import homeBg from '../../images/cart_bg.svg';
import DrawerCustom from "../components/DrawerCustom";
import ShowItemsTable from "../components/ShowItemsTable";
import Stats from "../components/ Stats";
import AddNewProduct from "../components/AddNewProduct";

import { Button, Result } from 'antd';

const chartOption = {
  tooltip: {
    trigger: "axis",
    formatter: (params) => {
      const dataIndex = params[0]?.dataIndex;
      if (dataIndex !== undefined) {
        const data = totalItemInDb.reduce((accumulator, current) => {
          return [...accumulator, current.imgSrc];
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
    name: "Item Name",
    type: "category",
    boundaryGap: false,
    data: totalItemInDb.reduce((accumulator, current) => {
      return [...accumulator, current.productName];
    }, []),
  },
  yAxis: {
    name: "Probability %",
    type: "value",
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
const statsDataStyle = {
  color: "white",
  fontSize: "4.4rem",
  position: "absolute",
  top: "-3.2rem",
  left: "-4.4rem",
  borderRadius: ".8rem",
};
const receiptIcon = (
  <ReceiptIcon sx={{ "&": statsDataStyle, backgroundColor: "orange" }} />
);
const currenyIcon = (
  <CurrencyRupeeIcon sx={{ "&": statsDataStyle, backgroundColor: "green" }} />
);
const pageViewIcon = (
  <PageviewIcon sx={{ "&": statsDataStyle, backgroundColor: "#0078ff" }} />
);
const sellIcon = (
  <SellIcon sx={{ "&": statsDataStyle, backgroundColor: "blue" }} />
);

export default function Admin() {
  const navigate = useNavigate();
  const [openAddNewProductModal, setOpenAddNewProductModal] = useState(false);
  const [isAuthenticated, setisAuthenticated]= useState(sessionStorage.getItem('adminAuthorization')==='true')
  const sidebarButton = [
    { title: "Dashboard", onClickFuntion: navigateToDashborad },
    { title: "Add New Item", onClickFuntion: navigateToAddNewItem },
    { title: "Add Category", onClickFuntion: navigateToAddNewItem },
    { title: "Add Sub-Category", onClickFuntion: navigateToAddNewItem },
  ];

  function navigateToDashborad() {
    navigate("/admin");
  }
  function navigateToAddNewItem() {
    setOpenAddNewProductModal(true);
  }
  function closeAddNewItemModal() {
    // return false;
    setOpenAddNewProductModal(false);
  }
  function navigateToAddNewCategory() {
    console.log("add new category");
  }
  function navigateToAddNewSubCategory() {
    console.log("add new subcategory");
  }

  if (isAuthenticated) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />

        <DrawerCustom sidebarButton={sidebarButton} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            fontSize: "1.4rem",
            width: "90%",
            mt: "6rem",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            mb="3rem"
            sx={{
              // border: '4px solid black',
              "& .MuiPaper-root": {
                p: "2rem 4rem",
                height: "100%",
              },
              "& .MuiGrid-item": {
                // height: '100%',
                minHeight: "9.4rem",
                // border: '2px solid red'
              },
            }}
            columns={{ xs: 2.5, sm: 6, md: 12 }}
          >
            <Grid item xs={2.5}>
              <Stats
                title="Total Revenue"
                icon={currenyIcon}
                statsData={612839}
              />
            </Grid>
            <Grid item xs={2.5}>
              <Stats
                title="Total Transaction"
                icon={receiptIcon}
                statsData={54231}
              />
            </Grid>
            <Grid item xs={2.5}>
              <Stats
                title="Avarage Probability"
                icon={pageViewIcon}
                statsData={Math.floor(Math.random() * 40 + 50)}
              />
            </Grid>
            <Grid item xs={2.5}>
              <Stats
                title="Total Product Sold"
                icon={sellIcon}
                statsData={12333}
              />
            </Grid>
          </Grid>
          <Paper
            elevation={3}
            sx={{
              "&": {
                padding: "1rem",
                marginBottom: "3rem",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: "700",
              }}
            >
              Probability Of Object Detection
            </Typography>
            <ReactEcharts option={chartOption} style={{ height: "40rem" }} />
          </Paper>
          <AddNewProduct
            navigateToAddNewItem={navigateToAddNewItem}
            openAddItemModal={openAddNewProductModal}
            closeAddNewItemModal={closeAddNewItemModal}
          />
          <ShowItemsTable />
          {/* <EditItemDetails/> */}
          {/* <LoginAdminModal /> */}
          <Footer />
        </Box>
      </Box>
    </>
  );
  }else{
    // console.log(isAuthenticated ,sessionStorage.getItem('adminAuthorization') );
    return <Result
    status="403"
    title="Sorry, you are not authorized to access the admin page."
    subTitle="To access the admin page login first."
    extra={<Button type="primary" onClick={()=>navigate('login')}>Login Admin</Button>}
  />
  }
}
