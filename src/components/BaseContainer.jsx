import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import SideBarMenu from '../layouts/SideBarMenu';

const styles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '4px',
  },
  container: {
    alignItems: 'center',
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
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

function BaseContainer({ component }) {
  const [isOpen, setIsOpen] = useState(true);
  const classes = styles();
  const sideBarWidth = isOpen ? 200 : 86;

  const sideBarToggleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <SideBarMenu
        hideSideBar={classes.hideSideBar}
        isOpen={isOpen}
        showSideBar={classes.showSideBar}
        sideBarToggleClick={sideBarToggleClick}
        sideBarWidth={sideBarWidth}
      />
      <Grid
        container
        justifyContent="end"
        sx= {{ paddingTop:"60px" }}
      >
        <Grid
          item
          sx={
            { width:`calc(100% - ${sideBarWidth}px) !important` }
          }
          className={isOpen ? classes.showSideBar : classes.hideSideBar}
        >
          <Container
            className={classes.container}
            component="main"
          >
            {component}
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default BaseContainer;
