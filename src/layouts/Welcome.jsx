import React from 'react';
import LoginButton from '../components/LoginButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const styles = makeStyles({
	root: {
		alignItems: 'center',
		display: 'flex !important',
		flexDirection: 'column',
		gap: '10px',
		justifyContent: 'center',
	}
});

function Welcome() {
	const classes = styles();

	return (
		<>
			<Grid
				container
				sx= {{ paddingTop:"60px" }}
			>
				<Grid
					item
					sx={{ width:"100%" }}
				>
					<Container
						className={classes.root}
						component="main"
					>
						<Typography
							variant="h4"
							sx={{ color: "primary.main", fontWeight: "bold" }}
						>
							Inventory Management
						</Typography>
						<Typography
							sx={{ color: "text.secondary" }}
						>
							Feel free to sign in
						</Typography>
						<LoginButton />
					</Container>
				</Grid>
			</Grid>
		</>
	);
}

export default Welcome;
