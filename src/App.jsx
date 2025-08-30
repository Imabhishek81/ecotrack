import React, { useState, useRef } from "react";
import "./index.css";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  `${import.meta.env.VITE_GEMINI_API_KEY}`
);

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pastSearches, setPastSearches] = useState([]);
  const cache = useRef({}); // This is your hashmap

  const handleSearch = async () => {
    setResult(null);
    setError("");
    const key = query.trim().toLowerCase();
    if (!key) return;
    setLoading(true);

    // Check cache first
    if (cache.current[key]) {
      setResult(cache.current[key]);
      setLoading(false);
      return;
    }

    try {
      const prompt = `
        Give me the estimated, close to real and accurate environmental impact for the product "${query}".
        Respond ONLY in JSON with keys: carbon, water, waste, and breakdown (with subkeys for each stage, each having percent, co2, water, waste).
        Example: {"carbon":"2.1 kg CO₂","water":"628 L","waste":"0.2 kg","breakdown":{"farming":{"percent":60,"co2":"1.3 kg","water":"500 L","waste":"0.1 kg"}, "processing":{"percent":30,"co2":"0.6 kg","water":"100 L","waste":"0.05 kg"}, "transport":{"percent":10,"co2":"0.2 kg","water":"28 L","waste":"0.05 kg"}}}
      `;

      const model = genAI.getGenerativeModel({ model: `${import.meta.env.VITE_GEMINI_MODEL}` });
      const result = await model.generateContent([prompt]);
      const response = await result.response;
      const text = await response.text();

      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found in response");
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      const productData = JSON.parse(jsonString);

      cache.current[key] = productData; // Store in cache
      setResult(productData);
      setPastSearches(prev =>
        prev.includes(key)
          ? prev
          : [key, ...prev]
      ); // Update past searches
    } catch (err) {
      setError("Could not fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center justify-start py-8 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Eco Impact Finder <span role="img" aria-label="Earth">🌍</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Enter product (e.g. Milk, Rice, Smartphone)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            disabled={loading}
          />
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}

        {result && (
          <div className="result-card bg-green-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-bold text-green-800 mb-4">{query.toUpperCase()}</h2>
            <div className="space-y-2 mb-4">
              <p>
                <span className="font-semibold text-green-700">Total Carbon Emission:</span>{" "}
                <span className="text-gray-700">{result.carbon}</span>
              </p>
              <p>
                <span className="font-semibold text-blue-700">Total Water Usage:</span>{" "}
                <span className="text-gray-700">{result.water}</span>
              </p>
              <p>
                <span className="font-semibold text-yellow-700">Total Waste Generated:</span>{" "}
                <span className="text-gray-700">{result.waste}</span>
              </p>
            </div>
            <div className="breakdown">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Breakdown</h3>
              <ul className="space-y-1">
                {result.breakdown &&
                  Object.entries(result.breakdown).map(([key, val], i) => (
                    <li key={i} className="pl-2 border-l-4 border-green-200">
                      <span className="font-semibold capitalize">{key}</span> ({val.percent}%)
                      <span className="ml-2 text-gray-600">
                        CO₂: <span className="text-green-700">{val.co2}</span>,{" "}
                        Water: <span className="text-blue-700">{val.water}</span>,{" "}
                        Waste: <span className="text-yellow-700">{val.waste}</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {/* Past Searches Section */}
        {pastSearches.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-green-700 mb-2">Past Searches</h3>
            <div className="flex flex-wrap gap-2">
              {pastSearches.map((item, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1 bg-green-100 rounded-full text-green-800 hover:bg-green-200 transition"
                  onClick={() => {
                    setQuery(item);
                    setResult(cache.current[item]);
                    setError("");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-gray-400 text-xs text-center">
        Made with <span className="text-green-600">♥</span> for sustainability
      </footer>
    </div>
  );
}

export default App;

