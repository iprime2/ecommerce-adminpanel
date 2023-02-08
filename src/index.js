import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { AuthProvider } from './context/AuthProvider'
import { DarkModeContextProvider } from './context/darkModeContext'
import { HashRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HashRouter>
      <DarkModeContextProvider>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AuthProvider>
      </DarkModeContextProvider>
    </HashRouter>
  </React.StrictMode>
)
