import React from "react";
import { Link } from "react-router-dom";
import SunAndSear from "../assets/SunAndSear.png";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <img
        src={SunAndSear}
        alt="Sun and Sear Logo"
        style={{ maxHeight: "150px", marginBottom: "20px" }}
      />
      
      <h1 style={{ color: "var(--dark-roast)", fontSize: "2.5rem", marginBottom: "10px" }}>
        Welcome to Sun and Sear
      </h1>
      <p style={{ color: "var(--sage)", fontSize: "1.2rem", maxWidth: "600px", marginBottom: "30px" }}>
        Experience the perfect blend of wood-fired flavor and modern brunch. 
        From our kitchen to your table, we serve warmth in every dish.
      </p>

      <div className="card" style={{ maxWidth: "500px", padding: "30px" }}>
        <h3 style={{ color: "var(--dark-roast)", marginBottom: "20px" }}>
          Ready to Dine?
        </h3>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
          <Link to="/menu" className="btn-primary">
            View Menu
          </Link>
          <Link to="/chatbot" className="btn-secondary" style={{ border: "2px solid var(--sear-orange)", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", color: "var(--dark-roast)" }}>
            Ask the Waiter
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "40px", color: "var(--dark-roast)" }}>
        <p><strong>Hours:</strong> Daily 8:00 AM - 3:00 PM</p>
        <p><strong>Location:</strong> 123 Brunch Lane, Flavor City</p>
      </div>
    </div>
  );
};

export default Home;