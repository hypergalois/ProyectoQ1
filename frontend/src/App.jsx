import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RecipesProvider } from "./context/RecipesContext";

import Navbar from "./components/Navbar";

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeFormPage from './pages/RecipeFormPage'
import ProfilePage from './pages/ProfilePage'

import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <RecipesProvider>
        <Router>
          <main>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/add-recipes" element={<RecipeFormPage />} />
                <Route path="/recipes/:id" element={<RecipeFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </Router>
      </RecipesProvider>
    </AuthProvider>
  );
}

export default App;
