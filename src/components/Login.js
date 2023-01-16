import logo from '../images/mylogo.png'
import Home from './Home'
import Home2 from './Home2'
import '../css/Login.css'
import { useContext, useEffect, useState } from 'react'
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

let users = []

const saveUser = (data) => {
   let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         userEmail: data.email,
         userPassword: data.pwd,
         userHost: data.host,
         userPort: data.port,
      }),
   }
   fetch('/users2', options)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
}

const intro = intros[Math.floor(Math.random() * intros.length)]

const Login = () => {
   useEffect(() => {
      let options = {
         method: 'GET',
      }
      fetch('/users', options)
         .then((response) => response.json())
         .then((res) => {
            users = res
         })
         .catch(console.error)
   }, [])

   const [isLogIn, setLogin, , setUserData] = useContext(ModeContext)

   const [signup, setSignUp] = useState(false)
   const [type, setType] = useState(null)

   const [email, setEmail] = useState('')
   const [pwd, setPwd] = useState('')
   const [host, setHost] = useState('imap.gmail.com')
   const [port, setPort] = useState('993')

   const [user2Data, setUser2Data] = useState({})

   if (isLogIn === true) {
      if (type === 'direct') {
         return <Home />
      }
      if (type === 'signups') {
         if (user2Data) {
            return <Home2 data={user2Data} />
         }
      }
   } else if (signup === false) {
      return (
         <div className="container-login">
            <div className="welcomeContainer">
               <div className="welcome">
                  <h2>MAILENGER</h2>
                  <p>{intro}</p>
               </div>
            </div>
            <div className="formContainer">
               <img src={logo} alt="logo"></img>
               <LoginSocialGoogle
                  client_id="430037630460-8u0dbl0gpl1r4vttum7hi1ro7ckkub98.apps.googleusercontent.com"
                  scope="https://mail.google.com"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }) => {
                     console.log(data)
                     let checker = 0

                     for (let i of users) {
                        if (i.userId === data.sub) {
                           checker = checker + 1
                        }
                     }

                     if (checker === 0) {
                        let options = {
                           method: 'POST',
                           headers: { 'Content-Type': 'application/json' },
                           body: JSON.stringify({
                              userName: data.name,
                              userId: data.sub,
                              userAvatar: data.picture,
                              userEmail: data.email,
                           }),
                        }
                        fetch('/users', options)
                           .then((res) => console.log(res))
                           .catch((err) => console.log(err))
                     }

                     setLogin(true)
                     setType('direct')
                     setUserData(data)
                  }}
                  onReject={(err) => {
                     console.log(err)
                  }}
               >
                  <GoogleLoginButton />
               </LoginSocialGoogle>
               <center>OR</center>
               <button onClick={() => setSignUp(true)} className="signup-btn">
                  SignUp
               </button>
            </div>
         </div>
      )
   } else {
      return (
         <div className="container-login">
            <div className="welcomeContainer">
               <div className="welcome">
                  <h2>MAILENGER</h2>
                  <p>{intro}</p>
               </div>
            </div>
            <div className="formContainer">
               <div className="signup-form">
                  <label>Email :</label>
                  <input
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  ></input>

                  <label>Password :</label>
                  <input
                     type="password"
                     placeholder="Please use your app password"
                     value={pwd}
                     onChange={(e) => setPwd(e.target.value)}
                  ></input>
                  <label>Host :</label>
                  <input
                     value={host}
                     onChange={(e) => setHost(e.target.value)}
                  ></input>
                  <label>Port :</label>
                  <input
                     value={port}
                     onChange={(e) => setPort(e.target.value)}
                  ></input>
                  <label>Host :</label>
                  <input
                     value={host}
                     onChange={(e) => setHost(e.target.value)}
                  ></input>
                  <label>Port :</label>
                  <input
                     value={port}
                     onChange={(e) => setPort(e.target.value)}
                  ></input>
                  <div className="action-form">
                     <button className="back" onClick={() => setSignUp(false)}>
                        Back
                     </button>
                     <button
                        className="submit"
                        onClick={() => {
                           setType('signups')
                           let dataToPass = {
                              email: email,
                              pwd: pwd,
                              host: host,
                              port: port,
                           }
                           saveUser(dataToPass)
                           setUser2Data(dataToPass)
                           setLogin(true)
                        }}
                     >
                        Signup
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Login
