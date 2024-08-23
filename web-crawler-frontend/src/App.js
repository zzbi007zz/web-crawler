import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [crawledData, setCrawledData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrawledData();
  }, []);

  const fetchCrawledData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/crawled-data');
      setCrawledData(response.data);
    } catch (error) {
      console.error('Error fetching crawled data:', error);
      setError('Failed to fetch crawled data');
    }
  };

  const preprocessUrl = (input) => {
    let processedUrl = input.trim().toLowerCase();
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }
    if (!processedUrl.startsWith('https://www.') && !processedUrl.startsWith('http://www.')) {
      processedUrl = processedUrl.replace('https://', 'https://www.');
    }
    return processedUrl;
  };

  const handleCrawl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const processedUrl = preprocessUrl(url);
    try {
      const response = await axios.post('http://localhost:3001/api/crawl', { url: processedUrl });
      setCrawledData([response.data]);
      setUrl('');
    } catch (error) {
      console.error('Error crawling URL:', error);
      setError('Failed to crawl the URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Web Crawler</h1>
      <form onSubmit={handleCrawl} className="crawl-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL (e.g., example.com or www.example.com)"
          required
          className="url-input"
        />
        <button type="submit" disabled={loading} className="crawl-button">
          {loading ? 'Crawling...' : 'Crawl'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <h2>Crawled Data:</h2>
      {crawledData.map((item, index) => (
        <div key={index} className="crawled-item">
          <h3>Crawled URL: {item.url}</h3>
          <p>Page Title: {item.title}</p>
          <h4>Links Found: {item.links ? item.links.length : 0}</h4>
          {item.links && item.links.length > 0 ? (
            <div className="table-container">
              <table className="links-table">
                <thead>
                  <tr>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  {item.links.map((link, linkIndex) => (
                    <tr key={linkIndex}>
                      <td>
                        {link.thumbnail ? (
                          <img src={link.thumbnail} alt="Thumbnail" className="thumbnail" />
                        ) : (
                          <span>No thumbnail</span>
                        )}
                      </td>
                      <td>{link.title}</td>
                      <td><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No links found.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;