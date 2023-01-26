import { useContext } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'

const Group = () => {
   const { setMode, groups } = useContext(Data)

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
                  setMode({ mode: 'group-chat', messages: grp })
                  setTimeout(() => {
                     document.getElementById('main-content').scrollTop = 0
                  }, 100)
               }}
               className="message-list"
               key={id}
            >
               <div className="avtr">
                  <Avatar name={grp.groupName} size="32" round={true} />
               </div>
               <div className="message-info">
                  <h4 className="name">{grp.groupName}</h4>
                  <p className="subject">
                     {grp.members.length - 1 === 0
                        ? `${grp.members.length} member`
                        : `${grp.members.length} members`}
                  </p>
               </div>
            </button>
         ))}
      </>
   )
}

export default Group
