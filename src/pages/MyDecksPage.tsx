import { MyDeckCard } from "../components/myDecks";
import { useDeckStore } from "../stores/DeckStore";
import { useFlashCardStore } from "../stores/FlashcardStore";
import { useNavigate } from "react-router-dom";

const MyDecksPage = () => {
    const navigate = useNavigate();
    const { clearStore } = useFlashCardStore();
    const { deck } = useDeckStore();

    const navigateBack = () => {
        navigate("/");
    }

    return (
        <div className="flex flex-col py-4">
            <div className="flex justify-center">
                <button onClick={navigateBack} className="absolute left-4 top-4 text-2xl text-gray-800 hover:text-gray-600 hover:bg-gray-200">
                    ←
                </button>
                <h1 className="text-3xl text-center">My Decks</h1>
            </div>

            <main>
                <div className="overflow-x-auto px-4">
                    <div className="inline-flex space-x-8 py-4">
                        {deck.map((d, index) => (
                            <MyDeckCard key={index} title={d.classDeckName} />
                        ))}
                    </div>
                </div>
            </main>

            <div className="flex justify-center items-center">
                <a href="/question-list" className="btn" onClick={clearStore}>
                    New Deck
                </a>
            </div>
        </div>
    );
};

export default MyDecksPage;