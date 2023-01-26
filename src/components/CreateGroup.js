import { useState, useContext } from 'react'
import { v4 } from 'uuid'
import getGroups from '../methods/getGroups'
import { Data } from './Index'

const CreateGroup = () => {
   const { data, setGroups } = useContext(Data)

   const [name, setName] = useState('')
   const [member, setMember] = useState('')

   const saveGroup = () => {
      const members = member.split(' ')
      let options = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            groupId: v4(),
            groupName: name,
            creator: data.email,
            members: members,
         }),
      }
      fetch('/group', options)
         .then((res) => res.json())
         .then((res) => {
            console.log(res)
            setName('')
            setMember('')
            const grps = getGroups(data.email)
            grps.then((res) => setGroups(res))
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
               <button onClick={() => saveGroup()}>Create</button>
            </div>
         </div>
      </>
   )
}

export default CreateGroup
