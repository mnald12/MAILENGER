import { useContext, useEffect } from 'react'
import { Data } from './Index'
import '../css/Notifs.css'

const Notif = ({ notification }) => {
   const { setNotifs } = useContext(Data)
   useEffect(() => {
      if (notification) {
         document.getElementById('notif').style.top = '30px'
      }

      const notify = setTimeout(() => {
         document.getElementById('notif').style.top = '-100px'
         setNotifs(null)
      }, 5000)

      return () => {
         clearTimeout(notify)
      }
   }, [notification, setNotifs])
   return (
      <div className="notif" id="notif">
         {notification}
      </div>
   )
}

export default Notif
