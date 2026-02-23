import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Menu } from './components/Menu';
import { OrderPage } from './components/OrderPage';

function App() {
  return (
    <Router>
      <nav style={{ 
        padding: "30px 20px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        gap: "20px",
        background: "var(--warm-cream)", 
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}>
        
        <Link to="/" className="btn-secondary" style={{ padding: "10px 24px" }}>
          Menu
        </Link>
        
        <Link to="/order" className="btn-secondary" style={{ padding: "10px 24px" }}>
          Order Now
        </Link>

      </nav>

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;