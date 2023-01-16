const setLists = (data) => {
   let msgs = []
   let npt = null

   let complete = false

   fetch(`https://gmail.googleapis.com/gmail/v1/users/${data.sub}/threads`, {
      method: 'get',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + data.access_token,
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
         console.log(res.threads.length)
         console.log(cheker)
         if (cheker === res.threads.length) {
            if (res.nextPageToken) {
               npt = res.nextPageToken
            }
            complete = true
         }
      })
      .catch(console.error)

   if (complete) {
      return { msg: msgs, nextPageToken: npt }
   }
}

export default setLists
