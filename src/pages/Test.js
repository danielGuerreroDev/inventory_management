import BaseContainer from "../components/BaseContainer";
import Authenticate from "../components/Authenticate";

function Test({ hideSideBar, isOpen, showSideBar, sideBarWidth }) {
    return(
        <BaseContainer
            component={<Authenticate />}
            hideSideBar={hideSideBar}
            isOpen={isOpen}
            showSideBar={showSideBar}
            sideBarWidth={sideBarWidth}
        />
    );
}

export default Test;