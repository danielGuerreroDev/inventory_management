import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from "@mui/material";
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex !important',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center',
    // '& .MuiBox-root': {
    //   width: '100%'
    // }
  }
});

function Authenticate() {
  const classes = styles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container
          className={classes.root}
          component="main"
          maxWidth="xs"
        >
          <Avatar>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
          <Typography align="center" component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            required
          />
          <TextField
            autoComplete="email"
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            required
          />
          <Box sx={{ width: '100%' }}>
            <FormControlLabel
              control={<Checkbox color="primary" value="remember" />}
              label="Remember me"
            />
          </Box>
          <Button
            fullWidth
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Authenticate;