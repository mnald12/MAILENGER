import { useState, useContext } from 'react'
import { Data } from './Index'

const Members = ({ members }) => {
   const { data, setMode, groups, setGroups } = useContext(Data)
   const [member, setMember] = useState('')

   const handleRemoveItem = (e) => {
      setGroups(groups.filter((item) => item.groupName !== members.name))
   }

   const add = () => {
      members.members.push(member)

      let options = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            groupId: members.groupId,
            groupName: members.name,
            creator: members.creator,
            members: members.members,
         }),
      }
      fetch(`/group/${members.id}`, options)
         .then((res) => res.json())
         .then((res) => {
            setMember('')
         })
         .catch((err) => console.log(err))
   }
   const leave = () => {
      const newMembers = []

      for (let i of members.members) {
         if (i !== data.email) {
            newMembers.push(i)
         }
      }

      let options = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            groupId: members.groupId,
            groupName: members.name,
            creator: members.creator,
            members: newMembers,
         }),
      }
      fetch(`/group/${members.id}`, options)
         .then((res) => res.json())
         .then((res) => {
            setMember('')
            setMode({ mode: 'welcome' })
            handleRemoveItem()
         })
         .catch((err) => console.log(err))
   }

   return (
      <>
         <div className="groups">
            <div className="group">
               <h4>{members.name}</h4>
               <br></br>
               <p style={{ fontWeight: 700 }}>Creator : </p>
               <input value={members.creator} disabled />
               <br />
               <p style={{ fontWeight: 700 }}>Members : </p>
               {members.members.map((mem, id) => (
                  <input
                     style={{ marginBottom: '8px' }}
                     key={id}
                     value={mem}
                     disabled
                  />
               ))}

               <p style={{ fontWeight: 700 }}>Add Member : </p>
               <div className="group-action">
                  <input
                     value={member}
                     type="email"
                     placeholder="add 1 email at a time"
                     onChange={(e) => setMember(e.target.value)}
                  />
                  <button onClick={() => add()} disabled={!member}>
                     Add
                  </button>
               </div>

               <p style={{ fontWeight: 700 }}>Leave Group : </p>
               <button
                  style={{ background: 'red', marginTop: 0 }}
                  onClick={() => leave()}
               >
                  Leave
               </button>
            </div>
         </div>
      </>
   )
}

export default Members
