import React, { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const fetchUrl = baseUrl.endsWith('/') ? `${baseUrl}menu_items` : `${baseUrl}/menu_items`;
        
        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            'apikey': apiKey,
            'Authorization': `Bearer ${apiKey}`
          }
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('API Error or unexpected format:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const breakfast = items.filter(i => i.category === 'breakfast');
  const lunch = items.filter(i => i.category === 'lunch');
  const dinner = items.filter(i => i.category === 'dinner');
  const drinks = items.filter(i => i.category === 'drinks');

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading Menu...</div>;

  return (
    <div className="menu-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Our Menu</h1>

      {[
        { title: 'Breakfast', list: breakfast },
        { title: 'Lunch', list: lunch },
        { title: 'Dinner', list: dinner },
        { title: 'Beverages & Drinks', list: drinks }
      ].map((section) => (
        <section key={section.title} style={{ marginBottom: '40px' }}>
          <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{section.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {section.list.map((item) => (
              <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3 style={{ margin: '10px 0' }}>{item.name}</h3>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${Number(item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Menu;