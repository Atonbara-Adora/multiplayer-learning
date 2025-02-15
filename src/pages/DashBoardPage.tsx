import { DashboardHeader, DashBoardRecentCards, FriendsSidebar } from "../components/dashboard";

const DashBoard = () => {
    return (
        <div>
            <header>
                <DashboardHeader />
            </header>
            <main>
                <DashBoardRecentCards />
            </main>
        </div>
    );
};

export default DashBoard;