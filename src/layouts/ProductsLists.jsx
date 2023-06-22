import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ProductsList({ columns, rows }) {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Container
            component="main"
          >
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          <b>{column.title}</b>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductsList;
