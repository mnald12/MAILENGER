import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment'
import { useEffect, useState, useContext, useRef } from 'react'
import Avatar from 'react-avatar'
import sendEmail from '../methods/sendEmail'
import { Data } from './Index'

const ChatViewer = ({ convs }) => {
   const {
      mode,
      data,
      chats,
      setChats,
      isToView,
      setIsToView,
      setMode,
      current,
      setCurrent,
      sendEmailSocket,
   } = useContext(Data)

   const [contents, setContents] = useState(null)
   const [subs, setSubs] = useState('')
   const editorRef = useRef(null)
   const [key, setKey] = useState(1)

   const [scrollPos, setScrollPos] = useState(null)

   const send = () => {
      const res = sendEmail({
         host: data.smtpHost,
         port: data.smtpPort,
         pwd: data.pwd,
         from: data.email,
         to: convs.email,
         subject: subs,
         text: '',
         html: editorRef.current.getContent(),
      })

      if (res === 'success') {
         sendEmailSocket({
            from: data.email,
            date: moment().valueOf(),
            to: convs.email,
            subject: subs,
            html: editorRef.current.getContent(),
         })
         setSubs('')
         setKey(key + 1)

         let d = new Date()
         setChats(() => {
            return chats.map((c) => {
               if (c.id === convs.id) {
                  c.messageLists.unshift({
                     from: data.email,
                     to: convs.email,
                     date: moment(d).format('MMMM DD, YYYY hh:mm:ss a'),
                     subject: subs,
                     text: '',
                     html: editorRef.current.getContent(),
                  })
                  return c
               }
               return c
            })
         })
      }
   }

   const exit = () => {
      setIsToView(null)
      setTimeout(() => {
         document.getElementById('main-content').scrollTop = scrollPos
      }, 100)
   }

   useEffect(() => {
      if (current) {
         setTimeout(() => {
            document.getElementById('main-content').scrollTop =
               current.scrollPos
         }, 100)
      } else {
         document.getElementById('main-content').scrollTop = 0
      }
   }, [current, mode])

   useEffect(() => {
      setIsToView(null)
      setContents(
         convs.messageLists.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
         })
      )
   }, [convs, setIsToView])

   if (isToView) {
      document.getElementById('main-content').scrollTop = 0
      return (
         <>
            <div className="fix-header">
               <Avatar name={convs.name} size="30" round={true} />
               <h3 style={{ marginLeft: '8px' }}> {convs.name}</h3>
               <button onClick={() => exit()}>Back</button>
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: isToView }}></div>
         </>
      )
   } else {
      if (contents) {
         return (
            <>
               <div className="fix-header">
                  <Avatar name={convs.name} size="30" round={true} />
                  <h3 style={{ marginLeft: '8px' }}> {convs.name}</h3>
                  <button
                     className="call"
                     onClick={() => {
                        setCurrent({
                           mode: 'chat-view',
                           conversation: convs,
                           scrollPos:
                              document.getElementById('main-content').scrollTop,
                        })
                        setMode({
                           mode: 'audio-call',
                           type: 'callee',
                           email: convs.email,
                           name: convs.name,
                        })
                     }}
                  >
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
                     onClick={() => {
                        setCurrent({
                           mode: 'chat-view',
                           conversation: convs,
                           scrollPos:
                              document.getElementById('main-content').scrollTop,
                        })
                        setMode({
                           mode: 'video-call',
                           type: 'caller',
                           email: convs.email,
                           name: convs.name,
                        })
                     }}
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
                  <div
                     className={mess.from === data.email ? 'right' : 'left'}
                     key={id}
                  >
                     <div
                        className={'message'}
                        onClick={() => {
                           setScrollPos(
                              document.getElementById('main-content').scrollTop
                           )
                           setIsToView(mess.html)
                        }}
                     >
                        <i style={{ color: 'black' }}>{mess.date}</i>
                        <hr
                           style={{ marginBottom: '10px', marginTop: '10px' }}
                        />
                        <h3>{mess.subject ? mess.subject : 'No subject'}</h3>
                        <br />
                        <h5>
                           {mess.text ? (
                              mess.text.substring(0, 200)
                           ) : (
                              <div
                                 dangerouslySetInnerHTML={{ __html: mess.html }}
                              ></div>
                           )}
                        </h5>
                     </div>
                  </div>
               ))}
               <div
                  className={contents.length < 3 ? 'fit-yes' : 'fit-no'}
               ></div>
               <div className="fix-footer">
                  <div className="inputs">
                     <input
                        value={subs}
                        onChange={(e) => setSubs(e.target.value)}
                        placeholder="Subject.."
                     />
                     <Editor
                        key={key}
                        className="editor"
                        apiKey="2e4rt61pepx5xgo2mchhc3x9edy93wooey5syeecpk4trzor"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                           height: 80,
                           menubar: false,
                           statusbar: false,
                           plugins: [
                              'advlist autolink lists link image charmap print anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help',
                              'image',
                              'table',
                           ],
                           toolbar:
                              'undo redo | formatselect | ' +
                              'bold italic backcolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help' +
                              'image' +
                              'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                           content_style:
                              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                     />
                  </div>
                  <div className="actions">
                     <button
                        onClick={() => send()}
                        className="sendBtn"
                        title="send"
                     >
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
                     </button>
                  </div>
               </div>
            </>
         )
      } else {
         return <h3>Loading...</h3>
      }
   }
}

export default ChatViewer
