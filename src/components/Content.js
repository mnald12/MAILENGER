import '../css/Content.css'
import Create from './Create'
import Message from './Message'
import SentView from './SentView'
import ChatViewer from './ChatViewer'

const Content = ({ contents }) => {
   if (contents.mode === 'welcome') {
      return <div className="main-content">Hello, Welcome</div>
   } else if (contents.mode === 'group') {
      return <div className="main-content">Hello Group</div>
   } else if (contents.mode === 'message') {
      const data = {
         id: contents.id,
         mId: contents.mId,
         token: contents.token,
         email: contents.email,
      }
      return (
         <div className="main-content">
            <Message data={data} />
         </div>
      )
   } else if (contents.mode === 'sentMessage') {
      const data = {
         id: contents.id,
         mId: contents.mId,
         token: contents.token,
         email: contents.email,
      }
      return (
         <div className="main-content">
            <SentView data={data} />
         </div>
      )
   } else if (contents.mode === 'create') {
      const data = {
         id: contents.id,
         token: contents.token,
         email: contents.email,
      }
      return (
         <div className="main-content">
            <Create data={data} />
         </div>
      )
   } else if (contents.mode === 'chat-view') {
      return (
         <div className="main-content" id="main-content">
            <ChatViewer convs={contents.conversation} />
         </div>
      )
   }
}

export default Content
