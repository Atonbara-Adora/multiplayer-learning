import { DashboardHeader, DashBoardRecentCards } from "../components/dashboard";

const DashBoard = () => {
    return (
        <div>
            <header>
                <DashboardHeader />
            </header>
            <main>
                <DashBoardRecentCards />
            </main>

            <div className="flex justify-center items-center">
                <a href="/flashcards" className="btn">
                    Flashcards
                </a>

            </div>
        </div>
    );
};

export default DashBoard;