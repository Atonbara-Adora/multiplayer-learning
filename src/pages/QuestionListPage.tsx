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
