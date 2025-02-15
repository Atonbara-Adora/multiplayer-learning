import { MyDeckCard } from "../components/myDecks";

const MyDecksPage = () => {
    return (
        <div className="flex flex-col py-4">
            <h1 className="text-3xl text-center">My Decks</h1>

            <main>
                <div className="overflow-x-auto px-4">
                    <div className="inline-flex space-x-8 py-4">
                        <MyDeckCard title="Deck 1" />
                        <MyDeckCard title="Deck 2" />
                        <MyDeckCard title="Deck 3" />
                        <MyDeckCard title="Deck 4" />
                        <MyDeckCard title="Deck 5" />
                        <MyDeckCard title="Deck 6" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyDecksPage;