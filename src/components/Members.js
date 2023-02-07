import { useState, useContext } from 'react'
import { Data } from './Index'

const Members = ({ members }) => {
   const { data, setMode, groups, setGroups, setNotifs } = useContext(Data)
   const [member, setMember] = useState('')

   const handleRemoveItem = (e) => {
      setGroups(groups.filter((item) => item.groupName !== members.name))
   }

   const checkEmail = (emailAddress) => {
      const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]'
      const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]'
      const sAtom =
         '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+'
      const sQuotedPair = '\\x5c[\\x00-\\x7f]'
      const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d'
      const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22'
      const sDomain_ref = sAtom
      const sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')'
      const sWord = '(' + sAtom + '|' + sQuotedString + ')'
      const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*'
      const sLocalPart = sWord + '(\\x2e' + sWord + ')*'
      const sAddrSpec = sLocalPart + '\\x40' + sDomain
      const sValidEmail = '^' + sAddrSpec + '$'

      const reValidEmail = new RegExp(sValidEmail)

      return reValidEmail.test(emailAddress)
   }

   const add = () => {
      if (checkEmail(member) === false) {
         setNotifs(`${member} is not a correct email`)
         return
      }

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
            setNotifs('you successfully left the group')
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
                  <button
                     onClick={() => {
                        if (member === '') {
                           setNotifs('members is empty')
                        } else {
                           add()
                        }
                     }}
                  >
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
