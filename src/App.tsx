import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashBoard from "./pages/DashBoardPage";
import MyDecksPage from "./pages/MyDecksPage";
import MultipleChoicePage from "./pages/MultipleChoicePage";
import QuestionListPage from "./pages/QuestionListPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/flashcards" element={<MyDecksPage />}></Route>
        <Route path="/question-list" element={<QuestionListPage />}></Route>
        <Route path="/multiple-choice" element={<MultipleChoicePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
