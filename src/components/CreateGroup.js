import { useState, useContext } from 'react'
import { v4 } from 'uuid'
import { Data } from './Index'

const CreateGroup = () => {
   const { data, groups, setGroups, setNotifs } = useContext(Data)

   const [name, setName] = useState('')
   const [member, setMember] = useState('')

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

   const saveGroup = () => {
      const GID = v4()
      const members = member.split(' ')
      members.push(data.email)

      if (name === '') {
         setNotifs('please add a name')
         return
      }

      if (member === '') {
         setNotifs('please add atleast 1 member')
         return
      }

      for (let i of members) {
         if (checkEmail(i) === false) {
            setNotifs(`${i} is not a correct email`)
            return
         }
      }

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
            setNotifs(`${name} successfully created`)
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
               <button onClick={() => saveGroup()}>Create</button>
            </div>
         </div>
      </>
   )
}

export default CreateGroup
