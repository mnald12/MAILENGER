import logo from '../images/mylogo.png'
import { useContext, useState } from 'react'
import { Data } from './Index'
import getChats from '../methods/getChats'
//import getMessages from '../methods/getMess'
import getGroups from '../methods/getGroups'
import getChats2 from '../methods/getChats2'
//import getMessages2 from '../methods/getMess2'

const intros = [
   'Not just an Email!',
   'Turn your Email into Chat',
   'A smarter Inbox',
   'Chat with anyone, anywhere',
]

const intro = intros[Math.floor(Math.random() * intros.length)]

const Logins = () => {
   const {
      setData,
      addEmailToSocket,
      setLogin,
      setIsLoaded,
      chats,
      setChats,
      setGroups,
      setNotifs,
   } = useContext(Data)

   const [isDisabled, setIsDisabled] = useState(false)

   const [signup, setSignUp] = useState(false)
   const [email, setEmail] = useState('')
   const [pwd, setPwd] = useState('')
   const [host, setHost] = useState('imap.gmail.com')
   const [port, setPort] = useState('993')
   const [shost, setsHost] = useState('smtp.gmail.com')
   const [sport, setsPort] = useState('465')

   const getEmails = async () => {
      let init = 1
      let end = 100
      let limit
      let fetched
      let done = false
      let firstAttempt = true

      let chs

      while (!done) {
         let options = {
            method: 'GET',
         }
         if (firstAttempt) {
            await fetch(
               `/users2/${email}/${pwd}/${host}/${port}/${init}/${end}`,
               options
            )
               .then((response) => response.json())
               // eslint-disable-next-line no-loop-func
               .then((res) => {
                  limit = res.total
                  const chat = getChats(res.messages, email)
                  setChats(chat)
                  chs = chat
                  setIsLoaded(true)
                  window.sessionStorage.setItem('isloaded', true)
                  addEmailToSocket(email)
                  if (res.total < end) {
                     done = true
                  } else {
                     init += 100
                     end += 100
                  }
                  fetched = res.messages.length
                  firstAttempt = false
               })
               .catch(console.error)
         } else {
            await fetch(
               `/users2/${email}/${pwd}/${host}/${port}/${init}/${end}`,
               options
            )
               .then((response) => response.json())
               // eslint-disable-next-line no-loop-func
               .then((res) => {
                  if (chats) {
                     const newChat = getChats2(
                        res.messages,
                        chs,
                        email,
                        res.total
                     )
                     chs = newChat
                     setChats([...newChat])
                  }

                  fetched += res.messages.length

                  if (limit === fetched) {
                     done = true
                  } else {
                     init += 100
                     end += 100
                  }
               })
               .catch(console.error)
         }
      }
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
                        disabled={isDisabled}
                        className="submit"
                        onClick={() => {
                           setIsDisabled(true)
                           let options = {
                              method: 'GET',
                           }
                           fetch(
                              `/user/${email}/${pwd}/${host}/${port}`,
                              options
                           )
                              .then((res) => res.json())
                              .then((res) => {
                                 if (res.success) {
                                    const datas = {
                                       email: email,
                                       pwd: pwd,
                                       imapHost: host,
                                       imapPort: port,
                                       smtpHost: shost,
                                       smtpPort: sport,
                                    }
                                    setData(datas)
                                    window.sessionStorage.setItem(
                                       'datas',
                                       JSON.stringify(datas)
                                    )
                                    setLogin(true)
                                    window.sessionStorage.setItem(
                                       'islogin',
                                       true
                                    )
                                    getEmails()
                                    const grps = getGroups(email)
                                    grps.then((res) => {
                                       setGroups(res)
                                    })
                                    setIsDisabled(false)
                                 } else {
                                    setNotifs('wrong email or password')
                                    setIsDisabled(false)
                                 }
                                 return
                              })
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
