import { useContext, useEffect } from 'react'
import { Data } from './Index'
import Avatar from 'react-avatar'
import {
   call,
   abort,
   endCall1,
   offCam,
   initCam,
} from '../methods/webRTCHandler'

const AudioCall = ({ vData }) => {
   const { data, setMode } = useContext(Data)

   const back = async () => {
      setMode({ mode: 'welcome' })
      document.getElementById('sidebar').style.opacity = '1'
      document.getElementById('sidebar').style.pointerEvents = 'auto'
      offCam()
   }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const startCall = async () => {
      await initCam('audio')
      call(vData.email, data.email, 'audio-call')
   }

   useEffect(() => {
      startCall()
      document.getElementById('sidebar').style.opacity = '0.50'
      document.getElementById('sidebar').style.pointerEvents = 'none'
   }, [startCall])

   const callended = () => {
      document.getElementById('dialog3').style.transform = 'translateY(400px)'
   }

   const callreject = () => {
      document.getElementById('dialog2').style.transform = 'translateY(400px)'
   }

   return (
      <>
         <div className="fix-header">
            <Avatar name={vData.name} size="30" round={true} />
            <h3 style={{ marginLeft: '8px' }}> {vData.name} | Audio Call</h3>
            <button className="end-call" onClick={() => back()}>
               Back
            </button>
         </div>

         <div className="video-container">
            <video className="remote" id="remote" autoPlay></video>
            <video className="local" id="local" muted autoPlay></video>

            <div className="call-dialog" id="dialog1">
               <h3>Calling {vData.name}</h3>
               <div className="call-abort">
                  <button
                     onClick={() => {
                        abort(vData.id)
                     }}
                  >
                     Abort
                  </button>
               </div>
            </div>

            <div className="call-rejected" id="dialog2">
               <h3>Call rejected</h3>
               <button
                  onClick={() => {
                     callreject()
                  }}
               >
                  OK
               </button>
            </div>

            <div className="callended-dialog" id="dialog3">
               <h3>Call ended</h3>
               <button
                  onClick={() => {
                     callended()
                  }}
               >
                  OK
               </button>
            </div>

            <div className="not-available" id="dialog4">
               <h3>{vData.name} is not available</h3>
            </div>

            <div className="call-action" id="dialog5">
               <button
                  onClick={() => {
                     endCall1()
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

export default AudioCall
