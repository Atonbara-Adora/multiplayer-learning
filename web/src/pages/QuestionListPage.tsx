import { useFlashCardStore } from "../stores/FlashcardStore";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../buttons/PlusIcon";
import EditDeckClassModal from "../components/modal/EditDeckClassModal";
import { useDeckStore } from "../stores/DeckStore";
import { mockDeck } from "../data/mockDeck";

function QuestionList() {
  const navigate = useNavigate();
  const { classDeckName, questions, createQuestion, addQuestionWithContent } = useFlashCardStore();
  const { addDeck } = useDeckStore();

  const navigateBack = () => {
    navigate("/flashcards");
  };

  const handleSave = () => {
    addDeck({ classDeckName, questions });
  };

  return (
    <div className="flex flex-col justify-normal items-center py-10 bg-violet-900 min-h-screen w-full">
      <div className="w-full max-w-4xl relative flex items-center">
        <button
          onClick={navigateBack}
          className="absolute left-0 text-2xl text-white hover:text-gray-300"
        >
          ←
        </button>

        <div className="w-full flex justify-center">
          <button
            className="text-4xl font-bold text-white underline"
            onClick={() =>
              (
                document.getElementById("edit_deck_class_modal") as HTMLDialogElement
              )?.showModal()
            }
          >
            {classDeckName.length === 0 ? "Deck Name" : classDeckName}
          </button>
        </div>

        <button
          onClick={() => {
            const randomQuestion = mockDeck[Math.floor(Math.random() * mockDeck.length)];
            addQuestionWithContent({
              text: randomQuestion.question,
              answers: randomQuestion.options,
              correctAnswer: randomQuestion.answer
            });
          }}
          className="absolute right-34 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Add Random
        </button>

        <button
          onClick={handleSave}
          className="absolute right-0 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Add to Deck
        </button>
      </div>

      <div className="mt-5 space-y-4 w-full">
        {questions.map((question, index) => (
          <Question key={index} text={question.text} index={index} />
        ))}
      </div>

      <PlusIcon onClick={createQuestion} />

      <EditDeckClassModal />
    </div>
  );
}

function Question({ text, index }: { text: string; index: number }) {
  const { setCurrentQuestionIndex } = useFlashCardStore();
  return (
    <div className="flex justify-center w-full">
      <a
        className="block bg-violet-700 text-white rounded-lg py-4 px-6 w-9/12 text-center text-lg font-medium hover:bg-violet-600"
        href={`/multiple-choice/${index + 1}`}
        onClick={() => setCurrentQuestionIndex(index)}
      >
        {text}
      </a>
    </div>
  );
}

export default QuestionList;
