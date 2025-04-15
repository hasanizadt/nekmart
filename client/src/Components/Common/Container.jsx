const Container = ({
    children,
    className
}) => {
    return (
        <div className={`3xl:container 3xl:mx-auto px-12 ${className}`}>
            {children}
        </div>
    );
};

export default Container;