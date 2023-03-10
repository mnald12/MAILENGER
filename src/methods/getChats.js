import { v4 } from 'uuid'
const getChats = (lists, email) => {
   let chatList = []
   let waiting = []

   for (let i of lists) {
      let isMe = false

      if (i.from === email) {
         isMe = true
      }

      if (chatList.length > 0) {
         if (isMe) {
            waiting.unshift(i)
         } else {
            let notInList = false
            for (let l = 0; l < chatList.length; l++) {
               if (chatList[l].email === i.from) {
                  chatList[l].messageLists.push(i)
                  if (new Date(chatList[l].date) < new Date(i.date)) {
                     chatList[l].date = i.date
                  }
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
                  hasNewMessage: false,
                  date: i.date,
               })
            }
         }
      } else {
         if (isMe) {
            waiting.push(i)
         } else {
            chatList.push({
               name: i.name ? i.name : i.from,
               id: v4(),
               email: i.from,
               messageLists: [i],
               hasNewMessage: false,
               date: i.date,
            })
         }
      }
   }

   if (waiting.length > 0) {
      for (let w of waiting) {
         for (let c of chatList) {
            if (c.email === w.to) {
               c.messageLists.push(w)
               if (new Date(c.date) < new Date(w.date)) {
                  c.date = w.date
               }
               break
            }
         }
      }
   }

   return chatList
}

export default getChats
