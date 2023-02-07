import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment'
import { useEffect, useState, useContext, useRef } from 'react'
import Avatar from 'react-avatar'
import sendEmail from '../methods/sendEmail'
import { Data } from './Index'
import Loader from './Loader'

const GruopChatViewer = ({ convs }) => {
   const { data, setMode, sendGroupEmailSocket } = useContext(Data)

   const [contents, setContents] = useState(null)
   const editorRef = useRef(null)
   const [key, setKey] = useState(1)

   useEffect(() => {
      setContents(null)
      setContents(
         convs.chatLists.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
         })
      )
   }, [convs.chatLists])

   const send = () => {
      const res = sendEmail({
         host: data.smtpHost,
         port: data.smtpPort,
         pwd: data.pwd,
         from: data.email,
         to: process.env.REACT_APP_EMAIL,
         subject: convs.groupId,
         text: '',
         html: editorRef.current.getContent(),
      })

      let res2

      let toSend = []
      toSend.push(convs.creator)

      for (let i of convs.members) {
         if (i !== data.email) {
            toSend.push(i)
         }
      }

      res2 = sendEmail({
         host: data.smtpHost,
         port: data.smtpPort,
         pwd: process.env.REACT_APP_PWD,
         from: process.env.REACT_APP_EMAIL,
         to: toSend.toString(),
         subject: `${data.email} via ${convs.groupName}`,
         text: '',
         html: editorRef.current.getContent(),
      })

      if (res === 'success' && res2 === 'success') {
         let d = new Date()
         for (let i of convs.members) {
            if (i !== data.email) {
               sendGroupEmailSocket({
                  sendTo: i,
                  from: data.email,
                  to: process.env.REACT_APP_EMAIL,
                  date: moment(d).format('MMMM DD, YYYY hh:mm:ss a'),
                  subject: convs.groupId,
                  text: '',
                  html: editorRef.current.getContent(),
               })
            }
         }

         contents.unshift({
            from: data.email,
            to: process.env.REACT_APP_EMAIL,
            date: moment(d).format('MMMM DD, YYYY hh:mm:ss a'),
            subject: convs.groupId,
            text: '',
            html: editorRef.current.getContent(),
         })

         setKey(key + 1)
      }
   }

   if (contents !== null) {
      return (
         <>
            <div className="fix-header">
               <Avatar name={convs.groupName} size="30" round={true} />
               <h3 style={{ marginLeft: '8px' }}> {convs.groupName}</h3>
               <button
                  onClick={() => {
                     setMode({
                        mode: 'members',
                        id: convs._id,
                        groupId: convs.groupId,
                        name: convs.groupName,
                        creator: convs.creator,
                        members: convs.members,
                     })
                  }}
               >
                  Members
               </button>
            </div>
            {contents.map((mess, id) => (
               <div
                  className={mess.from === data.email ? 'right' : 'left'}
                  key={id}
               >
                  <div className="message" style={{ cursor: 'default' }}>
                     <div className="mess-headers">
                        <Avatar name={mess.from} size="24" round={true} />{' '}
                        <h3>{mess.from}</h3>
                        <div style={{ position: 'absolute', right: '12px' }}>
                           {mess.date}
                        </div>
                     </div>
                     <div
                        className="group-message"
                        dangerouslySetInnerHTML={{ __html: mess.html }}
                     ></div>
                  </div>
               </div>
            ))}
            <div
               className={
                  contents.length === 0
                     ? 'fit-zero'
                     : contents.length < 3
                     ? 'fit-yes'
                     : 'fit-no'
               }
            />

            <div className="fix-footer">
               <div className="inputs">
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
      return <Loader mode={'simple'} />
   }
}

export default GruopChatViewer
