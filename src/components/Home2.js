import '../css/Home.css'
import '../css/Sidebar.css'
import { useContext } from 'react'
import { ModeContext } from '../App'
import { googleLogout } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import Content from './Content'
import Avatar from 'react-avatar'

const setNavActive = (id) => {
   const selections = ['email', 'chat', 'create', 'group']
   for (let i of selections) {
      if (i === id) {
         document.getElementById(i).classList.add('active')
      } else {
         document.getElementById(i).classList.remove('active')
      }
   }
}

const Home2 = ({ data }) => {
   const [messages, setMessages] = useState()
   const [, setLogin] = useContext(ModeContext)

   const logout = () => {
      googleLogout()
      sessionStorage.clear()
      setLogin(false)
   }

   useEffect(() => {
      let options = {
         method: 'GET',
      }
      fetch(
         `/users2/${data.email}/${data.pwd}/${data.host}/${data.port}`,
         options
      )
         .then((response) => response.json())
         .then((res) => {
            console.log(res)
            console.log(res.length)
            let cf = res.length
            let c = 0

            let messs = []

            for (let i of res) {
               let f = i.from[0].split('<')
               let data = {
                  from: f[0],
                  date: i.date[0],
                  sub: i.subject[0],
                  to: i.to[0],
               }
               messs.push(data)
               c++
            }

            if (c === cf) {
               setMessages(messs)
            }
         })
         .catch(console.error)
   }, [data.email, data.host, data.port, data.pwd])

   const [mode, setMode] = useState({ mode: 'welcome' })

   if (messages) {
      return (
         <>
            <div className="container">
               <div className="sidebar">
                  <div className="profile">
                     <img src={data.avatar} alt={data.name} />
                     <div className="names">
                        <h3 className="ownname">{data.name}</h3>
                        <h5 className="email">{data.email}</h5>
                     </div>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                     >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                     </svg>
                  </div>

                  <div className="side-contents">
                     {messages.map((mess, id) => (
                        <button
                           onClick={() =>
                              setMode({
                                 mode: 'message2',
                              })
                           }
                           title={mess.date}
                           className="message-list"
                           key={id}
                        >
                           <div className="avtr">
                              <Avatar
                                 name={mess.from[0]}
                                 size="32"
                                 round={true}
                              />
                           </div>
                           <div className="message-info">
                              <h4 className="name">{mess.from}</h4>
                              <p className="snippet">{mess.sub}</p>
                           </div>
                        </button>
                     ))}
                  </div>

                  <div className="nav-fix-bottom">
                     <button
                        id="email"
                        onClick={() => {
                           setNavActive('email')
                        }}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="28"
                           height="28"
                           fill="currentColor"
                           className="bi bi-envelope-at-fill"
                           viewBox="0 0 16 16"
                        >
                           <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                           <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                        </svg>
                     </button>
                     <button
                        id="chat"
                        onClick={() => {
                           setNavActive('chat')
                           setMode({
                              mode: 'note',
                           })
                        }}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="28"
                           height="28"
                           fill="currentColor"
                           className="bi bi-chat-dots-fill"
                           viewBox="0 0 16 16"
                        >
                           <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                     </button>
                     <button
                        id="create"
                        onClick={() => {
                           setNavActive('create')
                           setMode({
                              mode: 'create',
                              id: data.id,
                              token: data.token,
                              email: data.email,
                           })
                        }}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="36"
                           height="36"
                           fill="currentColor"
                           className="bi bi-pencil-square"
                           viewBox="0 0 16 16"
                        >
                           <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                           <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                           />
                        </svg>
                     </button>
                     <button
                        id="group"
                        onClick={() => {
                           setNavActive('group')
                           setMode({
                              mode: 'welcome',
                           })
                        }}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="28"
                           height="28"
                           fill="currentColor"
                           className="bi bi-person-lines-fill"
                           viewBox="0 0 16 16"
                        >
                           <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg>
                     </button>
                     <button onClick={logout}>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="30"
                           height="30"
                           fill="currentColor"
                           className="bi bi-power"
                           viewBox="0 0 16 16"
                        >
                           <path d="M7.5 1v7h1V1h-1z" />
                           <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                        </svg>
                     </button>
                  </div>
               </div>
               <Content contents={mode} />
            </div>
         </>
      )
   } else {
      return <div className="loading">Loading...</div>
   }
}

export default Home2
