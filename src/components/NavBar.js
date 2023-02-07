import { useContext, useEffect } from 'react'
import { Data } from './Index'
import Chat from './Chat'
import Group from './Group'

const Navbar = () => {
   const { data, logout, setMailMode, setMode, setNavActive } = useContext(Data)
   useEffect(() => {
      setNavActive('chat')
      setMailMode(<Chat />)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   return (
      <div className="nav-fix-bottom">
         <button
            title="chat"
            id="chat"
            onClick={() => {
               setNavActive('chat')
               setMailMode(<Chat />)
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
            title="compose"
            id="create"
            onClick={() => {
               setNavActive('create')
               setMode({
                  mode: 'create',
                  token: data.pwd,
                  email: data.email,
               })
            }}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="28"
               height="28"
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
            title="group"
            id="group"
            onClick={() => {
               setNavActive('group')
               setMailMode(<Group />)
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

         <button title="logout" onClick={logout}>
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
   )
}

export default Navbar
