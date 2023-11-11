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

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
