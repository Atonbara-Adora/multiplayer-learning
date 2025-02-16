import DashBoardCard from "./DashBoardCard";

const DashBoardRecentCards = () => {
    return (
        <div className="px-8 py-8">
            <h2 className="text-white text-xl font-bold">Recent Flashcards</h2>

            {/* a horizontal scrollview to select the cards */}
            <div className="overflow-x-auto">
                <div className="inline-flex space-x-8 py-4">
                    <DashBoardCard title={"Cal 3"} />
                    <DashBoardCard title={"HS150"} />
                    <DashBoardCard title={"CS 101"} />
                    <DashBoardCard title={"PsyCh"} />
                    <DashBoardCard title={"CYE"} />
                    <DashBoardCard title={"French"} />
                </div>
            </div>
        </div>
    );
};

export default DashBoardRecentCards;