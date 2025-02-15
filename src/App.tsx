import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoardPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
