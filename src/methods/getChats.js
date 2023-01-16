const getChats = async (lists, data) => {
   let chatList = []
   let waiting = []

   for (let i of lists) {
      let name = ''
      let email = ''
      let subject = ''
      let date = ''
      let datas = ''
      let snippet = ''
      let to = ''
      let isInbox = false

      await fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.sub}/threads/${i.id}`,
         {
            method: 'get',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: 'Bearer ' + data.access_token,
               Host: 'https://mail.google.com',
            },
         }
      )
         .then((response) => response.json())

         .then((res) => {
            for (let l of res.messages[0].labelIds) {
               if (l === 'INBOX') {
                  isInbox = true
               }
            }

            for (let n of res.messages[0].payload.headers) {
               if (n.name === 'From') {
                  email = n.value
                  let nn = n.value.split('<')
                  name = nn[0]
               }
               if (n.name === 'To') {
                  to = n.value
               }
               if (n.name === 'Subject') {
                  subject = n.value
               }
               if (n.name === 'Date') {
                  date = n.value
               }
            }

            snippet = res.messages[0].snippet

            let result = 'parts' in res.messages[0].payload
            if (result) {
               for (let i = 0; i < res.messages[0].payload.parts.length; i++) {
                  if (
                     res.messages[0].payload.parts[i].mimeType === 'text/html'
                  ) {
                     datas = res.messages[0].payload.parts[i].body.data
                  }
               }
            } else {
               datas = res.messages[0].payload.body.data
            }
            return
         })
         .catch(console.error)

      if (chatList.length > 0) {
         let notInList = false

         for (let h = 0; h < chatList.length; h++) {
            if (isInbox) {
               if (chatList[h].name === name) {
                  let content = {
                     date: date,
                     from: name,
                     to: to,
                     subject: subject,
                     snippet: snippet,
                     data: datas,
                     class: 'left',
                  }
                  chatList[h].contents.push(content)
                  break
               } else {
                  if (h === chatList.length - 1) {
                     notInList = true
                  }
               }
            } else {
               if (chatList[h].name === to) {
                  let content = {
                     date: date,
                     from: name,
                     to: to,
                     subject: subject,
                     snippet: snippet,
                     data: datas,
                     class: 'right',
                  }
                  chatList[h].contents.push(content)
                  break
               } else {
                  if (h === chatList.length - 1) {
                     notInList = true
                  }
               }
            }
         }

         if (notInList) {
            if (isInbox) {
               let newList = {
                  name: name,
                  email: email,
                  contents: [
                     {
                        date: date,
                        from: name,
                        to: to,
                        subject: subject,
                        snippet: snippet,
                        data: datas,
                        class: 'left',
                     },
                  ],
               }
               chatList.push(newList)
            } else {
               let newList = {
                  name: name,
                  email: email,
                  contents: [
                     {
                        date: date,
                        from: name,
                        to: to,
                        subject: subject,
                        snippet: snippet,
                        data: datas,
                        class: 'right',
                     },
                  ],
               }
               waiting.push(newList)
            }
         }
      } else {
         if (isInbox) {
            let newList = {
               name: name,
               email: email,
               contents: [
                  {
                     date: date,
                     from: name,
                     to: to,
                     subject: subject,
                     snippet: snippet,
                     data: datas,
                     class: 'left',
                  },
               ],
            }
            chatList.push(newList)
         } else {
            let newList = {
               name: name,
               email: email,
               contents: [
                  {
                     date: date,
                     from: name,
                     to: to,
                     subject: subject,
                     snippet: snippet,
                     data: datas,
                     class: 'right',
                  },
               ],
            }
            waiting.push(newList)
         }
      }
   }

   if (waiting.length > 0) {
      for (let w of waiting) {
         for (let c of chatList) {
            if (c.contents[0].from === w.contents[0].to) {
               c.contents.push(w.contents[0])
               break
            }
         }
      }
   }

   console.log(chatList)
   console.log(waiting)
   return chatList
}

export default getChats
