//
//
//
//
//
import { useState, useEffect } from 'react'
import '../css/Sidebar.css'

var options = {
   method: 'GET',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: '',
   },
}

const Sidebar = ({ data }) => {
   //https://gmail.googleapis.com/gmail/v1/users/{userId}/threads
   // eslint-disable-next-line no-unused-vars
   const [list, setLists] = useState(null)

   useEffect(() => {
      fetch(
         `https://gmail.googleapis.com/gmail/v1/users/${data.id}/threads`,
         options
      )
         .then((response) => {
            console.log(response)
            return response
         })
         .then(setLists)
         .catch(console.error)
   }, [data.id])

   return (
      <>
         <div className="sidebar">
            <div className="profile">
               <img src={data.avatar} alt={data.name} />
               <div className="names">
                  <h3>{data.name}</h3>
                  <h5>{data.email}</h5>
               </div>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
               >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
               </svg>
            </div>
            <div className="side-actions"></div>
            <div className="nav-fix-bottom">
               <button onClick={data.logout} title="logout">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="currentColor"
                     className="bi bi-power"
                     viewBox="0 0 16 16"
                  >
                     <path d="M7.5 1v7h1V1h-1z" />
                     <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                  </svg>
               </button>
            </div>
         </div>
      </>
   )
}

export default Sidebar
