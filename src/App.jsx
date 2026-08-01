import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"
import { Page404 } from "./pages/Page404/"
import { SingleQuestionPage } from "./pages/SingleQuestionPage"
import { AddQuestionPage } from "./pages/AddQuestionPage"


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage/>} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
          <Route path="/addquestion" element={<AddQuestionPage />} />
          <Route path="/question/:id" element={<SingleQuestionPage />} />

          <Route path="*" element={<Page404 />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
