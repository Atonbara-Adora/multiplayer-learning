import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashBoard from "./pages/DashBoardPage";
import MultipleChoice from "./pages/MultipleChoicePage";
import QuestionList from "./pages/QuestionList";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/question-list" element={<QuestionList deckName={"abc"} questions={[]} />}></Route>
        <Route path="/multiple-choice" element={<MultipleChoice />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
