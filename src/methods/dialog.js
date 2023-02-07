const show = 'translateY(0)'
const hide = 'translateY(400px)'

const showCallDialog = () => {
   document.getElementById('dialog1').style.transform = show
}

const showAcceptDialog = () => {
   document.getElementById('dialog6').style.transform = show
}

const acceptDialog = () => {
   document.getElementById('dialog6').style.transform = hide
   document.getElementById('dialog9').style.transform = show
}

const rejectDialog = () => {
   document.getElementById('dialog6').style.transform = hide
   document.getElementById('dialog7').style.transform = show
}

const abortDialog = () => {
   document.getElementById('dialog1').style.transform = hide
   document.getElementById('dialog3').style.transform = show
}

const callend1 = () => {
   document.getElementById('dialog5').style.transform = hide
   document.getElementById('dialog3').style.transform = show
}

const callend2 = () => {
   document.getElementById('dialog9').style.transform = hide
   document.getElementById('dialog7').style.transform = show
}

const onAnswerDialog = () => {
   document.getElementById('dialog1').style.transform = hide
   document.getElementById('dialog5').style.transform = show
}

const onRejectDialog = () => {
   document.getElementById('dialog1').style.transform = hide
   document.getElementById('dialog2').style.transform = show
}

const onCallNotAvailableDialog = () => {
   document.getElementById('dialog1').style.transform = hide
   document.getElementById('dialog4').style.transform = show
}

const onEndCallDialogByCallee = () => {
   document.getElementById('dialog5').style.transform = hide
   document.getElementById('dialog3').style.transform = show
}

const onEndCallDialogByCaller = () => {
   document.getElementById('dialog9').style.transform = hide
   document.getElementById('dialog7').style.transform = show
}

const onCallAbortedDialog = () => {
   document.getElementById('dialog6').style.transform = hide
   document.getElementById('dialog8').style.transform = show
}

export {
   showCallDialog,
   showAcceptDialog,
   acceptDialog,
   rejectDialog,
   abortDialog,
   callend1,
   callend2,
   onAnswerDialog,
   onRejectDialog,
   onCallNotAvailableDialog,
   onEndCallDialogByCallee,
   onEndCallDialogByCaller,
   onCallAbortedDialog,
}
