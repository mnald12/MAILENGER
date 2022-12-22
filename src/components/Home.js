import '../css/Home.css'
import { useContext } from 'react'
import { ModeContext } from '../App'
import { googleLogout } from '@react-oauth/google'
import Sidebar from './Sidebar'
import Content from './Content'

const Home = () => {
   const [, setLogin, userData] = useContext(ModeContext)

   const logout = () => {
      googleLogout()
      sessionStorage.clear()
      setLogin(false)
   }

   const sideData = {
      id: userData.sub,
      avatar: userData.picture,
      name: userData.name,
      email: userData.email,
      logout,
   }

   return (
      <>
         <div className="container">
            <Sidebar data={sideData} />
            <Content />
         </div>
      </>
   )
}

export default Home
