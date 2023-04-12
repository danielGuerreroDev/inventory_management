import { StrictMode, useCallback, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
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
  const [openActions, setOpenActions] = useState(false);
  const [edit, setEdit ] = useState(false);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getData = useCallback(async () => {
    Axios.get(`http://localhost:8080/getProduct/${id}`).then(res => {
      setData(res.data);
    })
  }, [id]);

  const getCategories = async () => {
    Axios.get('http://localhost:8080/getCategories').then(res => {
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
    setOpenActions(!openActions);
    setEdit(true);
  }

  const onSave = async () => {
    const params = data;
    Axios.put(`http://localhost:8080/product/${id}/update`, params).then(res => {
        getData();
        setOpenActions(!openActions);
        setEdit(false);
        getDataProductsList();
        res.status(200).send({
          status: 'Success',
        })
    });
  }

  const onCancel = () => {
    setOpenActions(!openActions);
    setEdit(false);
  }

  const onDelete = () => {
    setOpenActions(!openActions);
    console.log('delete');
  }

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
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

  const categoriesSelect = categories?.map((item) => {
    return <MenuItem value={item.name}>{item.name}</MenuItem>;
  });

  function EditableDetails () {
    return(
      <StrictMode key={data.id}>
        <div key={data.id} className={classes.mainDetailContainer}>
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
              Brand:
              <Input defaultValue={data.brand} sx={{ marginX: '10px' }} />
            </Typography>
            <Typography variant="subtitle1">
              Stock:
              <Input
                className={classes.inputNumber}
                defaultValue={data.stock}
                inputProps={{ type: 'number', pattern: '[0-9]*' }}
                sx={{ marginX: '10px' }}
              />
            </Typography>
          </div>
        </div>
        <div className={classes.description}>
          <Typography variant="body2">
            <Input defaultValue={data.description} multiline fullWidth />
          </Typography>
        </div>
        <div className={classes.extraDetailContainer}>
          <InputLabel id="categoriesSelect">Category</InputLabel>
          <Select
            labelId="categoriesSelect"
            autoWidth
            value={selectedCategory ? selectedCategory : data.category}
            onChange={handleChange}
          >
            {categoriesSelect}
          </Select>
          <Typography variant="body2">
            Discount:
            <Input
              className={classes.inputNumber}
              defaultValue={data.discountPercentage}
              inputProps={{ type: 'number', pattern: '[0-9]*' }}
              sx={{ marginX: '10px' }}
            />%
          </Typography>
          <Typography variant="body2">
            Price: $
            <Input
              className={classes.inputNumber}
              defaultValue={data.price}
              inputProps={{ type: 'number', pattern: '[0-9]*' }}
              sx={{ marginX: '10px' }}
            />
          </Typography>
          <Typography variant="body2">
            Rating:
            <Input
              className={classes.inputNumber}
              defaultValue={data.rating}
              inputProps={{ type: 'number', pattern: '[0-9]*' }}
              sx={{ marginX: '10px' }}
            />
          </Typography>
        </div>
      </StrictMode>
    );
  }

  console.log('_id', data._id);

  return (
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
  );
}

export default ProductDetailsDrawer;
