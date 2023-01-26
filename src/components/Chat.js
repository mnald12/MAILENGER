import { useContext } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'

const Chat = () => {
   const { chats, setMode } = useContext(Data)

   return (
      <>
         {chats.map((people, id) => (
            <button
               className="chat-list"
               key={id}
               onClick={() => {
                  setMode({ mode: 'chat-view', conversation: people })
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
                  <p className="subject">
                     {people.messageLists.length === 1
                        ? `${people.messageLists.length} message`
                        : `${people.messageLists.length} messages`}
                  </p>
               </div>
            </button>
         ))}
      </>
   )
}

export default Chat
