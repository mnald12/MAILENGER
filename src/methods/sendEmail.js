const sendEmail = (dataToSend) => {
   let isSend = false
   let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         host: dataToSend.host,
         port: dataToSend.port,
         pwd: dataToSend.pwd,
         from: dataToSend.from,
         to: dataToSend.to,
         subject: dataToSend.subject,
         text: '',
         html: dataToSend.html,
      }),
   }
   fetch('/send', options)
      .then((isSend = true))
      .catch((err) => console.log(err))

   if (isSend) {
      return 'success'
   }
}

export default sendEmail
