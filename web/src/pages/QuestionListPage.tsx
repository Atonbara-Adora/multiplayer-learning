import { useFlashCardStore } from "../stores/FlashcardStore";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../buttons/PlusIcon";
import EditDeckClassModal from "../components/modal/EditDeckClassModal";
import { useDeckStore } from "../stores/DeckStore";

function QuestionList() {
  const navigate = useNavigate();
  const { classDeckName, questions, createQuestion } = useFlashCardStore();
  const { addDeck } = useDeckStore();

  const navigateBack = () => {
    navigate("/flashcards");
  }

  const handleSave = () => {
    addDeck({ classDeckName, questions });
  }

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="w-full max-w-4xl flex items-center justify-between px-4">
        <button onClick={navigateBack} className="text-2xl text-gray-800 hover:text-gray-600 hover:bg-gray-200">
          ←
        </button>

        <div className="flex flex-col items-center">
          <button
            className="underline decoration-purple-500 text-4xl font-bold text-gray-800"
            onClick={() =>
              (document.getElementById('edit_deck_class_modal') as HTMLDialogElement)?.showModal()
            }
          >
            {classDeckName.length === 0 ? "Deck Name" : classDeckName}
          </button>
        </div>

        <button onClick={handleSave} className="btn btn-success">
          Save
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {questions.map((question, index) => (
          <Question text={question.text} index={index} />
        ))}
      </div>

      <PlusIcon onClick={createQuestion} />

      <EditDeckClassModal />
    </div>
  );
}

function Question({ text, index }: { text: string, index: number }) {
  const { setCurrentQuestionIndex } = useFlashCardStore();
  return (
    <div className="flex flex-col items-start py-2 rounded w-96">
      <a className="btn btn-block mb-2" href={`/multiple-choice/${index + 1}`} onClick={() => setCurrentQuestionIndex(index)}>
        {text}
      </a>
    </div>
  );
}

export default QuestionList;
