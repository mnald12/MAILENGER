import logo from '../images/mylogo.png'
import { useContext, useState, useEffect } from 'react'
import { Data } from './Index'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { LoginSocialGoogle } from 'reactjs-social-login'
import getAllMails from '../methods/getAllMails'
import getChats from '../methods/getChats'
import getMessages from '../methods/getMess'

const intros = [
   'Not just an Email!',
   'Turn your Email into Chat',
   'A smarter Inbox',
   'Chat with anyone, anywhere',
   'Real time chat, real time results',
]

const intro = intros[Math.floor(Math.random() * intros.length)]

let users

const saveUser = (data) => {
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
}

const Logins = () => {
   useEffect(() => {
      const options = {
         method: 'GET',
      }
      fetch('/users', options)
         .then((response) => response.json())
         .then((res) => {
            users = res
         })
         .catch(console.error)
   }, [])

   const {
      setData,
      setLogin,
      setIsLoaded,
      setList,
      setChats,
      setMessage,
      setSentMessage,
   } = useContext(Data)
   const [signup, setSignUp] = useState(false)
   const [email, setEmail] = useState('')
   const [pwd, setPwd] = useState('')
   const [host, setHost] = useState('imap.gmail.com')
   const [port, setPort] = useState('993')
   const [shost, setsHost] = useState('smtp.gmail.com')
   const [sport, setsPort] = useState('465')

   if (signup) {
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
                  <label>IMAP Host :</label>
                  <input
                     value={host}
                     onChange={(e) => setHost(e.target.value)}
                  ></input>
                  <label>IMAP Port :</label>
                  <input
                     value={port}
                     onChange={(e) => setPort(e.target.value)}
                  ></input>
                  <label>SMTP Host :</label>
                  <input
                     value={shost}
                     onChange={(e) => setsHost(e.target.value)}
                  ></input>
                  <label>SMTP Port :</label>
                  <input
                     value={sport}
                     onChange={(e) => setsPort(e.target.value)}
                  ></input>
                  <div className="action-form">
                     <button className="back" onClick={() => setSignUp(false)}>
                        Back
                     </button>
                     <button
                        className="submit"
                        onClick={() => {
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
               <img src={logo} alt="logo"></img>
               <LoginSocialGoogle
                  client_id="430037630460-8u0dbl0gpl1r4vttum7hi1ro7ckkub98.apps.googleusercontent.com"
                  scope="https://mail.google.com"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  typeResponse="accessToken"
                  onResolve={async ({ data }) => {
                     console.log(data)
                     saveUser(data)
                     setLogin(true)
                     setData(data)
                     const all = await getAllMails(data)
                     const msg = getMessages(all, data)
                     const chat = await getChats(all, data)
                     setList(all)
                     setChats(chat)
                     setMessage(msg.inbox)
                     setSentMessage(msg.sent)
                     setIsLoaded(true)
                  }}
                  onReject={(err) => {
                     console.log('login failed')
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
   }
}

export default Logins
