import { Oval } from 'react-loader-spinner'
import { useContext } from 'react'
import { Data } from './Index'

const Loader = ({ mode }) => {
   const { maxHeight } = useContext(Data)

   const container = {
      width: '100%',
      height: maxHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   }

   const loaders = {
      width: 'auto',
      height: 'auto',
   }

   const brand = {
      textAlign: 'center',
      fontSize: '32px',
      color: 'black',
      padding: '12px',
   }

   const loader = {
      width: '80px',
      height: '80px',
      margin: '0 auto',
   }

   const loaderText = {
      textAlign: 'center',
      fontSize: '22px',
      color: 'black',
      padding: '12px',
   }

   if (mode === 'main') {
      return (
         <>
            <div style={container}>
               <div style={loaders}>
                  <h3 style={brand}>MAILENGER</h3>
                  <div style={loader}>
                     <Oval
                        height={80}
                        width={80}
                        color="darkviolet"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="lightviolet"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                     />
                  </div>

                  <p style={loaderText}>
                     Please wait while we load your emails
                  </p>
               </div>
            </div>
         </>
      )
   } else {
      return (
         <div style={container}>
            <div style={loaders}>
               <div style={loader}>
                  <Oval
                     height={50}
                     width={50}
                     color="darkviolet"
                     wrapperStyle={{}}
                     wrapperClass=""
                     visible={true}
                     ariaLabel="oval-loading"
                     secondaryColor="lightviolet"
                     strokeWidth={3}
                     strokeWidthSecondary={3}
                  />
               </div>
            </div>
         </div>
      )
   }
}

export default Loader
