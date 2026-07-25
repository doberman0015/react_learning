import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"
import { Page404 } from "./pages/Page404/"


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage/>} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
          <Route path="/addquestion" element={<div>addquestion</div>} />
          <Route path="/question/:id" element={<div>question page</div>} />

          <Route path="*" element={<Page404 />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
