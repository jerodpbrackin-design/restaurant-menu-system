import React, { useEffect, useState } from "react";
import SunAndSear from "../assets/SunAndSear.png";

const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const fetchUrl = baseUrl.endsWith("/")
          ? `${baseUrl}menu_items`
          : `${baseUrl}/menu_items`;
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: { apikey: apiKey, Authorization: `Bearer ${apiKey}` },
        });
        const data = await response.json();
        if (Array.isArray(data)) setItems(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = [
    {
      title: "Breakfast",
      list: items.filter((i) => i.category === "breakfast"),
    },
    { title: "Lunch", list: items.filter((i) => i.category === "lunch") },
    { title: "Dinner", list: items.filter((i) => i.category === "dinner") },
    {
      title: "Beverages & Drinks",
      list: items.filter((i) => i.category === "drinks"),
    },
  ];

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          color: "var(--dark-roast)",
        }}
      >
        Loading Menu...
      </div>
    );

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
            OUR MENU
          </p>
        </header>

        {categories.map(
          (section) =>
            section.list.length > 0 && (
              <section key={section.title} style={{ marginBottom: "80px" }}>
                <h2
                  style={{
                    borderBottom: "3px solid var(--sun-gold)",
                    display: "inline-block",
                    paddingBottom: "8px",
                    marginBottom: "30px",
                  }}
                >
                  {section.title}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "30px",
                  }}
                >
                  {section.list.map((item) => (
                    <div
                      key={item.id}
                      className="card"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "15px",
                        }}
                      />
                      <h3 style={{ marginBottom: "10px" }}>{item.name}</h3>
                      <p
                        style={{
                          color: "var(--sear-orange)",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      >
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ),
        )}
      </div>
    </div>
  );
};

export default Menu;
