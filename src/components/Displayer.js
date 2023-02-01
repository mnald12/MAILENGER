import { useContext, useEffect } from 'react'
import Content from './Content'
import { Data } from './Index'
import Logins from './Logins'
import Sidebar from './Sidebar'
import Loader from './Loader'
import getChats from '../methods/getChats'
import getChats2 from '../methods/getChats2'
import getGroups from '../methods/getGroups'

const Displayer = () => {
   const {
      data,
      maxHeight,
      isLogIn,
      isLoaded,
      mode,
      addEmailToSocket,
      setIsLoaded,
      chats,
      setChats,
      setGroups,
      setGroupIsLoaded,
   } = useContext(Data)

   const getEmails = async () => {
      let init = 1
      let end = 100
      let limit
      let fetched
      let done = false
      let firstAttempt = true

      let chs

      while (!done) {
         let options = {
            method: 'GET',
         }
         if (firstAttempt) {
            await fetch(
               `/users2/${data.email}/${data.pwd}/${data.imapHost}/${data.imapPort}/${init}/${end}`,
               options
            )
               .then((response) => response.json())
               // eslint-disable-next-line no-loop-func
               .then((res) => {
                  limit = res.total
                  const chat = getChats(res.messages, data.email)
                  setChats(chat)
                  chs = chat
                  setIsLoaded(true)
                  addEmailToSocket(data.email)

                  if (res.total < end) {
                     done = true
                  } else {
                     init += 100
                     end += 100
                  }

                  fetched = res.messages.length

                  firstAttempt = false
               })
               .catch(console.error)
         } else {
            await fetch(
               `/users2/${data.email}/${data.pwd}/${data.imapHost}/${data.imapPort}/${init}/${end}`,
               options
            )
               .then((response) => response.json())
               // eslint-disable-next-line no-loop-func
               .then((res) => {
                  if (chats) {
                     const newChat = getChats2(
                        res.messages,
                        chs,
                        data.email,
                        res.total
                     )
                     chs = newChat
                     setChats([...newChat])
                  }

                  fetched += res.messages.length

                  if (limit === fetched) {
                     done = true
                  } else {
                     init += 100
                     end += 100
                  }
               })
               .catch(console.error)
         }
      }
   }
   if (isLogIn) {
      if (isLoaded) {
         return (
            <>
               <div
                  style={{ height: maxHeight }}
                  className="container"
                  id="container"
               >
                  <Sidebar />
                  <Content contents={mode} />
               </div>
            </>
         )
      } else {
         // eslint-disable-next-line react-hooks/rules-of-hooks
         useEffect(() => {
            getEmails()
            const grps = getGroups(data.email)
            grps.then((res) => {
               setGroups(res)
               setGroupIsLoaded(true)
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
         }, [])
         return <Loader mode={'main'} />
      }
   } else {
      return <Logins />
   }
}

export default Displayer
