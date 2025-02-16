import { DashboardHeader, DashBoardRecentCards } from "../components/dashboard";

const DashBoard = () => {
  return (
    <div className="bg-violet-950 min-h-screen flex flex-col">
      <header>
        <DashboardHeader />
      </header>
      <main>
        <DashBoardRecentCards />
      </main>

      <div className="flex flex-col justify-center items-center space-y-2">
        <a
          href="/new-game"
          className="btn w-12border-0 border-none px-6 py-3 text-white rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 w-4/12"
        >
          New Game
        </a>

        <a
          href="/flashcards"
          className="btn border-0 border-none px-6 py-3 text-white rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 w-4/12"
        >
          Flashcards
        </a>
      </div>
    </div>
  );
};

export default DashBoard;
