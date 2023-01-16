import { useEffect, useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import '../css/Message.css'
import { Parser } from 'html-to-react'
import Loader from './Loader'

const base64 = require('base-64')

const Message = ({ data }) => {
   const [dataSrc, setDataSrc] = useState(null)
   const [name, setName] = useState(null)
   const [subjects, setSubjects] = useState(null)
   const [snippet, setSnippet] = useState(null)
   const [date, setDate] = useState(null)
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
   }, [data])

   useEffect(() => {
      setDataSrc(null)
      fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.id}/threads/${data.mId}`,
         {
            method: 'get',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: 'Bearer ' + data.token,
               Host: 'https://mail.google.com',
            },
         }
      )
         .then((response) => response.json())
         .then((res) => {
            for (let n of res.messages[0].payload.headers) {
               if (n.name === 'From') {
                  setName(n.value)
               }
               if (n.name === 'Subject') {
                  setSubjects(n.value)
               }
               if (n.name === 'Date') {
                  setDate(n.value)
               }
            }

            setSnippet(res.messages[0].snippet)

            let result = 'parts' in res.messages[0].payload
            if (result) {
               for (let i = 0; i < res.messages[0].payload.parts.length; i++) {
                  if (
                     res.messages[0].payload.parts[i].mimeType === 'text/html'
                  ) {
                     setDataSrc(res.messages[0].payload.parts[i].body.data)
                  }
               }
            } else {
               setDataSrc(res.messages[0].payload.body.data)
            }
         })
         .catch(console.error)
   }, [data.id, data.mId, data.token])

   const Reply = () => {
      const [to, setTo] = useState(name)
      const [subject, setSubject] = useState('')
      const [key, setKey] = useState(1)
      const editorRef = useRef(null)

      const sendMail = () => {
         if (editorRef.current) {
            let options = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  from: data.email,
                  to: to,
                  subject: subject,
                  text: '',
                  html: editorRef.current.getContent(),
                  token: data.token,
               }),
            }
            fetch('/send', options)
               .then((res) => {
                  setTo('')
                  setSubject('')
                  setKey(key + 1)
                  editorRef.current.value = null
                  console.log(res)
               })
               .catch((err) => console.log(err))
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
                     height: 350,
                     menubar: true,
                     plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
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
               <br />
               <button className="sendButton" onClick={sendMail}>
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

   if (dataSrc) {
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
         let htmlSrc = base64.decode(
            dataSrc.replace(/-/g, '+').replace(/_/g, '/')
         )
         return (
            <>
               <div className="fix-header">
                  <h3>{name}</h3>
                  <button onClick={() => setCond(true)}>Reply</button>
               </div>
               <div className="headers">
                  <p className="date">{date}</p>
                  <h3 className="subs">{subjects}</h3>
                  <p className="snpt">{snippet}</p>
               </div>
               <br />
               {Parser().parse(htmlSrc)}
            </>
         )
      }
   } else {
      return <Loader mode={'simple'} />
   }
}

export default Message
