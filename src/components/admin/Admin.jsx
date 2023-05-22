import Navbar from "../Navbar";
import "./Admin.css";
import { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  // DataGrid
} from "@mui/material";
import rowDataArray from "../../rowData";

const options = ["Grocery", "Electronics", "Option 1", "Option 2"];


export default function Admin() {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  
  return (
    // sx={{margin:'8rem 4rem 0 4rem'}}
    // sx={{ margin: "1.6rem 0" }}
    <>
      <Navbar />
      <form action="/#" className="admin" >
        <Typography variant="h4" >
          Add new category
        </Typography>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300, fontSize: 30, margin: "1.6rem 0" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              sx={{ fontSize: 60 }}
              required
            />
          )}
        />
        <Button variant="contained" color="success" sx={{ margin: "1.6rem 0" }}>
          Success
        </Button>
      </form>

      <form action="/#" className="admin__sub-category">
        <Typography variant="h4" sx={{ margin: "1.6rem 0" }}>
          Add new Sub-category
        </Typography>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300, fontSize: 30, margin: "1.6rem 0", border: "none" }}
          renderInput={(params) => (
            <TextField {...params} label="sub-category" required />
          )}
        />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300, fontSize: 30, margin: "1.6rem 0" }}
          renderInput={(params) => (
            <TextField {...params} label="Category" required />
          )}
        />
        <Button
          variant="contained"
          color="success"
          className="admin__sub-category__button"
          sx={{ margin: "1.6rem 0" }}
        >
          Success
        </Button>
      </form>
      <TableContainer component={Paper} sx={{width:'90%',margin: '0 4rem 0 4rem'}}>
      <Table  aria-label="simple table" sx={{'& thead th': {
            fontWeight: '600',
            color: 'black',
            backgroundColor: '#42a5f5',
            fontSize:'1.6rem'
        },
        '& tbody td': {
            fontWeight: '300',
            fontSize:'1.2rem'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        }}}>
        <TableHead>
          <TableRow >
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowDataArray.map((current, index) => {
            return (
              <TableRow key={current.id} 
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                <TableCell>{current.first_name}</TableCell>
                <TableCell>{current.last_name}</TableCell>
                <TableCell>{current.email}</TableCell>
                <TableCell>{current.gender}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        
      </Table>
      </TableContainer>
    </>
  );
}
