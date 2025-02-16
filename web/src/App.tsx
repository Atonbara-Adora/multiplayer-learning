import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  DashBoardPage, MyDecksPage, MultipleChoicePage, QuestionListPage, NewGamePage, LiveMultipleChoiceDisplayPage
} from "./pages";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoardPage />}></Route>
        <Route path="/flashcards" element={<MyDecksPage />}></Route>
        <Route path="/new-game" element={<NewGamePage />}></Route>
        <Route path="/gametime" element={<LiveMultipleChoiceDisplayPage />}></Route>
        <Route path="/question-list" element={<QuestionListPage />}></Route>
        <Route path="/multiple-choice/:id" element={<MultipleChoicePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
