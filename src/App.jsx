import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"
import { Page404 } from "./pages/Page404/"
import { SingleQuestionPage, SingleQuestionPageLazy } from "./pages/SingleQuestionPage"
import { AddQuestionPage, AddQuestionPageLazy } from "./pages/AddQuestionPage"
import { EditQuestionPage, EditQuestionPageLazy } from "./pages/EditQuestionPage"
import { AuthProvider } from "./auth/AuthProvider"
import { useAuth } from "./hooks/useAuth"
import { ForbiddenPage } from "./pages/ForbiddenPage"
import { ThemeProvider } from "./theme/ThemeProvider"

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  // replace видаляе попередню сторінку з історії
  return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{from: location.pathname}} replace/>
}

function App() {
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage/>} />
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path="/question/:id" element={<SingleQuestionPageLazy />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/addquestion" element={<AddQuestionPageLazy />} />
                <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
              </Route>
              

              <Route path="*" element={<Page404 />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
    
  )
}

export default App
