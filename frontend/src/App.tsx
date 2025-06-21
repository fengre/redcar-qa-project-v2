import React, { useState } from 'react';

interface QueryResponse {
  result: string;
}

function App() {
  const [domain, setDomain] = useState('');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim() || !question.trim()) {
      setError('Please fill in both domain and question fields.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      // Create a comprehensive query that includes the domain context
      const fullQuery = `About the company with domain ${domain}: ${question}`;
      
      const response = await fetch('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: fullQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QueryResponse = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Company Query Tool</h1>
          <p>Ask questions about any company using their domain name</p>
        </div>

        <form className="query-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="domain">Company Domain:</label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., google.com, microsoft.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="question">Your Question:</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What does this company do? Who is the CEO? What are their main products?"
              rows={4}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Query'}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <p>Analyzing company information...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result">
            <h3>Analysis Result</h3>
            <div className="result-content">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 