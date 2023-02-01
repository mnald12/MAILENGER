import { useContext } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'
import Loader from './Loader'

const Group = () => {
   const { setMode, groups, setActive2, setNavActive, isGroupLoaded } =
      useContext(Data)
   if (isGroupLoaded) {
      return (
         <>
            <div className="mail-select">
               <button
                  id="inbox"
                  onClick={() => {
                     setMode({ mode: 'add-group' })
                  }}
                  className="on"
               >
                  Create New Group +
               </button>
            </div>
            {groups.map((grp, id) => (
               <button
                  id={id}
                  onClick={() => {
                     grp.hasNewMessage = false
                     setMode({ mode: 'group-chat', messages: grp })
                     setNavActive('group')
                     setActive2(id)
                  }}
                  className={
                     grp.hasNewMessage ? 'message-list notifOn' : 'message-list'
                  }
                  key={id}
               >
                  <div className="avtr">
                     <Avatar name={grp.groupName} size="32" round={true} />
                  </div>
                  <div className="message-info">
                     <h4 className="name">{grp.groupName}</h4>
                     <p className="subject">
                        {grp.members.length === 1
                           ? `${grp.members.length} member`
                           : `${grp.members.length} members`}
                     </p>
                  </div>
               </button>
            ))}
         </>
      )
   } else {
      return <Loader mode={'simple'} />
   }
}

export default Group
