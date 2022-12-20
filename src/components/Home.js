import { useContext } from 'react'
import { ModeContext } from '../App'
import { googleLogout } from '@react-oauth/google'
// import gmailApi from 'react-gmail'
// import { TokenClientConfig } from '@react-oauth/google'
// import { authenticate } from '@google-cloud/local-auth'

const Home = () => {
   const [, setLogin, credentials] = useContext(ModeContext)

   const logout = () => {
      googleLogout()
      sessionStorage.clear()
      setLogin(false)
   }

   //const [state, setState] = useState(null)

   // gmailApi.getMessages(true, 5).then((res) => {
   //    setState({ messages: gmailApi.normalizeData(res) })
   // })

   return (
      <>
         <p>{credentials.credential}</p>
         <button onClick={logout}>logout</button>
      </>
   )
}

export default Home
