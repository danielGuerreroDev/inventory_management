import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

function BaseContainer({ component, hideSideBar, isOpen, showSideBar, sideBarWidth }) {
  const classes = styles();
  return (
    <>
      <Grid
        container
        justifyContent="end"
        sx= {{ paddingTop:"60px" }}
      >
        <Grid
          item
          sx={
            { width: `calc(100% - ${sideBarWidth}px)` }
          }
          className={isOpen ? showSideBar : hideSideBar}
        >
          <Container
            className={classes.root}
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