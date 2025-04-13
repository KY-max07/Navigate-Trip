import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/router'
import { GoogleOAuthProvider } from '@react-oauth/google';  


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_API_KEY}>
    <RouterProvider router={router}/>
    
    <App  />
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
