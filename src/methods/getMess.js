const getMessages = (allMessages, myEmail) => {
   let messages = []
   let sentMessages = []

   for (let i of allMessages) {
      if (i.from === myEmail) {
         sentMessages.push(i)
      } else {
         messages.push(i)
      }
   }

   return { inbox: messages, sent: sentMessages }
}
export default getMessages
