import React from 'react';
import BaseContainer from '../components/BaseContainer';

function Hi () {
	return (<h1>Hi Webpack!</h1>);
}

function Dashboard() {
	return (
		<>
			<BaseContainer
				component={<Hi />}
			/>
		</>
	);
}

export default Dashboard;
