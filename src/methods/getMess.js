const getMessages = (messages, data) => {
   let newMessages = []
   for (let i of messages) {
      fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.id}/messages/${i.id}`,
         {
            method: 'get',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: 'Bearer ' + data.token,
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

            for (let i of res.payload.headers) {
               if (i.name === 'Received') {
                  let r = i.value.split('<')
                  if (r[0] === 'by') {
                     let rr = i.value.split(';')
                     rcv = rr[1]
                  }
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
                  break
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

            newMessages.push(mess)
         })
         .catch(console.error)
   }

   return newMessages
}
export default getMessages
