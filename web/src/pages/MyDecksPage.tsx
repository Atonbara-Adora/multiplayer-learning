import { useDeckStore } from "../stores/DeckStore";
import { useFlashCardStore } from "../stores/FlashcardStore";
import { useNavigate } from "react-router-dom";

const MyDecksPage = () => {
  const navigate = useNavigate();
  const { clearStore } = useFlashCardStore();
  const { deck } = useDeckStore();

  const navigateBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 to-purple-900 text-white flex flex-col">
      {/* Header */}
      <div className="relative py-6">
        <button
          onClick={navigateBack}
          className="absolute left-4 top-4 text-2xl text-white hover:text-gray-300"
        >
          ←
        </button>
        <h1 className="text-4xl font-bold text-center">My Decks</h1>
      </div>

      {/* Decks Section */}
      <main className="flex-grow">
        <div className="overflow-x-auto px-4">
          <div className="flex space-x-6 py-4">
            {deck.map((d, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-pink-600 to-violet-800 w-60 h-100 rounded-lg flex items-center justify-center text-xl font-semibold shadow-md transform hover:scale-105 transition"
              >
                {d.classDeckName}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* New Deck Button */}
      <div className="py-4 flex justify-center">
        <a
          href="/question-list"
          onClick={clearStore}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded shadow-lg transition"
        >
          New Deck
        </a>
      </div>
    </div>
  );
};

export default MyDecksPage;
