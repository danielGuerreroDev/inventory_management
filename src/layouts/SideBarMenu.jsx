import {
  Link
} from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  ChevronLeft,
  Inbox,
  MenuOutlined,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import AppBarTitle from './AppBarTitle';
import LogoutButton from '../components/LogoutButton';

const styles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    padding: '4px',
  },
});

function SideBarMenu({
  hideSideBar,
  isOpen,
  showSideBar,
  sideBarToggleClick, 
  sideBarWidth,
}) {
  const classes = styles();

  return (
    <>
      <Drawer variant="permanent">
        <AppBarTitle
          hideSideBar={hideSideBar}
          isOpen={isOpen}
          showSideBar={showSideBar}
          sideBarWidth={sideBarWidth}
        />
        <Paper
          className={isOpen ? showSideBar : hideSideBar}
          elevation={0}
          id="divSideBarMenu"
        >
          <Box
            className={classes.root}
            sx={isOpen ? { justifyContent: "flex-end" } : { justifyContent: "center" }}
          >
            <IconButton onClick={sideBarToggleClick} type="button">
              {isOpen ? <ChevronLeft /> : <MenuOutlined />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListItem
              component={Link}
              to="/pages/Dashboard"
            >
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem
              component={Link}
              to="/pages/Products"
            >
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
            <LogoutButton />
          </List>
        </Paper>
      </Drawer>
    </>
  );
}

export default SideBarMenu;
