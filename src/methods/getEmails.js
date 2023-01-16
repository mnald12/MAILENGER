let msgs = []
let complete = false

const getEmails = (data) => {
   const getNextPage = (npg) => {
      fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.id}/threads?pageToken=${npg}`,
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
            let cheker = 0
            for (let i = 0; i < res.threads.length; i++) {
               msgs.push(res.threads[i])
               cheker = cheker + 1
            }
            if (cheker === res.threads.length) {
               if (res.nextPageToken) {
                  getNextPage(res.nextPageToken)
                  return true
               } else {
                  complete = true
                  return true
               }
            }
         })
         .catch(console.error)
   }

   fetch(`https://gmail.googleapis.com/gmail/v1/users/${data.id}/threads`, {
      method: 'get',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + data.token,
         Host: 'https://mail.google.com',
      },
   })
      .then((response) => response.json())
      .then((res) => {
         let cheker = 0
         for (let i = 0; i < res.threads.length; i++) {
            msgs.push(res.threads[i])
            cheker = cheker + 1
         }
         if (cheker === res.threads.length) {
            if (res.nextPageToken) {
               getNextPage(res.nextPageToken)
               return true
            } else {
               complete = true
               return true
            }
         }
      })
      .catch(console.error)

   if (complete) {
      return msgs
   }
}

export default getEmails
