import {
   abortDialog,
   acceptDialog,
   callend1,
   callend2,
   onAnswerDialog,
   onCallAbortedDialog,
   onCallNotAvailableDialog,
   onEndCallDialogByCallee,
   onEndCallDialogByCaller,
   onRejectDialog,
   rejectDialog,
   showAcceptDialog,
   showCallDialog,
} from './dialog'

let socket = null
const audio = new Audio('./audio/ring.mp3')

const setSocket = (value) => {
   socket = value
}

let localVideo
let remoteVideo

const configuration = {
   iceServers: [
      {
         urls: 'stun:relay.metered.ca:80',
      },
      {
         urls: 'turn:relay.metered.ca:80',
         username: 'daa03d9d508852f8e784f910',
         credential: 'NlLw12jY0Ps4w5Z6',
      },
      {
         urls: 'turn:relay.metered.ca:443',
         username: 'daa03d9d508852f8e784f910',
         credential: 'NlLw12jY0Ps4w5Z6',
      },
      {
         urls: 'turn:relay.metered.ca:443?transport=tcp',
         username: 'daa03d9d508852f8e784f910',
         credential: 'NlLw12jY0Ps4w5Z6',
      },
   ],
   sdpSemantics: 'unified-plan',
}

let peerConnection = null

let idToSend = null

let callerID = null
let calleeID = null

let localStream = null

const initCam = async (mode) => {
   localVideo = document.getElementById('local')
   remoteVideo = document.getElementById('remote')

   let defaultConstraints

   if (mode === 'video-call') {
      defaultConstraints = {
         audio: true,
         video: true,
      }
   } else {
      defaultConstraints = {
         audio: true,
         video: false,
      }
   }

   await navigator.mediaDevices
      .getUserMedia(defaultConstraints)
      .then((stream) => {
         localStream = stream
         localVideo.srcObject = stream
      })
      .catch((error) => console.error(error))
}

const startConnection = () => {
   peerConnection = new RTCPeerConnection(configuration)

   peerConnection.onicecandidate = (event) => {
      if (event.candidate && idToSend !== null) {
         const candidate = {
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
         }
         socket.emit('send-candidate', idToSend, candidate)
      }
   }

   peerConnection.onaddstream = (event) => {
      remoteVideo.srcObject = event.stream
   }

   peerConnection.addStream(localStream)
}

const getStart = async (email, myEmail, mode) => {
   await initCam(mode)
   socket.emit('get-id', email, (resId) => {
      if (resId) {
         calleeID = resId
         idToSend = resId
         socket.emit('get-start', myEmail, resId, socket.id, mode)
      } else {
         onCallNotAvailableDialog()
      }
   })
}

const getReady = async (mode, id) => {
   await initCam(mode)
   callerID = id
   idToSend = id
   socket.emit('is-ready', id)
}

const onReady = () => {
   startConnection()
   showCallDialog()
   let offerOptions = {
      offerToReceiveAudio: 1,
   }
   peerConnection
      .createOffer(offerOptions)
      .then((offer) => {
         peerConnection.setLocalDescription(offer)
         socket.emit('send-offer', calleeID, offer)
      })
      .catch((e) => console.log(e))
}

const onOffer = (description) => {
   audio.play()
   startConnection()
   showAcceptDialog()
   peerConnection.setRemoteDescription(new RTCSessionDescription(description))
}

const accept = () => {
   audio.pause()
   peerConnection
      .createAnswer()
      .then((answer) => {
         peerConnection.setLocalDescription(answer)
         socket.emit('send-answer', callerID, answer)
      })
      .catch((e) => console.log(e))
   acceptDialog()
}

const onAnswer = (answer) => {
   peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
   onAnswerDialog()
}

const onCandidate = (candidates) => {
   if (peerConnection) {
      const candidate = new RTCIceCandidate({
         sdpMLineIndex: candidates.label,
         candidate: candidates.candidate,
      })
      peerConnection.addIceCandidate(candidate)
   }
}

const close = () => {
   peerConnection.close()
   peerConnection = null
   callerID = null
   calleeID = null
   idToSend = null
   localVideo.src = null
   remoteVideo.src = null
   offCam()
}

const onAborted = () => {
   onCallAbortedDialog()
   offCam()
}

const onReject = () => {
   onRejectDialog()
   close()
}

const onClose = () => {
   close()
   onEndCallDialogByCallee()
}

const onClose2 = () => {
   close()
   onEndCallDialogByCaller()
}

const offCam = () => {
   localStream.getVideoTracks().forEach((track) => track.stop())
}

const decline = () => {
   audio.pause()
   socket.emit('reject-call', callerID)
   close()
   rejectDialog()
}

const abort = () => {
   socket.emit('abort-call', calleeID)
   close()
   abortDialog()
}

const endCall1 = () => {
   socket.emit('end-call', calleeID)
   callend1()
   onClose()
}

const endCall2 = () => {
   socket.emit('end-call2', callerID)
   callend2()
   onClose2()
}

export {
   setSocket,
   getStart,
   getReady,
   onReady,
   offCam,
   accept,
   decline,
   abort,
   endCall1,
   endCall2,
   onOffer,
   onAnswer,
   onCandidate,
   onAborted,
   onReject,
   onClose,
   onClose2,
}
