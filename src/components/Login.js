/* eslint-disable jsx-a11y/alt-text */
import gmail from '../images/Gmail-logo.png'
import Home from './Home'
import '../css/Login.css'
import { useContext, useState } from 'react'
import { ModeContext } from '../App'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { LoginSocialGoogle } from 'reactjs-social-login'

const intros = [
   'Not just an Email!',
   'Turn your Email into Chat',
   'A smarter Inbox',
   'Chat with anyone, anywhere',
   'Real time chat, real time results',
]

const Login = () => {
   const [isLogIn, setLogin, , setUserData] = useContext(ModeContext)
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
               <div className="welcome">
                  <h2>MAILENGER</h2>
                  <p>{intro}</p>
               </div>
            </div>
            <div className="formContainer">
               <img src={gmail}></img>
               <LoginSocialGoogle
                  client_id="430037630460-8u0dbl0gpl1r4vttum7hi1ro7ckkub98.apps.googleusercontent.com"
                  scope="https://mail.google.com"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }) => {
                     console.log(data)
                     setLogin(true)
                     setUserData(data)
                  }}
                  onReject={(err) => {
                     console.log(err)
                  }}
               >
                  <GoogleLoginButton value={'Log in with Gmail'} />
               </LoginSocialGoogle>
            </div>
         </div>
      )
   }
}

export default Login
