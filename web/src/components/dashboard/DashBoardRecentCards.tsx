import DashBoardCard from "./DashBoardCard";
import { useDeckStore } from "../../stores/DeckStore";

const DashBoardRecentCards = () => {
    const { deck } = useDeckStore();
    return (
        <div className="px-8 py-8">
            <h2 className="text-xl font-bold">Recent Flashcards</h2>

            {/* a horizontal scrollview to select the cards */}
            <div className="overflow-x-auto">
                <div className="inline-flex space-x-8 py-4">
                    {deck.map((d, index) => (
                        <DashBoardCard title={d.classDeckName} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashBoardRecentCards;