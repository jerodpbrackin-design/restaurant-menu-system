import React, { useState } from "react";
import SunAndSear from "../assets/SunAndSear.png";

const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const OrderPage = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    order_text: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchUrl = baseUrl.endsWith("/")
        ? `${baseUrl}orders`
        : `${baseUrl}/orders`;

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: { 
          apikey: apiKey, 
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal" 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Order Success!");
        setFormData({ customer_name: "", order_text: "" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to send order.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        className="section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "60px" }}>
          <img
            style={{ maxHeight: "300px", width: "auto", marginBottom: "20px" }}
            src={SunAndSear}
            alt="Sun and Sear logo"
          />
          <p
            style={{
              color: "var(--sage)",
              fontWeight: "600",
              letterSpacing: "1px",
              fontSize: "24px",
            }}
          >
            ORDER NOW
          </p>
        </header>

        <div className="card" style={{ width: "100%", maxWidth: "500px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Name
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Your Order
              </label>
              <textarea
                name="order_text"
                value={formData.order_text}
                onChange={handleChange}
                required
                rows="5"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "inherit" }}
              />
            </div>

            <button type="submit" className="btn-primary">
              Send Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;