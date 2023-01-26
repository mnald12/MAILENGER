import React, { useState, useEffect } from 'react'
import Displayer from './Displayer'
import '../css/CallModal.css'
import '../css/Content.css'
import '../css/Create.css'
import '../css/Home.css'
import '../css/Login.css'
import '../css/Message.css'
import '../css/Sidebar.css'
import '../css/Group.css'
import io from 'socket.io-client'
import {
   onAborted,
   onAnswer,
   onCandidate,
   onClose,
   onClose2,
   onOffer,
   onReject,
   setSocket,
} from '../methods/webRTCHandler'
const socket = io.connect('http://localhost:4000')

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
   const [mailMode, setMailMode] = useState(null)
   const [mode, setMode] = useState({
      mode: 'welcome',
   })
   const [hasNext, setHasNext] = useState(null)
   const [isInbox, setIsInbox] = useState(true)
   const [isToView, setIsToView] = useState(null)
   const [current, setCurrent] = useState(null)

   const logout = () => {
      setData(null)
      setLogin(false)
      setIsLoaded(false)
      setMessage([])
      setList([])
      setSentMessage([])
      setChats([])
      setGroups([])
      setMailMode(null)
      setMode({ mode: 'welcome' })
      setHasNext(null)
      setIsInbox(true)
      setIsToView(null)
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

   const addEmailToSocket = (email) => {
      socket.emit('save-user', socket.id, email)
   }

   const getID = (email) => {
      let ID
      socket.emit('get-id', email, (id) => {
         ID = id
      })
      return ID
   }

   useEffect(() => {
      setSocket(socket)

      socket.on('candidate', (candidate) => {
         onCandidate(candidate)
      })

      socket.on('offer', (id, description, name, mode) => {
         if (mode === 'video-call') {
            setMode({
               mode: 'incoming-video-call',
               name: name,
            })
         } else {
            setMode({
               mode: 'incoming-audio-call',
               name: name,
            })
         }
         onOffer(id, description)
      })

      socket.on('answer', async (answer) => {
         onAnswer(answer)
      })

      socket.on('reject', () => {
         console.log('rejects')
         onReject()
      })

      socket.on('aborted', () => {
         onAborted()
      })

      socket.on('close', () => {
         onClose()
      })

      socket.on('close2', () => {
         onClose2()
      })

      return () => {
         socket.off('call-incoming')
      }
   }, [])

   return (
      <Data.Provider
         value={{
            maxHeight,
            data,
            addEmailToSocket,
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
            hasNext,
            setHasNext,
            isInbox,
            setIsInbox,
            isToView,
            setIsToView,
            current,
            setCurrent,
            getID,
         }}
      >
         <Displayer />
      </Data.Provider>
   )
}

export { Data }

export default Index
