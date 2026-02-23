import React, { useState, useEffect } from "react";
import SunAndSear from "../assets/SunAndSear.png";

const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const aiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [menuContext, setMenuContext] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cooldown, setCooldown] = useState(false); 
  useEffect(() => {
    const getMenu = async () => {
      try {
        const fetchUrl = baseUrl.endsWith("/") ? `${baseUrl}menu_items` : `${baseUrl}/menu_items`;
        const response = await fetch(fetchUrl, {
          headers: { apikey: apiKey, Authorization: `Bearer ${apiKey}` },
        });
        const data = await response.json();
        const menuString = data.map((i) => `${i.name}($${i.price})`).join(", ");
        setMenuContext(menuString);
      } catch (error) {
        console.error("Menu context fetch error:", error);
      }
    };
    getMenu();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping || cooldown) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${aiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              ...history,
              {
                role: "user",
                parts: [
                  {
                    text: `Waiter personality. Menu: ${menuContext}. Question: ${currentInput}`,
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.candidates?.[0]) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
      } else if (response.status === 429) {
        setCooldown(true);
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: "The restaurant is very busy! Give me 30 seconds to get back to you." 
        }]);
        setTimeout(() => setCooldown(false), 30000); 
      } else {
        throw new Error(data.error?.message || "Waitstaff busy.");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble with my notepad. Let's try again in a moment." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
      <img src={SunAndSear} alt="Logo" style={{ maxHeight: "100px", marginBottom: "20px" }} />
      <h2 style={{ color: "var(--dark-roast)", marginBottom: "20px" }}>Ask our AI Waiter</h2>

      <div className="card" style={{ width: "100%", maxWidth: "600px", height: "450px", display: "flex", flexDirection: "column", backgroundColor: "var(--off-white)" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px", marginBottom: "20px", textAlign: "left", borderBottom: "1px solid #eee" }}>
          {messages.length === 0 && <p style={{ color: "var(--sage)", fontStyle: "italic" }}>"Hello! I'm your digital waiter. What can I tell you about our menu today?"</p>}
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: "15px", padding: "8px 12px", borderRadius: "8px", backgroundColor: msg.role === "user" ? "#fff" : "transparent", border: msg.role === "user" ? "1px solid #eee" : "none", color: msg.role === "user" ? "var(--sear-orange)" : "var(--dark-roast)" }}>
              <strong>{msg.role === "user" ? "You: " : "Waiter: "}</strong> {msg.content}
            </div>
          ))}
          {isTyping && <em style={{ fontSize: "0.8rem", color: "var(--sage)" }}>Waiter is typing...</em>}
          {cooldown && <em style={{ fontSize: "0.8rem", color: "red" }}> (Cooling down...)</em>}
        </div>

        <form onSubmit={handleSend} style={{ display: "flex", gap: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={cooldown}
            placeholder={cooldown ? "Wait a moment..." : "What's for breakfast?"}
            style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
          />
          <button type="submit" className="btn-primary" disabled={isTyping || cooldown}>
            {isTyping ? "..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;