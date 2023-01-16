import Login from './components/Login'
import React from 'react'
import { useState } from 'react'

const ModeContext = React.createContext(null)

function App() {
   const [isLogIn, setLogin] = useState(false)
   const [userData, setUserData] = useState(null)
   const [mode, setMode] = useState('email')

   return (
      <ModeContext.Provider
         value={[isLogIn, setLogin, userData, setUserData, mode, setMode]}
      >
         <Login />
      </ModeContext.Provider>
   )
}

export { ModeContext }

export default App
