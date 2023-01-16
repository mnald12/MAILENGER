const getAllMails = async (data) => {
   let messages = []

   let complete = false

   const getNext = async (npt) => {
      let nnpt = null

      await fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.sub}/threads?pageToken=${npt}`,
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
            let cheker = 0
            for (let i = 0; i < res.threads.length; i++) {
               messages.push(res.threads[i])
               cheker = cheker + 1
            }
            if (cheker === res.threads.length) {
               if (res.nextPageToken) {
                  nnpt = res.nextPageToken
                  return
               } else {
                  complete = true
                  return
               }
            }
         })
         .catch(console.error)

      if (nnpt) {
         await getNext(nnpt)
         return
      }

      return
   }

   await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${data.sub}/threads`,
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
      .then(async (res) => {
         let cheker = 0
         for (let i = 0; i < res.threads.length; i++) {
            messages.push(res.threads[i])
            cheker = cheker + 1
         }
         if (cheker === res.threads.length) {
            if (res.nextPageToken) {
               await getNext(res.nextPageToken)
               return
            } else {
               complete = true
               return
            }
         }
      })
      .catch(console.error)

   if (complete) {
      console.log(messages)
      return messages
   } else {
      console.log(messages)
      return messages
   }
}

export default getAllMails
