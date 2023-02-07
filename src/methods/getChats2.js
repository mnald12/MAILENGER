import { v4 } from 'uuid'
const getChats2 = (lists, chatList, email) => {
   let waiting = []

   for (let i of lists) {
      let isMe = false

      if (i.from === email) {
         isMe = true
      }

      if (isMe) {
         waiting.push(i)
      } else {
         let notInList = false
         for (let l = 0; l < chatList.length; l++) {
            if (chatList[l].email === i.from) {
               chatList[l].messageLists.push(i)
               break
            } else {
               if (l === chatList.length - 1) {
                  notInList = true
               }
            }
         }
         if (notInList) {
            chatList.push({
               name: i.name ? i.name : i.from,
               id: v4(),
               email: i.from,
               messageLists: [i],
               date: i.date,
               hasNewMessage: false,
            })
         }
      }
   }

   if (waiting.length > 0) {
      for (let w of waiting) {
         for (let c of chatList) {
            if (c.email === w.to) {
               c.messageLists.push(w)
               if (c.date < w.date) {
                  c.date = w.date
               }
               break
            }
         }
      }
   }
   return chatList
}

export default getChats2
