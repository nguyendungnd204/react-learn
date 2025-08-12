import { Link, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;