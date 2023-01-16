import Profile from './Profile'
import Navbar from './NavBar'
import { useContext } from 'react'
import { Data } from './Index'

const Sidebar = () => {
   const { mailMode } = useContext(Data)

   return (
      <>
         <div className="sidebar">
            <Profile />
            <div className="side-contents" id="side-contents">
               {mailMode}
            </div>
            <Navbar />
         </div>
      </>
   )
}

export default Sidebar
