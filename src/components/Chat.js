import { useContext, useEffect } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'

const Chat = () => {
   const { chats, setMode } = useContext(Data)

   useEffect(() => console.log(chats))

   return (
      <>
         {chats.map((people, id) => (
            <button
               className="chat-list"
               key={id}
               onClick={() => {
                  setMode({ mode: 'chat-view', conversation: people })
               }}
            >
               <div className="avtr">
                  <Avatar name={people.name} size="28" round={true} />
               </div>
               <div className="chat-info">
                  <h4 className="name">{people.name}</h4>
                  <p className="subject">
                     {people.contents.length === 1
                        ? `${people.contents.length} message`
                        : `${people.contents.length} messages`}
                  </p>
               </div>
            </button>
         ))}
      </>
   )
}

export default Chat
