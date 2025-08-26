import React, { useState } from "react";
import "./index.css";
import Fuse from "fuse.js";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  // ✅ 25 Products with CO2, Water, Waste + Breakdown
  const products = {
    milk: {
      carbon: "2.1 kg CO₂",
      water: "628 L",
      waste: "0.2 kg",
      breakdown: {
        farming: { percent: 60, co2: "1.3 kg", water: "500 L", waste: "0.1 kg" },
        packaging: { percent: 25, co2: "0.5 kg", water: "100 L", waste: "0.05 kg" },
        transport: { percent: 15, co2: "0.3 kg", water: "28 L", waste: "0.05 kg" }
      }
    },
    rice: {
      carbon: "4.0 kg CO₂",
      water: "2500 L",
      waste: "0.4 kg",
      breakdown: {
        farming: { percent: 70, co2: "2.8 kg", water: "2200 L", waste: "0.2 kg" },
        packaging: { percent: 20, co2: "0.8 kg", water: "200 L", waste: "0.1 kg" },
        transport: { percent: 10, co2: "0.4 kg", water: "100 L", waste: "0.1 kg" }
      }
    },
    smartphone: {
      carbon: "70 kg CO₂",
      water: "12000 L",
      waste: "1.5 kg",
      breakdown: {
        manufacturing: { percent: 80, co2: "56 kg", water: "9000 L", waste: "1 kg" },
        packaging: { percent: 10, co2: "7 kg", water: "2000 L", waste: "0.3 kg" },
        transport: { percent: 10, co2: "7 kg", water: "1000 L", waste: "0.2 kg" }
      }
    },
    toothpaste: {
      carbon: "1.2 kg CO₂",
      water: "150 L",
      waste: "0.1 kg",
      breakdown: {
        manufacturing: { percent: 60, co2: "0.7 kg", water: "90 L", waste: "0.05 kg" },
        packaging: { percent: 25, co2: "0.3 kg", water: "40 L", waste: "0.03 kg" },
        transport: { percent: 15, co2: "0.2 kg", water: "20 L", waste: "0.02 kg" }
      }
    },
    shampoo: {
      carbon: "2.5 kg CO₂",
      water: "500 L",
      waste: "0.3 kg",
      breakdown: {
        manufacturing: { percent: 65, co2: "1.6 kg", water: "300 L", waste: "0.2 kg" },
        packaging: { percent: 20, co2: "0.5 kg", water: "100 L", waste: "0.05 kg" },
        transport: { percent: 15, co2: "0.4 kg", water: "100 L", waste: "0.05 kg" }
      }
    },
    sugar: {
      carbon: "3.0 kg CO₂",
      water: "1500 L",
      waste: "0.2 kg",
      breakdown: {
        farming: { percent: 70, co2: "2.1 kg", water: "1200 L", waste: "0.1 kg" },
        packaging: { percent: 20, co2: "0.6 kg", water: "200 L", waste: "0.05 kg" },
        transport: { percent: 10, co2: "0.3 kg", water: "100 L", waste: "0.05 kg" }
      }
    },
    oil: {
      carbon: "2.8 kg CO₂",
      water: "1400 L",
      waste: "0.2 kg",
      breakdown: {
        farming: { percent: 65, co2: "1.8 kg", water: "1000 L", waste: "0.1 kg" },
        packaging: { percent: 20, co2: "0.6 kg", water: "200 L", waste: "0.05 kg" },
        transport: { percent: 15, co2: "0.4 kg", water: "200 L", waste: "0.05 kg" }
      }
    },
    bread: {
      carbon: "1.5 kg CO₂",
      water: "500 L",
      waste: "0.15 kg",
      breakdown: {
        farming: { percent: 60, co2: "0.9 kg", water: "300 L", waste: "0.07 kg" },
        packaging: { percent: 25, co2: "0.4 kg", water: "100 L", waste: "0.05 kg" },
        transport: { percent: 15, co2: "0.2 kg", water: "100 L", waste: "0.03 kg" }
      }
    },
    butter: {
      carbon: "8.0 kg CO₂",
      water: "3000 L",
      waste: "0.5 kg",
      breakdown: {
        farming: { percent: 70, co2: "5.6 kg", water: "2500 L", waste: "0.3 kg" },
        packaging: { percent: 20, co2: "1.6 kg", water: "300 L", waste: "0.1 kg" },
        transport: { percent: 10, co2: "0.8 kg", water: "200 L", waste: "0.1 kg" }
      }
    },
    cheese: {
      carbon: "13.5 kg CO₂",
      water: "5000 L",
      waste: "0.7 kg",
      breakdown: {
        farming: { percent: 75, co2: "10 kg", water: "4000 L", waste: "0.4 kg" },
        packaging: { percent: 15, co2: "2 kg", water: "600 L", waste: "0.2 kg" },
        transport: { percent: 10, co2: "1.5 kg", water: "400 L", waste: "0.1 kg" }
      }
    },
    laptop: {
      carbon: "200 kg CO₂",
      water: "20000 L",
      waste: "3 kg",
      breakdown: {
        manufacturing: { percent: 80, co2: "160 kg", water: "16000 L", waste: "2 kg" },
        packaging: { percent: 10, co2: "20 kg", water: "2000 L", waste: "0.5 kg" },
        transport: { percent: 10, co2: "20 kg", water: "2000 L", waste: "0.5 kg" }
      }
    },
    headphones: {
      carbon: "30 kg CO₂",
      water: "5000 L",
      waste: "0.8 kg",
      breakdown: {
        manufacturing: { percent: 75, co2: "22.5 kg", water: "3800 L", waste: "0.5 kg" },
        packaging: { percent: 15, co2: "4.5 kg", water: "800 L", waste: "0.2 kg" },
        transport: { percent: 10, co2: "3 kg", water: "400 L", waste: "0.1 kg" }
      }
    },
    charger: {
      carbon: "15 kg CO₂",
      water: "2500 L",
      waste: "0.5 kg",
      breakdown: {
        manufacturing: { percent: 70, co2: "10.5 kg", water: "1800 L", waste: "0.3 kg" },
        packaging: { percent: 20, co2: "3 kg", water: "500 L", waste: "0.1 kg" },
        transport: { percent: 10, co2: "1.5 kg", water: "200 L", waste: "0.1 kg" }
      }
    },
    book: {
      carbon: "7 kg CO₂",
      water: "1000 L",
      waste: "0.2 kg",
      breakdown: {
        paper: { percent: 70, co2: "5 kg", water: "800 L", waste: "0.1 kg" },
        printing: { percent: 20, co2: "1.4 kg", water: "150 L", waste: "0.05 kg" },
        transport: { percent: 10, co2: "0.6 kg", water: "50 L", waste: "0.05 kg" }
      }
    },
    pen: {
      carbon: "0.8 kg CO₂",
      water: "50 L",
      waste: "0.05 kg",
      breakdown: {
        manufacturing: { percent: 60, co2: "0.5 kg", water: "30 L", waste: "0.02 kg" },
        packaging: { percent: 25, co2: "0.2 kg", water: "15 L", waste: "0.02 kg" },
        transport: { percent: 15, co2: "0.1 kg", water: "5 L", waste: "0.01 kg" }
      }
    },
    notebook: {
      carbon: "2 kg CO₂",
      water: "300 L",
      waste: "0.1 kg",
      breakdown: {
        paper: { percent: 70, co2: "1.4 kg", water: "220 L", waste: "0.05 kg" },
        printing: { percent: 20, co2: "0.4 kg", water: "60 L", waste: "0.03 kg" },
        transport: { percent: 10, co2: "0.2 kg", water: "20 L", waste: "0.02 kg" }
      }
    },
    chair: {
      carbon: "40 kg CO₂",
      water: "3000 L",
      waste: "1.2 kg",
      breakdown: {
        manufacturing: { percent: 70, co2: "28 kg", water: "2200 L", waste: "0.8 kg" },
        packaging: { percent: 20, co2: "8 kg", water: "600 L", waste: "0.3 kg" },
        transport: { percent: 10, co2: "4 kg", water: "200 L", waste: "0.1 kg" }
      }
    },
    table: {
      carbon: "60 kg CO₂",
      water: "4000 L",
      waste: "2 kg",
      breakdown: {
        manufacturing: { percent: 75, co2: "45 kg", water: "3000 L", waste: "1.5 kg" },
        packaging: { percent: 15, co2: "9 kg", water: "600 L", waste: "0.3 kg" },
        transport: { percent: 10, co2: "6 kg", water: "400 L", waste: "0.2 kg" }
      }
    },
    fan: {
      carbon: "25 kg CO₂",
      water: "2000 L",
      waste: "0.7 kg",
      breakdown: {
        manufacturing: { percent: 70, co2: "17.5 kg", water: "1500 L", waste: "0.5 kg" },
        packaging: { percent: 20, co2: "5 kg", water: "300 L", waste: "0.1 kg" },
        transport: { percent: 10, co2: "2.5 kg", water: "200 L", waste: "0.1 kg" }
      }
    },
    fridge: {
      carbon: "250 kg CO₂",
      water: "15000 L",
      waste: "4 kg",
      breakdown: {
        manufacturing: { percent: 80, co2: "200 kg", water: "12000 L", waste: "3 kg" },
        packaging: { percent: 10, co2: "25 kg", water: "2000 L", waste: "0.5 kg" },
        transport: { percent: 10, co2: "25 kg", water: "1000 L", waste: "0.5 kg" }
      }
    },
    tv: {
      carbon: "150 kg CO₂",
      water: "10000 L",
      waste: "2.5 kg",
      breakdown: {
        manufacturing: { percent: 75, co2: "112 kg", water: "7500 L", waste: "1.8 kg" },
        packaging: { percent: 15, co2: "22.5 kg", water: "2000 L", waste: "0.5 kg" },
        transport: { percent: 10, co2: "15 kg", water: "500 L", waste: "0.2 kg" }
      }
    },
    watch: {
      carbon: "20 kg CO₂",
      water: "1500 L",
      waste: "0.4 kg",
      breakdown: {
        manufacturing: { percent: 70, co2: "14 kg", water: "1000 L", waste: "0.2 kg" },
        packaging: { percent: 20, co2: "4 kg", water: "300 L", waste: "0.1 kg" },
        transport: { percent: 10, co2: "2 kg", water: "200 L", waste: "0.1 kg" }
      }
    },
    shoes: {
      carbon: "30 kg CO₂",
      water: "2500 L",
      waste: "1 kg",
      breakdown: {
        manufacturing: { percent: 75, co2: "22.5 kg", water: "2000 L", waste: "0.7 kg" },
        packaging: { percent: 15, co2: "4.5 kg", water: "300 L", waste: "0.2 kg" },
        transport: { percent: 10, co2: "3 kg", water: "200 L", waste: "0.1 kg" }
      }
    },
    bag: {
      carbon: "18 kg CO₂",
      water: "1200 L",
      waste: "0.5 kg",
      breakdown: {
        manufacturing: { percent: 70, co2: "12.6 kg", water: "800 L", waste: "0.3 kg" },
        packaging: { percent: 20, co2: "3.6 kg", water: "300 L", waste: "0.1 kg" },
        transport: { percent: 10, co2: "1.8 kg", water: "100 L", waste: "0.1 kg" }
      }
    },
    sofa: {
      carbon: "90 kg CO₂",
      water: "7000 L",
      waste: "3 kg",
      breakdown: {
        manufacturing: { percent: 70, co2: "63 kg", water: "5000 L", waste: "2 kg" },
        packaging: { percent: 20, co2: "18 kg", water: "1500 L", waste: "0.7 kg" },
        transport: { percent: 10, co2: "9 kg", water: "500 L", waste: "0.3 kg" }
      }
    }
  };

  // ✅ Fuse.js se spelling mistake handle
  const fuse = new Fuse(Object.keys(products), { threshold: 0.4 });

  const handleSearch = () => {
    let itemKey = query.toLowerCase().trim();
    if (!products[itemKey]) {
      const result = fuse.search(itemKey);
      if (result.length > 0) {
        itemKey = result[0].item; // sabse close match
      }
    }
    setResult(products[itemKey] || null);
  };

  return (
    <div className="container">
      <h1>Eco Impact Finder 🌍</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter product (e.g. Milk, Rice, Smartphone)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {result && (
        <div className="result-card">
          <h2>{query.toUpperCase()}</h2>
          <p><strong>Total Carbon Emission:</strong> {result.carbon}</p>
          <p><strong>Total Water Usage:</strong> {result.water}</p>
          <p><strong>Total Waste Generated:</strong> {result.waste}</p>

          <div className="breakdown">
            <h3>Breakdown</h3>
            <ul>
              {Object.entries(result.breakdown).map(([key, val], i) => (
                <li key={i}>
                  <strong>{key}</strong> ({val.percent}%) →
                  CO₂: {val.co2}, Water: {val.water}, Waste: {val.waste}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

