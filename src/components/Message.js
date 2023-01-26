import { useContext, useEffect, useState, useRef } from 'react'
import { Data } from './Index'
import { Editor } from '@tinymce/tinymce-react'
import '../css/Message.css'
import Loader from './Loader'
import sendEmail from '../methods/sendEmail'

const Message = ({ datas }) => {
   const { data } = useContext(Data)
   const [isreply, setIsReply] = useState(false)

   const setCond = (cond) => {
      if (cond) {
         setIsReply(true)
      } else {
         setIsReply(false)
      }
   }

   useEffect(() => {
      setCond(false)
   }, [datas])

   const Reply = () => {
      const [to, setTo] = useState(datas.from)
      const [subject, setSubject] = useState('')
      const [key, setKey] = useState(1)
      const editorRef = useRef(null)

      const send = () => {
         if (editorRef.current) {
            const res = sendEmail({
               host: data.smtpHost,
               port: data.smtpPort,
               pwd: data.pwd,
               from: data.email,
               to: to,
               subject: subject,
               text: '',
               html: editorRef.current.getContent(),
            })

            console.log(res)

            if (res === 'success') {
               setKey(key + 1)
               setTo('')
               setSubject('')
            }
         }
      }

      return (
         <>
            <div className="create-form">
               <input
                  type="email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="To: "
               ></input>
            </div>
            <div className="create-form">
               <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject: "
               ></input>
            </div>
            <br></br>
            <div className="create-form">
               <Editor
                  key={key}
                  className="editor"
                  apiKey="2e4rt61pepx5xgo2mchhc3x9edy93wooey5syeecpk4trzor"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                     height: 360,
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
               <button
                  className="sendButton"
                  style={{ transform: 'translateY(10px)' }}
                  onClick={() => send()}
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
                  Send
               </button>
            </div>

            <div className="space"></div>
         </>
      )
   }

   if (datas.html) {
      if (isreply) {
         return (
            <>
               <div className="fix-headers">
                  <button onClick={() => setCond(false)}>Back</button>
               </div>
               <Reply />
            </>
         )
      } else {
         return (
            <>
               <div className="fix-header">
                  <h3>{datas.name ? datas.name : datas.from}</h3>
                  <button onClick={() => setCond(true)}>Reply</button>
               </div>
               <div className="headers">
                  <p className="date">{datas.date}</p>
                  <h3 className="subs">{datas.subject}</h3>
               </div>
               <br />
               <div dangerouslySetInnerHTML={{ __html: datas.html }}></div>
            </>
         )
      }
   } else {
      return <Loader mode={'simple'} />
   }
}

export default Message
