import { useContext, useEffect } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'
import {
   accept,
   decline,
   endCall2,
   getReady,
   offCam,
} from '../methods/webRTCHandler'

const IncomingAudioCall = ({ caller }) => {
   const { data, setMode } = useContext(Data)

   const back = () => {
      setMode({ mode: 'welcome' })
      offCam()
      document.getElementById('sidebar').style.opacity = '1'
      document.getElementById('sidebar').style.pointerEvents = 'auto'
   }

   useEffect(() => {
      getReady('audio-call', caller.callerId)
      document.getElementById('sidebar').style.opacity = '0.50'
      document.getElementById('sidebar').style.pointerEvents = 'none'
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const acceptCall = () => {
      accept()
   }

   const callended = () => {
      document.getElementById('dialog7').style.transform = 'translateY(400px)'
   }

   const callabort = () => {
      document.getElementById('dialog8').style.transform = 'translateY(400px)'
   }

   return (
      <>
         <div className="fix-header">
            <Avatar name={caller.name} size="30" round={true} />
            <h3 style={{ marginLeft: '8px' }}> {caller.name} | Audio Call</h3>
            <button className="end-call" onClick={() => back()}>
               Back
            </button>
         </div>

         <div className="video-container">
            <video className="remote" id="remote" autoPlay></video>
            <video className="local" id="local" muted autoPlay></video>

            <div className="calling-dialog" id="dialog6">
               <h3>{caller.name} is Calling</h3>
               <div className="callings">
                  <button
                     style={{ background: 'green' }}
                     onClick={() => {
                        acceptCall()
                     }}
                  >
                     Accept
                  </button>
                  <button
                     onClick={() => {
                        decline(data.id)
                     }}
                  >
                     Reject
                  </button>
               </div>
            </div>

            <div className="callended-dialogs" id="dialog7">
               <h3>Call ended</h3>
               <button onClick={() => callended()}>OK</button>
            </div>

            <div className="call-aborted" id="dialog8">
               <h3>Call aborted</h3>
               <button onClick={() => callabort()}>OK</button>
            </div>

            <div className="calling-action" id="dialog9">
               <button
                  onClick={() => {
                     endCall2()
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="red"
                     className="bi bi-telephone-x-fill"
                     viewBox="0 0 16 16"
                  >
                     <path
                        fillRule="evenodd"
                        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
                     />
                  </svg>
               </button>
            </div>
         </div>
      </>
   )
}

export default IncomingAudioCall
