//Components
import Sidebar from "./Sidebar";

const DashboardLayout = ({
    children,
    active
}) => {
    return (
        <div className="grid grid-cols-9 gap-6 my-2">
            <div className="col-span-2">
                <Sidebar active={active} />
            </div>
            <div className="col-span-7 my-2">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;