const getGroupChats = async (id) => {
   let messages = []
   let options = {
      method: 'GET',
   }
   await fetch(
      `/group/messages/${process.env.REACT_APP_EMAIL}/${process.env.REACT_APP_PWD}/imap.gmail.com/993`,
      options
   )
      .then((response) => response.json())
      .then((res) => {
         let message = []
         for (let i of res) {
            if (i.subject === id) {
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
