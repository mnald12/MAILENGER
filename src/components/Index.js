import React, { useState } from 'react'
import { googleLogout } from '@react-oauth/google'
import Displayer from './Displayer'
import '../css/CallModal.css'
import '../css/Content.css'
import '../css/Create.css'
import '../css/Home.css'
import '../css/Login.css'
import '../css/Message.css'
import '../css/Sidebar.css'

const Data = React.createContext(null)

const maxHeight = window.innerHeight

const Index = () => {
   const [data, setData] = useState(null)
   const [isLogIn, setLogin] = useState(false)
   const [isLoaded, setIsLoaded] = useState(false)
   const [message, setMessage] = useState([])
   const [list, setList] = useState([])
   const [sentMessage, setSentMessage] = useState([])
   const [chats, setChats] = useState([])
   const [groups, setGroups] = useState([])
   const [mailMode, setMailMode] = useState()
   const [mode, setMode] = useState({
      mode: 'welcome',
   })
   // eslint-disable-next-line no-unused-vars
   const [hasNext, setHasNext] = useState(null)
   const [isInbox, setIsInbox] = useState(true)
   const [isToView, setIsToView] = useState(null)

   const logout = () => {
      googleLogout()
      sessionStorage.clear()
      setLogin(false)
   }

   const setActive = (id) => {
      for (let i = 0; i < message.length; i++) {
         if (i === id) {
            document.getElementById(id).classList.add('active')
         } else {
            document.getElementById(i).classList.remove('active')
         }
      }
   }

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

   const getNextPage = () => {
      fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.sub}/threads?pageToken=${hasNext}`,
         {
            method: 'get',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: 'Bearer ' + data.access_token,
               Host: 'https://mail.google.com',
            },
         }
      )
         .then((response) => response.json())
         .then((res) => {
            for (let i of res.threads) {
               list.push(i)
            }
            console.log(list.length)
            if (res.nextPageToken) {
               setHasNext(res.nextPageToken)
            } else {
               setHasNext(null)
            }
         })
         .catch(console.error)
   }

   return (
      <Data.Provider
         value={{
            maxHeight,
            data,
            setData,
            isLogIn,
            setLogin,
            isLoaded,
            setIsLoaded,
            logout,
            message,
            setMessage,
            list,
            setList,
            sentMessage,
            setSentMessage,
            chats,
            setChats,
            groups,
            setGroups,
            mailMode,
            setMailMode,
            mode,
            setMode,
            setNavActive,
            setActive,
            getNextPage,
            hasNext,
            setHasNext,
            isInbox,
            setIsInbox,
            isToView,
            setIsToView,
         }}
      >
         <Displayer />
      </Data.Provider>
   )
}

export { Data }

export default Index
