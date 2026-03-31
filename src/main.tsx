import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UIKit from './pages/UIKit.tsx'

const isUIKit = window.location.pathname === '/ui-kit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isUIKit ? <UIKit /> : <App />}
  </StrictMode>,
)
