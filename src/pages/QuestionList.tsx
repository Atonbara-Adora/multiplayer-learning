import PlusIcon from "../buttons/PlusIcon";
type DeckType = {
  deckName: string;
  questions: CardType[];
};

type CardType = {
  text: string;
  answers: string[];
  correctAnswer: string;
};

function QuestionList(props: DeckType) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-gray-800 underline decoration-purple-500 mb-4">
        {props.deckName}
      </h1>

      <div className="mt-3 space-y-3">
        {props.questions.map((question, index) => (
          <Question key={index} {...question} />
        ))}
      </div>

      <PlusIcon />
    </div>
  );
}

function Question(props: CardType) {
  return (
    <div>
      <button className="w-full btn btn-block">{props.text}</button>
    </div>
  );
}

export default QuestionList;
