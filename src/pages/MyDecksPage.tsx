import { MyDeckCard } from "../components/myDecks";
import { useDeckStore } from "../stores/DeckStore";
import { useFlashCardStore } from "../stores/FlashcardStore";

const MyDecksPage = () => {
    const { clearStore } = useFlashCardStore();
    const { deck } = useDeckStore();
    return (
        <div className="flex flex-col py-4">
            <h1 className="text-3xl text-center">My Decks</h1>

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