import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    console.log('API URL:', API_URL); // Debug log
    
    fetch(`${API_URL}/api/stock-trends`)
      .then((res) => {
        console.log('Response status:', res.status); // Debug log
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log('Received data:', json); // Debug log
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
      <div className="mb-4 p-2 bg-yellow-100 rounded">
        <p><strong>Debug Info:</strong></p>
        <p>API URL: {API_URL}</p>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Data: {data ? 'Received' : 'None'}</p>
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
