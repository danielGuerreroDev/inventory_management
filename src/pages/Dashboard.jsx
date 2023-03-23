import BaseContainer from '../components/BaseContainer';

function Hi () {
	return (<h1>Hi !</h1>);
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
