import getGroupChats from './getGroupChats'

const getGroups = async (email) => {
   let groups = []
   let options = {
      method: 'GET',
   }
   await fetch('/group', options)
      .then((response) => response.json())
      .then((res) => {
         let group = []
         for (let i of res) {
            let isIncluded = false
            for (let m of i.members) {
               if (m === email) {
                  isIncluded = true
                  break
               }
            }
            if (isIncluded) {
               const msgs = getGroupChats(i.groupId)
               msgs.then((res) => {
                  group.push({
                     _id: i._id,
                     groupId: i.groupId,
                     groupName: i.groupName,
                     creator: i.creator,
                     members: i.members,
                     chatLists: res,
                     hasNewMessage: false,
                     date: res[res.length - 1].date,
                  })
               })
            }
         }
         return group
      })
      .then((group) => (groups = group))
      .catch(console.error)
   return groups
}

export default getGroups
