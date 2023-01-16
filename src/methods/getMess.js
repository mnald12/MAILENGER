const getMessages = (messages, data) => {
   let newMessages = []
   let sentMessages = []
   for (let i of messages) {
      fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.sub}/messages/${i.id}`,
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
            let from
            let rcv
            let dates
            let subs

            let isInbox = false

            for (let l of res.labelIds) {
               if (l === 'INBOX') {
                  isInbox = true
               }
            }

            for (let i of res.payload.headers) {
               if (i.name === 'To') {
                  rcv = i.value
               }
               if (i.name === 'Subject') {
                  subs = i.value
               }
               if (i.name === 'Date') {
                  dates = i.value
               }
               if (i.name === 'From') {
                  let txt = i.value
                  from = txt.split('<')
               }
            }

            let mess = {
               id: res.id,
               from: from,
               recieved: rcv,
               message: res.snippet,
               subject: subs,
               date: dates,
            }

            if (isInbox) {
               newMessages.push(mess)
            } else {
               sentMessages.push(mess)
            }

            return
         })
         .catch(console.error)
   }

   console.log(newMessages.length)

   return { inbox: newMessages, sent: sentMessages }
}
export default getMessages
