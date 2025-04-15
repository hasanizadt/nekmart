import { Fragment } from "react";

//Components
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title }) => {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
};
export default Layout;