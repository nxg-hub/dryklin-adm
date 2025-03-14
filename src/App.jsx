import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login.jsx';
import HomePage from './shared/Home/Home.jsx/';
import ResetPassword from "./pages/Reset-Password/ResetPassword.jsx";

function App() {
    return (
        <Router>
            <div className="flex">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;