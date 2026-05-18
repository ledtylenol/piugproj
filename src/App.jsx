import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import NewRecipe from './pages/NewRecipe'
import EditRecipe from './pages/EditRecipe'
import Help from './pages/Help'
import Login from './pages/Login'

function RequireAuth({ children }) {
  const { currentUser } = useUser()
  if (!currentUser) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
        <Route index element={<Home />} />
        <Route path="recipe/:id" element={<RecipeDetail />} />
        <Route path="new" element={<NewRecipe />} />
        <Route path="edit/:id" element={<EditRecipe />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  )
}
