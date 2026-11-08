// GIVEN FILE: your job is the CSS in src/styles/. Do not edit .tsx files
// (if you must, tell your group first). Class names are fixed; style them.
// App (Part 2): shows the login page, or the Welcome screen after a successful login.
// On refresh, a saved token is checked with GET /users/me before anything is shown.
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BrandPanel from './components/BrandPanel';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import { ApiError, clearToken, getMe, readToken } from './api/auth';
import type { User } from './api/auth';
import './styles/auth.css';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  // If a token exists on load, ask the API who it belongs to first.
  const [checking, setChecking] = useState<boolean>(() => readToken() !== null);

  useEffect(() => {
    const token = readToken();
    if (!token) {
      return;
    }
    getMe(token)
      .then(setUser)
      .catch((error) => {
        if (error instanceof ApiError && error.status === 401) {
          clearToken();
        }
      })
      .finally(() => setChecking(false));
  }, []);

  function handleLogout() {
    clearToken();
    setUser(null);
  }

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        {checking ? (
          <p className="auth-checking">Loading...</p>
        ) : user ? (
          <Welcome user={user} onLogout={handleLogout} />
        ) : (
          <div className="login-layout">
            <BrandPanel />
            <LoginForm onLoggedIn={setUser} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}