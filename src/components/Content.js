import '../css/Content.css'
import Create from './Create'
import Message from './Message'
//import { getMessage } from '../methods/getMess'

const Content = ({ contents }) => {
   if (contents.mode === 'welcome') {
      return <div className="main-content">Hello, Welcome</div>
   } else if (contents.mode === 'note') {
      return <div className="main-content">Hello Note</div>
   } else if (contents.mode === 'message') {
      const data = {
         id: contents.id,
         mId: contents.mId,
         token: contents.token,
      }
      return (
         <div className="main-content">
            <Message data={data} />
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
   }
}

export default Content
