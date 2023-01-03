import Login from './components/Login'
import React from 'react'
import { useState } from 'react'

const ModeContext = React.createContext(null)

function App() {
   const [isLogIn, setLogin] = useState(false)
   const [userData, setUserData] = useState(null)
   return (
      <ModeContext.Provider value={[isLogIn, setLogin, userData, setUserData]}>
         <Login />
      </ModeContext.Provider>
   )
}

export { ModeContext }

export default App
