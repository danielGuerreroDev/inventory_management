import React from "react";
import { StrictMode, useCallback, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import Delete from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from "@mui/material/Snackbar";
import Axios from "axios";

const styles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      width: 600,
    },
    '& .MuiDialogTitle-root': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',

    },
    '& .MuiMenu-list': {
      backgroundColor: 'red',
      padding: 0,
      width: 120,
    },
  },
  actions: {
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    display: 'flex',
    height: 40,
    '& .MuiButtonBase-root': {
      backgroundColor: '#212121',
      padding: 0,
      width: 120,
    },
  },
  actionsContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0px 23px 0px 23px',
    width: '100%',
  },
  actionsItems: {
    '& .MuiPaper-root': {
      top: '105px !important',
      left: 'auto !important',
      right: '23px !important',
      width: 120,
    },
    '& .MuiMenuItem-root': {
      width: '100%',
      display: 'flex',
      gap: 10,
    },
  },
  avatar: {
    width: 80,
    height: 80,
  },
  mainDetailContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  mainDetailInfo: {
    margin: 5,
  },
  inputNumber: { width: 70, },
  description: {
    marginTop: 10,
    textAlign: 'justify',
  },
  extraDetailContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    gap: 8,
  },
});

function ProductDetailsDrawer({ id, openDrawer, closeProductDetails, getDataProductsList }) {
  const [data, setData] = useState({});
  const [clonedData, setClonedData] = useState({});
  const [actionsMessage, setActionsMessage] = useState(null);
  const [openActions, setOpenActions] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openSnackbarConfirm, setOpenSnackbarConfirm] = useState(false);
  const [edit, setEdit ] = useState(false);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getData = useCallback(async () => {
    Axios.get(`https://inventory-management-q6zw.onrender.com/getProduct/${id}`).then(res => {
      setData(res.data);
    });
  }, [id]);

  const getCategories = async () => {
    Axios.get('https://inventory-management-q6zw.onrender.com/getCategories').then(res => {
      setCategories(res.data);
    })
  };

  useEffect(() => {
    getData();
    getCategories();
  }, [getData]);

  const classes = styles();

  const actionsClick = () => {
    setOpenActions(true);
  }

  const handleClose = () => {
    setOpenActions(!openActions);
  }

  const onEdit = () => {
    setClonedData(data);
    setOpenActions(!openActions);
    setEdit(true);
  }

  const onSave = async () => {
    setData(clonedData);
    const params = data;
    Axios.put(`https://inventory-management-q6zw.onrender.com/product/${id}/update`, params).then(res => {
      setActionsMessage("Your changes have been saved.");
      handleSnackbarConfirm();
      getData();
      setOpenActions(!openActions);
      setEdit(false);
      getDataProductsList();
    });
  }

  const onCancel = () => {
    getData();
    setOpenActions(!openActions);
    setEdit(false);
  }

  const onDelete = () => {
    setOpenActions(!openActions);
    setOpenDialogDelete(!openDialogDelete)
  }

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(!openDialogDelete);
  }

  const deleteProduct = async () => {
    Axios.delete(`https://inventory-management-q6zw.onrender.com/product/delete/${id}`).then(res => {
      setActionsMessage("Product deleted.");
      handleCloseProductDetails();
      handleCloseDialogDelete();
      handleSnackbarConfirm();
      getDataProductsList();
    });
  }

  const handleSnackbarConfirm = () => {
    setOpenSnackbarConfirm(!openSnackbarConfirm);
  }

  const handleCloseSnackbarConfirm = () => {
    setOpenSnackbarConfirm(!openSnackbarConfirm);
  }

  const handleChangeSelectCategory = (event) => {
    const categoryField = "category";
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    for (const key in clonedData) {
      if(key === categoryField) {
        clonedData[key] = categoryValue;
      }
    }
  }

  const handleCloseProductDetails = () => {
    closeProductDetails();
    setSelectedCategory(null);
    setEdit(false);
    setData({});
  }

  function CustomMenu (props) {
    return (
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...props}
      />
    );
  }

  const categoriesSelect = categories?.map((item) => {
    return <MenuItem value={item.name}>{item.name}</MenuItem>;
  });

  const handleChangeWhenEditing = (event) => {
    const field = event.target.id;
    const fieldValue = event.target.value;
    for (const key in clonedData) {
      if(key === field) {
        clonedData[key] = fieldValue;
      }
    }
  }

  function Details () {
    return(
      <StrictMode key={data.id}>
        <div className={classes.mainDetailContainer}>
          <Avatar
            alt={data.title}
            className={classes.avatar}
            src={data.thumbnail}
            variant="rounded" />
          <div className={classes.mainDetailInfo}>
            <Typography variant="overline">
              ID: {data.id}
            </Typography>
            <Typography variant="subtitle1">
              Brand: {data.brand}
            </Typography>
            <Typography variant="subtitle1">
              Stock: {data.stock}
            </Typography>
          </div>
        </div>
        <div className={classes.description}>
          <Typography variant="body2">
            {data.description}
          </Typography>
        </div>
        <div className={classes.extraDetailContainer}>
          <Typography variant="body2">
            Category: {data.category}
          </Typography>
          <Typography variant="body2">
            Discount: {data.discountPercentage}%
          </Typography>
          <Typography variant="body2">
            Price: ${data.price}
          </Typography>
          <Typography variant="body2">
            Rating: {data.rating}
          </Typography>
        </div>
      </StrictMode>
    );
  }

  function EditableDetails () {
    return(
      <StrictMode key={clonedData.id}>
        <div key={clonedData.id} className={classes.mainDetailContainer}>
          <Avatar
            alt={clonedData.title}
            className={classes.avatar}
            src={clonedData.thumbnail}
            variant="rounded"
          />
          <div className={classes.mainDetailInfo}>
            <Typography variant="overline">
              ID: {clonedData.id}
            </Typography>
            <Typography variant="subtitle1">
              Brand:
              <Input
                id="brand"
                defaultValue={clonedData.brand}
                onChange={handleChangeWhenEditing}
                sx={{ marginX: '10px' }}
              />
            </Typography>
            <Typography variant="subtitle1">
              Stock:
              <Input
                id="stock"
                className={classes.inputNumber}
                defaultValue={clonedData.stock}
                inputProps={{ type: 'number', pattern: '[0-9]*' }}
                onChange={handleChangeWhenEditing}
                sx={{ marginX: '10px' }}
              />
            </Typography>
          </div>
        </div>
        <div className={classes.description}>
          <Typography variant="body2">
            <Input
              id="description"
              defaultValue={clonedData.description}
              multiline
              fullWidth
              onChange={handleChangeWhenEditing}
            />
          </Typography>
        </div>
        <div className={classes.extraDetailContainer}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            id="category"
            labelId="category"
            autoWidth
            value={selectedCategory ? selectedCategory : clonedData.category}
            onChange={handleChangeSelectCategory}
          >
            {categoriesSelect}
          </Select>
          <Typography variant="body2">
            Discount:
            <Input
              id="discountPercentage"
              className={classes.inputNumber}
              defaultValue={clonedData.discountPercentage}
              inputProps={{ type: 'number', pattern: '[0-9]*' }}
              onChange={handleChangeWhenEditing}
              sx={{ marginX: '10px' }}
            />%
          </Typography>
          <Typography variant="body2">
            Price: $
            <Input
              id="price"
              className={classes.inputNumber}
              defaultValue={clonedData.price}
              inputProps={{ type: 'number', pattern: '[0-9]*' }}
              onChange={handleChangeWhenEditing}
              sx={{ marginX: '10px' }}
            />
          </Typography>
          <Typography variant="body2">
            Rating:
            <Input
              id="rating"
              className={classes.inputNumber}
              defaultValue={clonedData.rating}
              inputProps={{ type: 'number', pattern: '[0-9]*' }}
              onChange={handleChangeWhenEditing}
              sx={{ marginX: '10px' }}
            />
          </Typography>
        </div>
      </StrictMode>
    );
  }

  return (
    <>
      <Drawer
        anchor="right"
        className={classes.drawer}
        onClose={handleCloseProductDetails}
        open={openDrawer}
      >
        <DialogTitle>
          {data.title}
          <IconButton
            onClick={handleCloseProductDetails}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <div className={classes.actions}>
          <div className={classes.actionsContainer}>
            <Button
              aria-controls={openActions ? 'CustomMenu' : null}
              aria-haspopup="true"
              aria-expanded={openActions ? 'true' : null}
              disableElevation
              endIcon={<KeyboardArrowDownIcon />}
              onClick={actionsClick}
              size="small"
              variant="contained"
            >
              Actions
            </Button>
            <CustomMenu
              id="CustomMenu"
              onClick={handleClose}
              open={openActions}
              className={classes.actionsItems}
            >
              <div>
                <MenuItem
                  disableRipple
                  onClick={edit ? onSave : onEdit}
                >
                  {edit ? <SaveIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                  {edit ? 'Save' : 'Edit'}
                </MenuItem>
                <MenuItem
                  disableRipple
                  onClick={edit ? onCancel : onDelete}
                >
                  {edit ? <CancelIcon fontSize="small" /> : <Delete fontSize="small" />}
                  {edit ? 'Cancel' : 'Delete'}
                </MenuItem>
              </div>
            </CustomMenu>
          </div>
        </div>
        <DialogContent dividers>
          {edit ? <EditableDetails /> : <Details />}
        </DialogContent>
      </Drawer>
      <Dialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
      >
        <DialogTitle>
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogDelete}
            variant="contained"
          >
            No
          </Button>
          <Button
            onClick={deleteProduct}
            variant="contained"
            color="error"
          >
              Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={3000}
        open={openSnackbarConfirm}
        onClose={handleCloseSnackbarConfirm}
        message={actionsMessage}
      />
    </>
  );
}

export default ProductDetailsDrawer;
