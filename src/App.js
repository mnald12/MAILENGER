import './App.css'
import Login from './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { useState } from 'react'

const ModeContext = React.createContext(null)

function App() {
   // eslint-disable-next-line no-unused-vars
   const [isLogIn, setLogin] = useState(false)
   const [credentials, setCredentials] = useState(null)

   return (
      <GoogleOAuthProvider clientId="430037630460-8u0dbl0gpl1r4vttum7hi1ro7ckkub98.apps.googleusercontent.com">
         <ModeContext.Provider
            value={[isLogIn, setLogin, credentials, setCredentials]}
         >
            <Login />
         </ModeContext.Provider>
      </GoogleOAuthProvider>
   )
}

export { ModeContext }

export default App
