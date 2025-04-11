const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full pt-16 max-w-7xl mx-auto">
            {children}
        </div>
    );
};

export default DashboardLayout;
