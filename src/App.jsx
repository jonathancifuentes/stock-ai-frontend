import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variable with fallback
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    console.log('Environment Variables:', {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      NODE_ENV: process.env.NODE_ENV,
      API_URL: API_URL
    });
    
    console.log('Making request to:', `${API_URL}/api/stock-trends`);
    
    fetch(`${API_URL}/api/stock-trends`)
      .then((res) => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log('Received data:', json);
        setData(json);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(`Failed to load stock data: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📈 Stock Market Trends & AI Suggestions</h1>
      
      {/* Debug info */}
      <div className="mb-4 p-4 bg-yellow-100 rounded border">
        <h2 className="font-bold mb-2">🔍 Debug Information:</h2>
        <div className="text-sm space-y-1">
          <p><strong>REACT_APP_API_URL:</strong> {process.env.REACT_APP_API_URL || 'Not set'}</p>
          <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
          <p><strong>Final API URL:</strong> {API_URL}</p>
          <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>Error:</strong> {error || 'None'}</p>
          <p><strong>Data Received:</strong> {data ? 'Yes' : 'No'}</p>
        </div>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : data ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Market Summary:</h2>
          <pre className="mb-4 bg-gray-50 p-2 rounded text-sm overflow-auto">{JSON.stringify(data.trends, null, 2)}</pre>
          <h2 className="text-xl font-semibold mb-2">AI Suggestions:</h2>
          <ul className="list-disc list-inside">
            {data.suggestions && data.suggestions.length > 0 ? (
              data.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>No suggestions available.</li>
            )}
          </ul>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default App;
