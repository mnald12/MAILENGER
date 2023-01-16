/* eslint-disable react/style-prop-object */
import { useEffect, useState } from 'react'
import '../css/Message.css'
import { Parser } from 'html-to-react'
import Loader from './Loader'

const base64 = require('base-64')

const SentView = ({ data }) => {
   const [dataSrc, setDataSrc] = useState(null)
   const [name, setName] = useState(null)
   const [subjects, setSubjects] = useState(null)
   const [snippet, setSnippet] = useState(null)
   const [date, setDate] = useState(null)

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
            for (let n of res.messages[0].payload.headers) {
               if (n.name === 'From') {
                  setName(n.value)
               }
               if (n.name === 'Subject') {
                  setSubjects(n.value)
               }
               if (n.name === 'Date') {
                  setDate(n.value)
               }
            }

            setSnippet(res.messages[0].snippet)

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
               <h3>To: {name}</h3>
            </div>
            <div className="headers">
               <p className="date">{date}</p>
               <h3 className="subs">{subjects}</h3>
               <p className="snpt">{snippet}</p>
            </div>
            <br />
            {Parser().parse(htmlSrc)}
         </>
      )
   } else {
      return <Loader mode={'simple'} />
   }
}

export default SentView
