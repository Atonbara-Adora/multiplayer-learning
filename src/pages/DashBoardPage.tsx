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

            <div className="flex flex-col justify-center items-center space-y-2">

                <a href="/new-game" className="btn">
                    New Game
                </a>

                <a href="/flashcards" className="btn">
                    Flashcards
                </a>

            </div>
        </div>
    );
};

export default DashBoard;