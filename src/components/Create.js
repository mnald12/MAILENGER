import '../css/Create.css'
import { useState, useRef, useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import sendEmail from '../methods/sendEmail'
import { Data } from './Index'

const Create = () => {
   const { data, setNotifs } = useContext(Data)

   const [to, setTo] = useState('')
   const [subject, setSubject] = useState('')
   const [key, setKey] = useState(1)
   const editorRef = useRef(null)

   const checkEmail = (emailAddress) => {
      const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]'
      const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]'
      const sAtom =
         '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+'
      const sQuotedPair = '\\x5c[\\x00-\\x7f]'
      const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d'
      const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22'
      const sDomain_ref = sAtom
      const sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')'
      const sWord = '(' + sAtom + '|' + sQuotedString + ')'
      const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*'
      const sLocalPart = sWord + '(\\x2e' + sWord + ')*'
      const sAddrSpec = sLocalPart + '\\x40' + sDomain
      const sValidEmail = '^' + sAddrSpec + '$'

      const reValidEmail = new RegExp(sValidEmail)

      return reValidEmail.test(emailAddress)
   }

   const send = () => {
      if (to === '') {
         setNotifs('please add a recipient')
         return
      }

      if (checkEmail(to) === false) {
         setNotifs(`${to} is not a correct email`)
         return
      }

      if (editorRef.current.getContent() === '') {
         setNotifs('please add a message')
         return
      }

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

      if (res === 'success') {
         setKey(key + 1)
         setTo('')
         setSubject('')
         setNotifs('email sent successfully!')
      }
   }

   return (
      <>
         <div className="create-form">
            <input
               type="email"
               required
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
                  height: 400,
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
            <br />
            <button className="sendButton" onClick={() => send()}>
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
