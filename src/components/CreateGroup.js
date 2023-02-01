import { useState, useContext } from 'react'
import { v4 } from 'uuid'
import { Data } from './Index'

const CreateGroup = () => {
   const { data, groups, setGroups } = useContext(Data)

   const [name, setName] = useState('')
   const [member, setMember] = useState('')

   const saveGroup = () => {
      const GID = v4()
      const members = member.split(' ')
      members.push(data.email)
      let options = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            groupId: GID,
            groupName: name,
            creator: data.email,
            members: members,
         }),
      }
      fetch('/group', options)
         .then((res) => res.json())
         .then((res) => {
            setGroups([
               ...groups,
               {
                  _id: '',
                  groupId: GID,
                  groupName: name,
                  creator: data.email,
                  members: members,
                  chatLists: [],
                  hasNewMessage: false,
               },
            ])
            setName('')
            setMember('')
         })
         .catch((err) => console.log(err))
   }
   return (
      <>
         <div className="groups">
            <div className="group">
               <h4>Create Group</h4>
               <p>Group Name : </p>
               <input value={name} onChange={(e) => setName(e.target.value)} />
               <p>Members : </p>
               <input
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                  placeholder="add space to multiple address"
               />
               <button onClick={() => saveGroup()} disabled={!name}>
                  Create
               </button>
            </div>
         </div>
      </>
   )
}

export default CreateGroup
