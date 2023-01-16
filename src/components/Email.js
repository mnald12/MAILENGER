import { useContext, useEffect, useState } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'

const hideThis = (id) => {
   document.getElementById('side-contents').scrollTop = '0'
   const selections = ['inBox', 'sentBox']

   for (let i of selections) {
      if (i === id) {
         document.getElementById(i).style.display = 'none'
      } else {
         document.getElementById(i).style.display = 'block'
      }
   }
}

const setOn = (id) => {
   document.getElementById('side-contents').scrollTop = '0'
   const selections = ['inbox', 'sentbox']

   for (let i of selections) {
      if (i === id) {
         document.getElementById(i).classList.add('on')
      } else {
         document.getElementById(i).classList.remove('on')
      }
   }
}

const Email = () => {
   const {
      data,
      message,
      sentMessage,
      setMode,
      setActive,
      getNextPage,
      hasNext,
   } = useContext(Data)

   const [length, setLength] = useState(0)
   const [sortedMessages, setSortedMessages] = useState(null)
   const [sortedSentMessages, setSortedSentMessages] = useState(null)

   useEffect(() => {
      setSortedMessages(
         message.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
         })
      )
      setSortedSentMessages(
         sentMessage.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
         })
      )
      setLength(message.length)
   }, [message, message.length, sentMessage])

   if (sortedMessages) {
      return (
         <>
            <div className="mail-select">
               <button
                  id="inbox"
                  onClick={() => {
                     hideThis('sentBox')
                     setOn('inbox')
                     setLength(message.length)
                  }}
                  className="on"
               >
                  Inbox
               </button>
               <button
                  id="sentbox"
                  onClick={() => {
                     hideThis('inBox')
                     setOn('sentbox')
                     setLength(sentMessage.length)
                  }}
               >
                  Sent
               </button>
               <button className="elist">{length} emails</button>
            </div>
            <div id={'inBox'}>
               {sortedMessages.map((mess, id) => (
                  <button
                     id={id}
                     onClick={() => {
                        setMode({
                           mode: 'message',
                           email: data.email,
                           id: data.sub,
                           mId: mess.id,
                           token: data.access_token,
                        })
                        setActive(id)
                     }}
                     title={mess.subject}
                     className="message-list"
                     key={id}
                  >
                     <div className="avtr">
                        <Avatar name={mess.from[0]} size="32" round={true} />
                     </div>

                     <div className="message-info">
                        <h4 className="name">{mess.from[0]}</h4>
                        <p className="subject">{mess.subject}</p>
                        <p className="snippet">{mess.message}</p>
                     </div>
                  </button>
               ))}
               <button
                  className={hasNext ? 'clickable' : 'notClickable'}
                  onClick={() => getNextPage()}
               >
                  Load more +
               </button>
            </div>
            <div id={'sentBox'} style={{ display: 'none' }}>
               {sortedSentMessages.map((mess, id) => (
                  <button
                     id={id}
                     onClick={() => {
                        setMode({
                           mode: 'sentMessage',
                           email: data.email,
                           id: data.sub,
                           mId: mess.id,
                           token: data.access_token,
                        })
                        setActive(id)
                     }}
                     title={mess.subject}
                     className="message-list"
                     key={id}
                  >
                     <div className="avtr">
                        <Avatar name={mess.recieved} size="32" round={true} />
                     </div>

                     <div className="message-info">
                        <h4 className="name">To: {mess.recieved}</h4>
                        <p className="subject">{mess.subject}</p>
                        <p className="snippet">{mess.message}</p>
                     </div>
                  </button>
               ))}
            </div>
         </>
      )
   }
}

export default Email
