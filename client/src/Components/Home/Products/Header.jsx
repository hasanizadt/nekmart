const Header = ({
    section
}) => {
    return (
        <div className="text-center">
            <h4 className="text-2xl font-semibold text-main">{section.name}</h4>
            <p className="text-[15px] mt-2 font-light opacity-60">{section.description}</p>
        </div>
    );
};

export default Header;