import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Divider,
  Toolbar,
  Typography,
  List,
  Grid,
  Badge
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useState } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function DrawerCustom({sidebarButton}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const getDrawerOpen=()=>{
    return open;
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#558044",
          fontWeight: "500",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon
            sx={{
              fontSize: '2rem'
            }}
             />
          </IconButton>
          <Grid
              container
              sx={{
                alignItems: "center",
              }}
            >
              <Grid item>
                <NavLink to="/" className="navbar__logo">
                  Smart Cart
                </NavLink>
              </Grid>
              <Grid item sm></Grid>

              <Grid item>
                <NavLink to="/" className="navbar__home">
                  Home
                </NavLink>
              </Grid>
              <Grid
                item
                sx={{
                  position: "relative",
                }}
              >
                <NavLink to="/ncart" className="navbar__cart">
                  <Badge
                    badgeContent={0}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "2rem",
                        margin: "0 .8rem 0",
                      },
                      '& svg':{
                        fontSize: "3.6rem",
                        padding: "0 .8rem",
                        }
                    }}
                  >
                    <ShoppingCart>

                    </ShoppingCart>
                  </Badge>
                  Cart
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/admin/login" className="navbar__admin">
                  Admin
                </NavLink>
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            ".css-10hburv-MuiTypography-root": {
              fontSize: "1.8rem",
            },
            "& svg": {
              fontSize: "2.0rem",
            },
          }}
        >
          {sidebarButton.map((currentElement, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={currentElement.onClickFuntion}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index===0 ? <DashboardIcon /> : (index===1 ? <LibraryAddIcon />: <PlaylistAddIcon />)}
                </ListItemIcon>
                <ListItemText
                  primary={currentElement.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <DrawerHeader />
    </>
  );
}
