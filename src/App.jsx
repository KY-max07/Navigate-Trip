import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/router'
import { GoogleOAuthProvider } from '@react-oauth/google';  




function App() {
  

  return (
    <>
    
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_API_KEY}>
    
    <RouterProvider router={router}/>
    
   
    </GoogleOAuthProvider>
   
    </>
  )
}

export default App
