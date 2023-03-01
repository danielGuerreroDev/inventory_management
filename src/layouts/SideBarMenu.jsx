import {
  useState,
} from "react";
import {
  Route,
  Routes,
  Link
} from "react-router-dom";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  ChevronLeft,
  Inbox,
  MenuOutlined,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import AppBarTitle from "./AppBarTitle";
import Dashboard from "../pages/Dashboard";
import Test from "../pages/Test";

const styles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '4px',
  },
  showSideBar: {
    transition: 'all 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms !important',
    width: '100%',
  },
  hideSideBar: {
    transition: 'all 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms !important',
    width: '86px',
    overflowX: 'hidden',
    '& .makeStyles-root-1': {
      justifyContent: 'center',
    },
  },
});

function SideBarMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const classes = styles();
  const sideBarWidth = isOpen ? 200 : 86;

  const sideBarToggleClick = () => {
    setIsOpen(!isOpen);
  }

  const routes = [
    {
      path: "/",
      exact: true,
      page:
        <Dashboard
          hideSideBar={classes.hideSideBar}
          isOpen={isOpen}
          showSideBar={classes.showSideBar}
          sideBarWidth={sideBarWidth}
        />,
    },
    {
      path: "/pages/Test",
      exact: false,
      page:
        <Test
          hideSideBar={classes.hideSideBar}
          isOpen={isOpen}
          showSideBar={classes.showSideBar}
          sideBarWidth={sideBarWidth}
        />,
    },
  ];

  return (
    <>
      <Drawer variant="permanent">
        <AppBarTitle
          hideSideBar={classes.hideSideBar}
          isOpen={isOpen}
          showSideBar={classes.showSideBar}
          sideBarWidth={sideBarWidth}
        />
        <Paper
          className={isOpen ? classes.showSideBar : classes.hideSideBar}
          elevation={0}
          id="divSideBarMenu"
        >
          <div className={classes.root}>
            <IconButton onClick={sideBarToggleClick} type="button">
              {isOpen ? <ChevronLeft /> : <MenuOutlined />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              component={Link}
              to='/'
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
              to='/pages/Test'
            >
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Test" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Drawer>

      <Routes>
        {routes.map((route, index) => (
          <Route
            element={route.page}
            exact={route.exact}
            key={index}
            path={route.path}
          />
        ))}
      </Routes>
    </>
  );
}

export default SideBarMenu;