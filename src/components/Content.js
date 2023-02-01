import '../css/Content.css'
import Create from './Create'
import ChatViewer from './ChatViewer'
import logo from '../images/mylogo.png'
import VideoCall from './VideoCall'
import IncomingVideoCall from './IncomingVideoCall'
import CreateGroup from './CreateGroup'
import IncomingAudioCall from './IncomingAudioCall'
import AudioCall from './AudioCall'
import GruopChatViewer from './groupChatViewer'
import Members from './Members'
const Content = ({ contents }) => {
   if (contents.mode === 'welcome') {
      return (
         <div className="main-content">
            <div className="img-container">
               <img src={logo} alt="logo"></img>
            </div>
         </div>
      )
   } else if (contents.mode === 'group') {
      return <div className="main-content">Hello Group</div>
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
   } else if (contents.mode === 'video-call') {
      const vData = {
         email: contents.email,
         type: contents.type,
         name: contents.name,
      }
      return (
         <div className="main-content">
            <VideoCall vData={vData} />
         </div>
      )
   } else if (contents.mode === 'incoming-video-call') {
      const data = {
         id: contents.id,
         name: contents.name,
      }
      return (
         <div className="main-content">
            <IncomingVideoCall caller={data} />
         </div>
      )
   } else if (contents.mode === 'audio-call') {
      const vData = {
         email: contents.email,
         type: contents.type,
         name: contents.name,
      }
      return (
         <div className="main-content">
            <AudioCall vData={vData} />
         </div>
      )
   } else if (contents.mode === 'incoming-audio-call') {
      const data = {
         id: contents.id,
         name: contents.name,
      }
      return (
         <div className="main-content">
            <IncomingAudioCall caller={data} />
         </div>
      )
   } else if (contents.mode === 'add-group') {
      return (
         <div className="main-content">
            <CreateGroup />
         </div>
      )
   } else if (contents.mode === 'group-chat') {
      return (
         <div className="main-content">
            <GruopChatViewer convs={contents.messages} />
         </div>
      )
   } else if (contents.mode === 'members') {
      const data = {
         id: contents.id,
         groupId: contents.groupId,
         name: contents.name,
         creator: contents.creator,
         members: contents.members,
      }
      return (
         <div className="main-content">
            <Members members={data} />
         </div>
      )
   }
}

export default Content
