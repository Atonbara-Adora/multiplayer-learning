const DashBoard = () => {
    return (
        <div>
            <header>
                <h1>Dashboard</h1>
            </header>
            <main>
                <section>
                    <h2>Overview</h2>
                    {/* Add overview content here */}
                </section>
                <section>
                    <h2>Statistics</h2>
                    {/* Add statistics content here */}
                    <button className="btn btn-neutral">Neutral</button>
                </section>
                <section>
                    <h2>Recent Activities</h2>
                    {/* Add recent activities content here */}
                </section>
            </main>
            <footer>
                {/* Add footer content here */}
            </footer>
        </div>
    );
};

export default DashBoard;