import { useCallback, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      width: 600,
    },
    '& .MuiDialogTitle-root' : {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',

    }
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

function ProductDetailsDrawer({ id, openDrawer, closeProductDetails }) {
  const [data, setData] = useState({});

  const getData = useCallback(
    async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
    }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const classes = styles();

  return (
    <Drawer
      anchor="right"
      className={classes.drawer}
      onClose={closeProductDetails}
      open={openDrawer}
    >
      <DialogTitle>
        {data.title}
        <IconButton
          onClick={closeProductDetails}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.mainDetailContainer}>
          <Avatar
            alt={data.title}
            className={classes.avatar}
            src={data.thumbnail}
            variant="rounded"
          />
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
      </DialogContent>
    </Drawer>
  );
}

export default ProductDetailsDrawer;
