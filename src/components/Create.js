import '../css/Create.css'
import { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const Create = ({ data }) => {
   const [to, setTo] = useState('')
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
                  height: 380,
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

export default Create
