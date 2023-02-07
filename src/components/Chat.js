import { useContext } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'
import { useState } from 'react'
import { useEffect } from 'react'

const Chat = ({ chat }) => {
   const { setMode, setActive, setNavActive } = useContext(Data)
   const [chats, setChats] = useState([])

   useEffect(() => {
      setChats(
         chat.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
         })
      )
   }, [chat])

   return (
      <>
         {chats.map((people, id) => (
            <button
               className={
                  people.hasNewMessage ? 'chat-list notifOn' : 'chat-list'
               }
               id={id}
               key={id}
               onClick={() => {
                  people.hasNewMessage = false
                  setMode({ mode: 'chat-view', conversation: people })
                  setActive(id)
                  setNavActive('chat')
                  setTimeout(() => {
                     document.getElementById('main-content').scrollTop = 0
                  }, 100)
               }}
            >
               <div className="avtr">
                  <Avatar name={people.name} size="28" round={true} />
               </div>
               <div className="chat-info">
                  <h4 className="name">{people.name}</h4>
                  <p className="subject">{people.email}</p>
               </div>
            </button>
         ))}
      </>
   )
}

export default Chat
