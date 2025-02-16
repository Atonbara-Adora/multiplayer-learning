import { useNavigate } from "react-router-dom";
import EditDeckClassModal from "../components/modal/EditDeckClassModal";
import { useFlashCardStore } from "../stores/FlashcardStore";
import { useState } from "react";

function MultipleChoice() {
  const navigate = useNavigate();
  const { classDeckName, updateQuestion, currentQuestionIndex } = useFlashCardStore();
  const [question, setQuestion] = useState<string>("What is the powerhouse of the cell?");
  const [options, setOptions] = useState<string[]>([
    "Mitochondria",
    "DNA",
    "Ribosomes",
    "Matrix",
  ]);

  const handleOptionChange = (index: number, newOption: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = newOption;
    setOptions(updatedOptions);
  };

  const addToDeck = () => {
    updateQuestion(currentQuestionIndex, {
      text: question,
      answers: options,
      correctAnswer: options[0], // You can modify this to set the correct answer dynamically
    });
    navigate("/question-list");
  };

  return (
    <div className="min-h-screen bg-violet-900 text-white flex flex-col items-center py-12">

      <h1 className="text-3xl font-bold mb-6">{classDeckName}</h1>
      <input
        type="text"
        placeholder="Type your question here"
        className="input input-bordered w-full max-w-lg bg-violet-700 text-white placeholder-gray-300 mb-6"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map((option, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="input input-bordered w-full bg-violet-700 text-white placeholder-gray-300"
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary mt-6"
        onClick={addToDeck}
      >
        Add to Deck
      </button>

      <EditDeckClassModal />
    </div>
  );
}

export default MultipleChoice;
