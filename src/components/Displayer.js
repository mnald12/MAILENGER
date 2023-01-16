import { useContext } from 'react'
import Content from './Content'
import { Data } from './Index'
import Logins from './Logins'
import Sidebar from './Sidebar'
import Loader from './Loader'

const Displayer = () => {
   const { maxHeight, isLogIn, isLoaded, mode } = useContext(Data)
   if (isLogIn) {
      if (isLoaded) {
         return (
            <>
               <div
                  style={{ height: maxHeight }}
                  className="container"
                  id="container"
               >
                  <Sidebar />
                  <Content contents={mode} />
               </div>
            </>
         )
      } else {
         return <Loader mode={'main'} />
      }
   } else {
      return <Logins />
   }
}

export default Displayer
