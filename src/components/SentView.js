import '../css/Message.css'
import Loader from './Loader'

const SentView = ({ data }) => {
   if (data.html) {
      return (
         <>
            <div className="fix-header">
               <h3>To: {data.to}</h3>
            </div>
            <div className="headers">
               <p className="date">{data.date}</p>
               <h3 className="subs">{data.subject}</h3>
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
         </>
      )
   } else {
      return <Loader mode={'simple'} />
   }
}

export default SentView
