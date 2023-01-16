import { useEffect, useState, useContext } from 'react'
import Avatar from 'react-avatar'
import { Data } from './Index'
import { Parser } from 'html-to-react'
const base64 = require('base-64')

const ChatViewer = ({ convs }) => {
   const { data, isToView, setIsToView } = useContext(Data)

   const [contents, setContents] = useState(null)
   const [chatMessage, setChatMessage] = useState('')
   const [subs, setSubs] = useState('')
   const [isInCall, setIsInCall] = useState(false)
   const [isInVideoCall, setIsInVideoCall] = useState(false)

   const sendChat = () => {
      console.log(convs.email)
      let options = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            from: data.email,
            to: convs.email,
            subject: subs,
            text: '',
            html: chatMessage,
            token: data.token,
         }),
      }
      fetch('/send', options)
         .then((res) => {
            setSubs('')
            setChatMessage('')
         })
         .catch((err) => console.log(err))
   }

   const exit = () => {
      setIsToView(null)
   }

   const endCall = (mode) => {
      if (mode === 'vcall') {
         setIsInVideoCall(false)
      } else {
         setIsInCall(false)
      }
   }

   useEffect(() => {
      setIsToView(null)
      document.getElementById('main-content').scrollTop = '0'
      console.log(convs.contents)
      setContents(
         convs.contents.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
         })
      )
   }, [convs, setIsToView])

   if (isToView) {
      let htmlSrc = base64.decode(
         isToView.replace(/-/g, '+').replace(/_/g, '/')
      )
      return (
         <>
            <div className="fix-header">
               <Avatar name={convs.name} size="30" round={true} />
               <h3 style={{ marginLeft: '8px' }}> {convs.name}</h3>
               <button onClick={() => exit()}>Back</button>
            </div>
            <br />
            {Parser().parse(htmlSrc)}
         </>
      )
   } else {
      if (contents) {
         if (!isInCall && !isInVideoCall) {
            return (
               <>
                  <div className="fix-header">
                     <Avatar name={convs.name} size="30" round={true} />
                     <h3 style={{ marginLeft: '8px' }}> {convs.name}</h3>
                     <button className="call" onClick={() => setIsInCall(true)}>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           className="bi bi-telephone-forward"
                           viewBox="0 0 16 16"
                        >
                           <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.762.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z" />
                        </svg>
                     </button>
                     <button
                        className="vcall"
                        onClick={() => setIsInVideoCall(true)}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           className="bi bi-camera-video"
                           viewBox="0 0 16 16"
                        >
                           <path
                              fillRule="evenodd"
                              d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
                           />
                        </svg>
                     </button>
                  </div>
                  {contents.map((mess, id) => (
                     <div className={mess.class} key={id}>
                        <div
                           className={'message'}
                           onClick={() => {
                              setIsToView(mess.data)
                           }}
                        >
                           <i>{mess.date}</i>
                           <br />
                           <br />
                           <h3>{mess.subject}</h3>
                           <br />
                           <h5>{mess.snippet}</h5>
                        </div>
                     </div>
                  ))}
                  <div className="fix-footer">
                     <div className="inputs">
                        <input
                           value={subs}
                           onChange={(e) => setSubs(e.target.value)}
                           placeholder="Subject.."
                        />
                        <input
                           value={chatMessage}
                           onChange={(e) => setChatMessage(e.target.value)}
                           placeholder="Your message.."
                        />
                     </div>
                     <div className="actions">
                        <button onClick={() => sendChat()}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-send-fill"
                              viewBox="0 0 16 16"
                           >
                              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                           </svg>
                           Send
                        </button>
                     </div>
                  </div>
               </>
            )
         }
         if (isInCall) {
            return (
               <>
                  <div className="fix-header">
                     <Avatar name={convs.name} size="30" round={true} />
                     <h3 style={{ marginLeft: '8px' }}> {convs.name}</h3>
                     <button
                        className="end-call"
                        onClick={() => endCall('call')}
                     >
                        End call
                     </button>
                  </div>
                  <br />
                  <h1>Calling</h1>
               </>
            )
         }
         if (isInVideoCall) {
            return (
               <>
                  <div className="fix-header">
                     <Avatar name={convs.name} size="30" round={true} />
                     <h3 style={{ marginLeft: '8px' }}> {convs.name}</h3>
                     <button
                        className="end-call"
                        onClick={() => endCall('vcall')}
                     >
                        End call
                     </button>
                  </div>
                  <br />
                  <h1>Video Calling</h1>
               </>
            )
         }
      } else {
         return <h3>Loading...</h3>
      }
   }
}

export default ChatViewer
