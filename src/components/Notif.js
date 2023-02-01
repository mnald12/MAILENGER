import { useContext, useEffect } from 'react'
import { Data } from './Index'
import '../css/Notifs.css'

const Notif = ({ notification }) => {
   const { setNotifs } = useContext(Data)
   useEffect(() => {
      if (notification) {
         document.getElementById('notif').style.height = '40px'
      }

      setTimeout(() => {
         document.getElementById('notif').style.height = '0'
         setNotifs(null)
      }, 3000)
   }, [notification, setNotifs])
   return (
      <div className="notif" id="notif">
         {notification}
      </div>
   )
}

export default Notif
