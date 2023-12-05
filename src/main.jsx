import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContexProvider } from './context/AuthContext.jsx';
import { ChatContexProvider } from './context/ChatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContexProvider>
    <ChatContexProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContexProvider>
  </AuthContexProvider>
);
