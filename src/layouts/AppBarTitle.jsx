import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

function AppBarTitle({ hideSideBar, isOpen, showSideBar, sideBarWidth }) {

  return (
    <AppBar
      sx={
        { width: `calc(100% - ${sideBarWidth}px) !important` }
      }
      className={isOpen ? showSideBar : hideSideBar}
    >
      <Toolbar variant="dense">
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarTitle;
