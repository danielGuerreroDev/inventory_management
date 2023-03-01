import BaseContainer from "../components/BaseContainer";
import ProductsList from "../layouts/ProductsLists";

function Dashboard({ hideSideBar, isOpen, showSideBar, sideBarWidth }) {
    return(
        <BaseContainer
            component={<ProductsList />}
            hideSideBar={hideSideBar}
            isOpen={isOpen}
            showSideBar={showSideBar}
            sideBarWidth={sideBarWidth}
        />
    );
}

export default Dashboard;
