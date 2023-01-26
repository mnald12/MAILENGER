import logo from '../images/mylogo.png'
import { useContext, useState } from 'react'
import { Data } from './Index'
import getChats from '../methods/getChats'
import getMessages from '../methods/getMess'
import getGroups from '../methods/getGroups'

const intros = [
   'Not just an Email!',
   'Turn your Email into Chat',
   'A smarter Inbox',
   'Chat with anyone, anywhere',
   'Real time chat, real time results',
]

const intro = intros[Math.floor(Math.random() * intros.length)]

const Logins = () => {
   const {
      setData,
      addEmailToSocket,
      setLogin,
      setIsLoaded,
      setList,
      setChats,
      setMessage,
      setSentMessage,
      setGroups,
   } = useContext(Data)

   const [signup, setSignUp] = useState(false)
   const [email, setEmail] = useState('')
   const [pwd, setPwd] = useState('')
   const [host, setHost] = useState('imap.gmail.com')
   const [port, setPort] = useState('993')
   const [shost, setsHost] = useState('smtp.gmail.com')
   const [sport, setsPort] = useState('465')

   const getEmails = async () => {
      let options = {
         method: 'GET',
      }
      await fetch(`/users2/${email}/${pwd}/${host}/${port}`, options)
         .then((response) => response.json())
         .then((res) => {
            const chat = getChats(res, email)
            setList(res)
            console.log(chat)
            setChats(chat)
            const emails = getMessages(res, email)
            setMessage(emails.inbox)
            setSentMessage(emails.sent)
            setIsLoaded(true)
            addEmailToSocket(email)
            const grps = getGroups(email)
            grps.then((res) => setGroups(res))
         })
         .catch(console.error)
   }

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
                           setData({
                              email: email,
                              pwd: pwd,
                              imapHost: host,
                              imapPort: port,
                              smtpHost: shost,
                              smtpPort: sport,
                           })
                           setLogin(true)
                           getEmails()
                        }}
                     >
                        Login
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
               <button onClick={() => setSignUp(true)} className="signup-btn">
                  Login with gmail
               </button>
            </div>
         </div>
      )
   }
}

export default Logins
