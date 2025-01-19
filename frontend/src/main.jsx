import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  //wrap with browser router from react-router-dom
  //to support of react-router
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
