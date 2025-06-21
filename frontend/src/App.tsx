import React, { useState } from 'react';

interface QueryResponse {
  result: string;
}

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to validate if question contains a valid domain
  const validateDomain = (text: string): boolean => {
    // Domain regex pattern - matches domains like google.com, microsoft.com, etc.
    const domainRegex = /\b[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z]{2,}\b/;
    return domainRegex.test(text);
  };

  // Function to extract domain from question
  const extractDomain = (text: string): string | null => {
    const domainRegex = /\b[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z]{2,}\b/;
    const match = text.match(domainRegex);
    return match ? match[0] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Please enter your question.');
      return;
    }

    if (!validateDomain(question)) {
      setError('Please include a valid domain name in your question (e.g., google.com, microsoft.com).');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: question }),
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
          <p>Ask questions about any company - include their domain name in your question</p>
        </div>

        <form className="query-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="question">Your Question:</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What does google.com do? Who is the CEO of microsoft.com? What are the main products of apple.com?"
              rows={4}
              disabled={loading}
            />
            <small className="help-text">
              Make sure to include a domain name in your question (e.g., google.com, microsoft.com)
            </small>
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