import { Link, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { Layout } from "antd";
import Header from "./components/layouts/Header";

const { Content } = Layout;

const App: React.FC = () => {
    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <Header />
                <Content style={{ padding: "32px 16px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;