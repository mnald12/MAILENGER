/* eslint-disable jsx-a11y/alt-text */
import gmail from '../images/Gmail-logo.png'
import Home from './Home'
import '../css/Login.css'
import { GoogleLogin } from '@react-oauth/google'
import { useContext, useState } from 'react'
import { ModeContext } from '../App'

const intros = [
   'A smarter Inbox',
   'Not just an Email!',
   'Chat with anyone, anywhere',
]

const Login = () => {
   const [isLogIn, setLogin, , setCredentials] = useContext(ModeContext)
   const [intro, setIntro] = useState(intros[0].message)

   window.setTimeout(() => {
      setIntro(intros[Math.floor(Math.random() * intros.length)])
   }, 3000)

   if (isLogIn === true) {
      return <Home />
   } else {
      return (
         <div className="container">
            <div className="welcomeContainer">
               <h1>Welcome to MAILENGER!</h1>
               <br></br>
               <h2>{intro}</h2>
            </div>
            <div className="formContainer">
               <img src={gmail}></img>
               <GoogleLogin
                  onSuccess={(credentialResponse) => {
                     setLogin(true)
                     setCredentials(credentialResponse)
                     console.log(credentialResponse)
                  }}
                  onError={() => {
                     console.log('Login Failed')
                  }}
               />
            </div>
         </div>
      )
   }
}

export default Login
