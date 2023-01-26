import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useState, useContext, useRef } from 'react'
import Avatar from 'react-avatar'
import Moment from 'react-moment'
import getGroupChats from '../methods/getGroupChats'
import { Data } from './Index'
import Loader from './Loader'

const GruopChatViewer = ({ convs }) => {
   const { data } = useContext(Data)

   const [contents, setContents] = useState(null)
   const editorRef = useRef(null)
   const [key, setKey] = useState(1)

   useEffect(() => {
      const msgs = getGroupChats(convs.groupId)
      msgs.then((res) => setContents(res))
   }, [convs.groupId])

   const send = () => {
      let d = new Date()

      let options = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            to: convs.groupId,
            from: data.email,
            date: d,
            message: editorRef.current.getContent(),
         }),
      }
      fetch('/group/messages', options)
         .then((res) => {
            if (res) {
               setKey(key + 1)
               const msgs = getGroupChats(convs.groupId)
               msgs.then((res) => setContents(res))
            }
         })
         .catch((err) => console.log(err))
   }

   if (contents !== null) {
      return (
         <>
            <div className="fix-header">
               <Avatar name={convs.groupName} size="30" round={true} />
               <h3 style={{ marginLeft: '8px' }}> {convs.groupName}</h3>
            </div>
            {contents.map((mess, id) => (
               <div
                  className={mess.from === data.email ? 'right' : 'left'}
                  key={id}
               >
                  <div className={'message'}>
                     <div className="mess-headers">
                        <Avatar name={mess.from} size="24" round={true} />{' '}
                        <h3>{mess.from}</h3>
                        <Moment
                           style={{ position: 'absolute', right: '12px' }}
                           format="MMMM DD, YYYY hh:mm:ss a"
                        >
                           {mess.date}
                        </Moment>
                     </div>
                     <div
                        className="group-message"
                        dangerouslySetInnerHTML={{ __html: mess.message }}
                     ></div>
                  </div>
               </div>
            ))}
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
