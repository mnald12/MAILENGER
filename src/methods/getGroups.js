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
            if (i.creator === email) {
               group.push(i)
            } else {
               let isIncluded = false
               for (let m of i.members) {
                  if (m === email) {
                     isIncluded = true
                     break
                  }
               }
               if (isIncluded) {
                  group.push(i)
               }
            }
         }
         console.log(group)
         return group
      })
      .then((group) => (groups = group))
      .catch(console.error)
   console.log(groups)
   return groups
}

export default getGroups
