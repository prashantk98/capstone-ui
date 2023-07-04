import { TableFooter, TablePagination, TableRow } from '@mui/material';

export default function TableFooterComponent({ currentPage, totalPages, handleChangePage }) {
  return (
    <>
        <TableFooter>
          <TableRow sx={{
            '& svg':{
            fontSize: '2rem'
          },
          "& .MuiSelect-select,p": {
            fontSize: "1.2rem",
            fontWeight: "500",
          },
          }}>
            <TablePagination
              colSpan={8} // Replace with the appropriate number of columns in your table
              count={totalPages * 100} // Replace with the total number of rows in your table
              rowsPerPage={10} // Replace with the number of rows to display per page
              page={currentPage}
              onPageChange={handleChangePage}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
            />
          </TableRow>
        </TableFooter>
    </>
  )
}
