import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import LoginPage from './pages/LoginPage'
import TvShowPage from './pages/TvShowPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MoviesListPage from './pages/MoviesListPage'
import TvShowsListPage from './pages/TvShowsListPage'
import ThemePage from './pages/ThemePage'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'
import { useUserStore } from './store/useUserStore.js'
import { Navigate } from 'react-router-dom'

function App() {
  
  const { theme } = useThemeStore();
  const { authUser } = useUserStore();

  // Apply the selected theme to the body

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesListPage />} />
        <Route path="/tvshows" element={<TvShowsListPage />} />
        <Route path="/tvshow/:id" element={<TvShowPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/themes" element={<ThemePage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Footer />
    </div>
  )
}

export default App
