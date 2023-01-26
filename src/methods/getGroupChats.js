const getGroupChats = async (id) => {
   let messages = []
   let options = {
      method: 'GET',
   }
   await fetch('/group/messages', options)
      .then((response) => response.json())
      .then((res) => {
         let message = []
         for (let i of res) {
            if (i.to === id) {
               message.push(i)
            }
         }
         return message
      })
      .then((messs) => (messages = messs))
      .catch(console.error)
   return messages
}

export default getGroupChats
