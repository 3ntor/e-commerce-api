import React, { useState, useEffect } from 'react';
import './ApiTester.css';
import { API_URL } from '../App';

const ApiTester = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/');
  const [requestBody, setRequestBody] = useState('{}');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [response, setResponse] = useState(null);
  const token = localStorage.getItem('token');
  const endpoints = [
    // Auth
    { method: 'POST', path: '/api/auth/signup', body: '{\n  "name": "user",\n  "email": "user@example.com",\n  "password": "pass"\n}' },
    { method: 'POST', path: '/api/auth/login', body: '{\n  "email": "user@example.com",\n  "password": "pass"\n}' },
    { method: 'GET', path: '/api/auth/me' },

    // User Products
    { method: 'GET', path: '/api/user/products' },
    { method: 'POST', path: '/api/user/products', body: '{\n  "name": "Product 1",\n  "price": 100\n}' },
    { method: 'PUT', path: '/api/user/products/:id', body: '{\n  "name": "Updated name"\n}' },
    { method: 'DELETE', path: '/api/user/products/:id' },

    // Wishlist
    { method: 'GET', path: '/api/user/wishlist' },
    { method: 'POST', path: '/api/user/wishlist', body: '{\n  "productId": "<id>"\n}' },
    { method: 'DELETE', path: '/api/user/wishlist/:id' },

    // Admin (requires admin role)
    { method: 'GET', path: '/api/admin/admins' },
    { method: 'POST', path: '/api/admin/admins', body: '{\n  "name": "new admin",\n  "email": "new@admin.com",\n  "password": "pass"\n}' },
    { method: 'PUT', path: '/api/admin/admins/:id', body: '{\n  "name": "updated"\n}' },
    { method: 'DELETE', path: '/api/admin/admins/:id' },

    { method: 'GET', path: '/api/admin/categories' },
    { method: 'POST', path: '/api/admin/categories', body: '{\n  "name": "cat"\n}' },
    { method: 'PUT', path: '/api/admin/categories/:id', body: '{\n  "name": "cat2"\n}' },
    { method: 'DELETE', path: '/api/admin/categories/:id' },

    { method: 'GET', path: '/api/admin/products' },
    { method: 'POST', path: '/api/admin/products', body: '{\n  "name": "prod",\n  "price": 10\n}' },
    { method: 'PUT', path: '/api/admin/products/:id', body: '{\n  "price": 15\n}' },
    { method: 'DELETE', path: '/api/admin/products/:id' },
  ];

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('apiHistory')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('apiHistory', JSON.stringify(history));
  }, [history]);

  const clearHistory = () => {
    localStorage.removeItem('apiHistory');
    setHistory([]);
  };

  const deleteHistory = (id) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('apiHistory', JSON.stringify(updated));
      return updated;
    });
  };

  const buildUrl = () => {
    if (method !== 'GET') return `http://localhost:5000${endpoint}`;
    const qs = `page=${page}&limit=${limit}`;
    if (endpoint.includes('?')) return `http://localhost:5000${endpoint}&${qs}`;
    return `http://localhost:5000${endpoint}?${qs}`;
  };

  const handleSend = async () => {
    try {
      const res = await fetch(buildUrl(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: method === 'GET' || method === 'DELETE' ? undefined : requestBody
      });
      const text = await res.text();
      const ok = res.ok ? '✔️ OK' : '❌';
      setResponse(`${ok}  ${res.status} ${res.statusText}\n\n${text}`);
      setHistory(prev => [...prev, { id: Date.now(), method, endpoint, status: res.status, ok: res.ok }]);
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div className="api-tester-container">
      <h2>API Tester</h2>
      <div className="endpoint-list">
        {endpoints.map(ep => (
          <button key={ep.path}
            onClick={() => { setMethod(ep.method); setEndpoint(ep.path); if (ep.body) setRequestBody(ep.body); }}
            className="endpoint-btn">
            {ep.method} {ep.path}
          </button>
        ))}
      </div>
      <div className="form-group">
        <label>Method</label>
        <select value={method} onChange={e => setMethod(e.target.value)}>
          {['GET', 'POST', 'PUT', 'DELETE'].map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Endpoint (relative to http://localhost:5000)</label>
        <input value={endpoint} onChange={e => setEndpoint(e.target.value)} />
      </div>
      {method === 'GET' && (
        <div className="pagination-inputs">
          <label>Page</label>
          <input type="number" min="1" value={page} onChange={e=>setPage(e.target.value)} />
          <label>Limit</label>
          <input type="number" min="1" value={limit} onChange={e=>setLimit(e.target.value)} />
        </div>
      )}
      {(method !== 'GET' && method !== 'DELETE') && (
        <div className="form-group">
          <label>Body (JSON)</label>
          <textarea rows={6} value={requestBody} onChange={e => setRequestBody(e.target.value)} />
        </div>
      )}
      <button onClick={handleSend}>Send</button>

      {response && (
        <div className="response-box">
          <h3>Response</h3>
          <pre>{response}</pre>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-box">
          <h3>History <button onClick={clearHistory} className="clear-history-btn">Clear</button></h3>
          <ul>
            {history.slice().reverse().map(item => (
              <li key={item.id}>
                <button onClick={() => deleteHistory(item.id)} className="delete-history-btn">×</button>
                <strong>{item.method}</strong> {item.endpoint} - {item.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiTester;
