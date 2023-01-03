/* eslint-disable react/style-prop-object */
import { useEffect, useState } from 'react'
import '../css/Message.css'
import { Parser } from 'html-to-react'

const base64 = require('base-64')

const Message = ({ data }) => {
   const [dataSrc, setDataSrc] = useState(null)

   useEffect(() => {
      setDataSrc(null)
      fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.id}/threads/${data.mId}`,
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
            let result = 'parts' in res.messages[0].payload
            if (result) {
               for (let i = 0; i < res.messages[0].payload.parts.length; i++) {
                  if (
                     res.messages[0].payload.parts[i].mimeType === 'text/html'
                  ) {
                     setDataSrc(res.messages[0].payload.parts[i].body.data)
                  }
               }
            } else {
               setDataSrc(res.messages[0].payload.body.data)
            }
         })
         .catch(console.error)
   }, [data.id, data.mId, data.token])

   if (dataSrc) {
      let htmlSrc = base64.decode(dataSrc.replace(/-/g, '+').replace(/_/g, '/'))
      return (
         <>
            <div className="fix-header">
               <h3>Name</h3>
            </div>
            <div>{Parser().parse(htmlSrc)}</div>
            <div className="fix-footer">
               <textarea></textarea>
            </div>
         </>
      )
   } else {
      return <h4>Loading....</h4>
   }
}

export default Message
