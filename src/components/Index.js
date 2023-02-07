import React, { useState, useEffect } from 'react'
import Displayer from './Displayer'
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
   onReady,
   onReject,
   setSocket,
} from '../methods/webRTCHandler'
import moment from 'moment'
import Notif from './Notif'

const socket = io.connect('/')

const Data = React.createContext(null)

const maxHeight = window.innerHeight

const Index = () => {
   const [data, setData] = useState(
      JSON.parse(window.sessionStorage.getItem('datas'))
   )
   const [isLogIn, setLogin] = useState(
      window.sessionStorage.getItem('islogin')
   )
   const [isLoaded, setIsLoaded] = useState(false)
   const [chats, setChats] = useState([])
   const [groups, setGroups] = useState([])
   const [mailMode, setMailMode] = useState(null)
   const [mode, setMode] = useState({
      mode: 'welcome',
   })
   const [isToView, setIsToView] = useState(null)
   const [current, setCurrent] = useState(null)
   const [notifs, setNotifs] = useState(null)
   const logout = () => {
      setData(null)
      setLogin(false)
      setIsLoaded(false)
      setChats([])
      setGroups([])
      setMailMode(null)
      setMode({ mode: 'welcome' })
      setIsToView(null)
      window.sessionStorage.setItem('islogin', false)
      window.sessionStorage.setItem('datas', null)
   }

   const [isGroupLoaded, setGroupIsLoaded] = useState(false)

   const setActive = (id) => {
      for (let i = 0; i < chats.length; i++) {
         if (i === id) {
            document.getElementById(id).classList.add('active')
         } else {
            document.getElementById(i).classList.remove('active')
         }
      }
   }

   const setActive2 = (id) => {
      for (let i = 0; i < groups.length; i++) {
         if (i === id) {
            document.getElementById(id).classList.add('active')
         } else {
            document.getElementById(i).classList.remove('active')
         }
      }
   }

   const setNavActive = (id) => {
      const selections = ['chat', 'create', 'group']
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

   const sendEmailSocket = (data) => {
      socket.emit('send-email', data)
   }

   const onRecieveEmail = (data) => {
      const currentChat = chats.find((c) => c.email === data.from)
      const prevChats = chats.filter((c) => c.email !== data.from)
      if (currentChat) {
         setNotifs(data.from + ' message you')
         const obj = {
            name: '',
            from: data.from,
            to: data.to,
            date: moment(data.date).format('MMMM DD, YYYY hh:mm:ss a'),
            subject: data.subject,
            text: data.text,
            html: data.html,
         }
         currentChat.hasNewMessage = true
         currentChat.messageLists.unshift(obj)
         setChats([...prevChats, currentChat])
      }
   }

   const sendGroupEmailSocket = (data) => {
      socket.emit('send-group-email', data)
   }

   const onRecieveGroupEmail = (data) => {
      const currentChat = groups.find((c) => c.groupId === data.subject)
      const prevChats = groups.filter((c) => c.groupId !== data.subject)
      if (currentChat) {
         setNotifs(data.from + ' has new message from group')
         const obj = {
            from: data.from,
            to: data.to,
            date: data.date,
            subject: data.subject,
            text: data.text,
            html: data.html,
         }
         currentChat.hasNewMessage = true
         currentChat.chatLists.unshift(obj)
         setGroups([...prevChats, currentChat])
      }
   }

   useEffect(() => {
      socket.on('recieve-email', (data) => {
         onRecieveEmail(data)
      })
      return () => {
         socket.off('recieve-email')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [chats])

   useEffect(() => {
      socket.on('recieve-group-email', (data) => {
         onRecieveGroupEmail(data)
      })
      return () => {
         socket.off('recieve-group-email')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [groups])

   useEffect(() => {
      setSocket(socket)

      socket.on('candidate', (candidate) => {
         onCandidate(candidate)
      })

      socket.on('calling', (name, callerId, mode) => {
         if (mode === 'video-call') {
            setMode({
               mode: 'incoming-video-call',
               name: name,
               callerId: callerId,
            })
         } else {
            setMode({
               mode: 'incoming-audio-call',
               name: name,
               callerId: callerId,
            })
         }
      })

      socket.on('offer', (description) => {
         onOffer(description)
      })

      socket.on('ready', () => {
         onReady()
      })

      socket.on('answer', async (answer) => {
         onAnswer(answer)
      })

      socket.on('reject', () => {
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
            chats,
            sendEmailSocket,
            sendGroupEmailSocket,
            setChats,
            groups,
            setGroups,
            mailMode,
            setMailMode,
            mode,
            setMode,
            setNavActive,
            setActive,
            setActive2,
            isToView,
            setIsToView,
            current,
            setCurrent,
            setNotifs,
            isGroupLoaded,
            setGroupIsLoaded,
         }}
      >
         <Notif notification={notifs} />
         <Displayer />
      </Data.Provider>
   )
}

export { Data }

export default Index
