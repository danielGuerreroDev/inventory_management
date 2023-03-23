import BaseContainer from '../components/BaseContainer';

function Bye() {
    return (
        <h1>Bye Bye</h1>
    );
}

function Logout({ hideSideBar, isOpen, showSideBar, sideBarWidth }) {
    return(
        <BaseContainer
            component={<Bye />}
            hideSideBar={hideSideBar}
            isOpen={isOpen}
            showSideBar={showSideBar}
            sideBarWidth={sideBarWidth}
        />
    );
}

export default Logout;
