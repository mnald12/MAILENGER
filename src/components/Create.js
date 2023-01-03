import '../css/Create.css'
import { useState } from 'react'

const sendMail = (data) => {
   console.log(data)
   console.log(document.getElementById('messageBox').innerText)
   fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${data.id}/messages/send`,
      {
         method: 'post',
         headers: {
            Authorization: 'Bearer ' + data.token,
            ContentType: 'message/rfc822',
         },
         body: {
            From: '<' + data.from + '>',
            To: '<' + data.to + '>',
            Subject: data.subject,
            Text: document.getElementById('messageBox').innerText,
         },
      }
   )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch(console.error)
}

const Create = ({ data }) => {
   const [to, setTo] = useState('')
   const [subject, setSubject] = useState('')
   return (
      <>
         <div className="create-form">
            <input
               type="email"
               value={to}
               onChange={(e) => setTo(e.target.value)}
               placeholder="To: "
            ></input>
         </div>
         <div className="create-form">
            <input
               type="text"
               value={subject}
               onChange={(e) => setSubject(e.target.value)}
               placeholder="Subject: "
            ></input>
         </div>
         <div className="create-form">
            <br></br>
            <p className="label">Your message: </p>
            <div id="messageBox" className="textBox" contentEditable></div>
            <button
               onClick={() =>
                  sendMail({
                     id: data.id,
                     token: data.token,
                     from: data.email,
                     to: to,
                     subject: subject,
                  })
               }
               className="sendButton"
            >
               Send
            </button>
         </div>
         <div className="space"></div>
      </>
   )
}

export default Create
