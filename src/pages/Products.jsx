import { useEffect, useState } from "react";
import BaseContainer from "../components/BaseContainer";
import ProductDetailsDrawer from "../components/ProductDetailsDrawer";
import ProductsList from "../layouts/ProductsLists";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import { makeStyles } from "@mui/styles";
import Axios from "axios";

const styles = makeStyles({
  hover: {
    '&:hover': { cursor: 'pointer'}
  },
});

function createColumns(id, title) {
  return { id, title };
}

const columns = [
  createColumns(1, 'ID'),
  createColumns(2, 'Title'),
  createColumns(3, 'Description'),
  createColumns(4, 'Price'),
  createColumns(5, 'Stock'),
];

function Products() {
  const [data, setData] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [productId, setProductId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const classes = styles();

  const getData = () => {
    Axios.get('http://localhost:8080/getProducts').then(res => {
      setData(res.data);
    })
  }

  useEffect(() =>{
    getData();
  }, []);

  const openProductDetails = (id) => {
    setProductId(id);
    setOpenDrawer(!openDrawer);
  }

  const closeProductDetails = () => {
    setProductId(null);
    setOpenDrawer(!openDrawer);
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const rows = data?.slice(page * rowsPerPage,
    page * rowsPerPage + rowsPerPage).map((item) => (
    <TableRow
      className={classes.hover}
      hover
      key={item.id}
      onClick={() => openProductDetails(item.id)}
    >
      <TableCell component="th" scope="row">{item.id}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell align="right">{formatter.format(item.price)}</TableCell>
      <TableCell align="right">{item.stock}</TableCell>
    </TableRow>
  ));

  const count = data?.length;

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  }

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <>
      <BaseContainer
        component={
          <>
            <ProductsList
              columns={columns}
              rows={rows}
            />
            <TablePagination
              component="div"
              count={count}
              page={page}
              onPageChange={onPageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={onRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </>
        }
      />
      <ProductDetailsDrawer
        id={productId}
        openDrawer={openDrawer}
        closeProductDetails={closeProductDetails}
        getDataProductsList={getData}
      />
    </>
  );
}

export default Products;
