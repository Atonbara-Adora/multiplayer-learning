import { useNavigate } from "react-router-dom";
import EditDeckClassModal from "../components/modal/EditDeckClassModal";
import { useFlashCardStore } from "../stores/FlashcardStore";
import { useState } from "react";

function MultipleChoice() {
  const navigate = useNavigate();
  const { classDeckName, updateQuestion, currentQuestionIndex } = useFlashCardStore();
  const [question, setQuestion] = useState<string>("Question");
  const [options, setOptions] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);

  const handleOptionChange = (index: number, newOption: string) => {
    const updatedQuestions = [...options];
    updatedQuestions[index] = newOption;
    setOptions(updatedQuestions);
  };

  const addToDeck = () => {
    updateQuestion(currentQuestionIndex, {
      text: question,
      answers: options,
      correctAnswer: options[0],
    });
    navigate("/question-list");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn m-1">
          Choose a Question Type
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Multiple Choice</a>
          </li>
          <li>
            <a>Label</a>
          </li>
        </ul>
      </div>

      <main className="flex flex-col items-center justify-center py-16">
        <button
          className="text-4xl font-bold text-center text-gray-800 underline decoration-purple-500 mb-4"
          onClick={() => (document.getElementById("edit_deck_class_modal") as HTMLDialogElement).showModal()}
        >
          {classDeckName}
        </button>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="mt-3 flex flex-wrap gap-4">
          {options.map((option, index) => (
            <MultipleChoiceOption
              key={index}
              option={option}
              onChange={(newOption) => handleOptionChange(index, newOption)}
            />
          ))}
        </div>
        <button className="mt-6 btn btn-secondary" onClick={addToDeck}>Add to Deck</button>
      </main>

      <EditDeckClassModal />
    </div>
  );
}

function MultipleChoiceOption({
  option,
  onChange,
}: {
  option: string;
  onChange: (newOption: string) => void;
}) {
  return (
    <div className="relative w-48">
      <input
        type="text"
        value={option}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
}


export default MultipleChoice;
