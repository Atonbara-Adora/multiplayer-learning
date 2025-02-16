import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  DashBoardPage, MyDecksPage, MultipleChoicePage, QuestionListPage, NewGamePage, LiveMultipleChoiceDisplayPage, JoinGamePage
} from "./pages";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoardPage />}></Route>
        <Route path="/flashcards" element={<MyDecksPage />}></Route>
        <Route path="/new-game" element={<NewGamePage />}></Route>
        <Route path="/game/new" element={<NewGamePage />}></Route>
        <Route path="/game/join" element={<JoinGamePage />}></Route>
        <Route path="/game/play" element={<LiveMultipleChoiceDisplayPage />}></Route>
        <Route path="/question-list" element={<QuestionListPage />}></Route>
        <Route path="/multiple-choice/:id" element={<MultipleChoicePage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
