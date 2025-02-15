import { useFlashCardStore } from "../stores/FlashcardStore";
import PlusIcon from "../buttons/PlusIcon";
import EditDeckClassModal from "../components/modal/EditDeckClassModal";

function QuestionList() {
  const { classDeckName, questions, createQuestion } = useFlashCardStore();

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="flex text-4xl font-bold text-center text-gray-800">
        <button className="underline decoration-purple-500 mb-4 mr-2" onClick={() => (document.getElementById('edit_deck_class_modal') as HTMLDialogElement)?.showModal()}>
          {classDeckName.length === 0 ? "Class Name" : classDeckName}
        </button>
        <span>Questions</span>
      </div>

      <div className="mt-3 space-y-3">
        {questions.map((question) => (
          <Question text={question.text} />
        ))}
      </div>

      <PlusIcon onClick={createQuestion} />

      <EditDeckClassModal />
    </div>
  );
}

function Question({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-start py-2 rounded w-96">
      <button className="btn btn-block mb-2">{text}</button>
    </div>
  );
}

export default QuestionList;
