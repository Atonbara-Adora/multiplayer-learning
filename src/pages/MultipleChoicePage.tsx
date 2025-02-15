import PlusIcon from "../buttons/PlusIcon";
import { useState } from "react";

type CardType = {
  text: string;
  answers: string[];
  correctAnswer: string;
};

function MultipleChoice() {
  const [questions, setQuestions] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);

  const handleOptionChange = (index: number, newOption: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = newOption;
    setQuestions(updatedQuestions);
  };

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

      <h1 className="text-4xl font-bold text-center text-gray-800 underline decoration-purple-500 mb-4">Deck Name</h1>

      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />

      <div className="mt-3 flex flex-wrap gap-4">
        {questions.map((question, index) => (
          <MultipleChoiceOption
            key={index}
            option={question}
            onChange={(newOption) => handleOptionChange(index, newOption)}
          />
        ))}
      </div>
      <button className="mt-4 btn btn-secondary">Save</button>
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
