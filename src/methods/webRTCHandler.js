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
} from './dialog'

let socket = null

const setSocket = (value) => {
   socket = value
}

let localVideo
let remoteVideo

const configuration = {
   iceServers: [
      {
         urls: 'stun:stun.l.google.com:13902',
      },
   ],
}

let peerConnection
let otherCandidate

let idToSend = null
let callerID
let commingDescription

let localStream

const initCam = async (mode) => {
   localVideo = document.getElementById('local')
   remoteVideo = document.getElementById('remote')

   let defaultConstraints

   if (mode === 'video') {
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

         localVideo.srcObject = localStream
      })
      .catch((error) => console.error(error))
}

const startConnection = () => {
   peerConnection = new RTCPeerConnection(configuration)

   peerConnection.onicecandidate = (event) => {
      if (event.candidate && idToSend !== null) {
         socket.emit('send-candidate', idToSend, event.candidate)
      }
   }

   peerConnection.ontrack = (event) => {
      remoteVideo.srcObject = event.streams[0]
   }

   for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream)
   }
}

const calleer = async (id, name, mode) => {
   startConnection()
   idToSend = id
   const offer = await peerConnection.createOffer()
   await peerConnection.setLocalDescription(offer)
   socket.emit('send-offer', socket.id, id, offer, name, mode)
}

const callee = async (id, description) => {
   startConnection()
   idToSend = id
   await peerConnection.setRemoteDescription(description)
   const answer = await peerConnection.createAnswer()
   await peerConnection.setLocalDescription(answer)
   socket.emit('send-answer', id, answer)
   await peerConnection.addIceCandidate(otherCandidate, success, fail)
}

const onOffer = (id, description) => {
   callerID = id
   commingDescription = description
}

const onAnswer = async (answer) => {
   await peerConnection.setRemoteDescription(answer)
   await peerConnection.addIceCandidate(otherCandidate, success, fail)
   onAnswerDialog()
}

const onCandidate = (candidate) => {
   otherCandidate = candidate
}

const close = () => {
   peerConnection.close()
   callerID = null
   idToSend = null
   commingDescription = null
   localVideo.src = ''
   remoteVideo.src = ''
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

const success = () => {
   console.log('candidate came and successfuly added as your ice candidate')
}

const fail = () => {
   console.log('candidate came but fail to add as our ice candidate')
}

const call = (id, name, mode) => {
   socket.emit('get-id', id, (resId) => {
      if (resId) {
         calleer(resId, name, mode)
      } else {
         onCallNotAvailableDialog()
      }
   })
}

const accept = () => {
   callee(callerID, commingDescription)
   acceptDialog()
}

const decline = () => {
   socket.emit('reject-call', callerID)
   close()
   rejectDialog()
}

const abort = () => {
   socket.emit('abort-call', idToSend)
   close()
   abortDialog()
}

const endCall1 = () => {
   socket.emit('end-call', idToSend)
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
   initCam,
   offCam,
   call,
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
