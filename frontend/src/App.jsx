import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RecipesProvider } from "./context/RecipesContext";

import Navbar from "./components/Navbar";

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
// Crearlo como un componente y meterlo en profile
// import ProfileRecipesPage from './pages/ProfileRecipesPage'
import ExploreRecipesPage from './pages/ExploreRecipesPage'
import RecipeFormPage from './pages/RecipeFormPage'
import ProfilePage from './pages/ProfilePage'
import RecipeDetailPage from './pages/RecipeDetailPage'

import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <RecipesProvider>
        <Router>
          <main>
            <Navbar />
            <div className="pt-6 p-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/explore" element={<ExploreRecipesPage />} />
                  <Route path="/explore/:id" element={<RecipeDetailPage />} />
                  <Route path="/recipes/add" element={<RecipeFormPage />} />
                  <Route path="/recipes/:id" element={<RecipeFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </div>
          </main>
        </Router>
      </RecipesProvider>
    </AuthProvider>
  );
}

export default App;
