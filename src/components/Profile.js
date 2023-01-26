import { useContext } from 'react'
import Avatar from 'react-avatar'
import { Data } from './Index'

const Profile = () => {
   const { data } = useContext(Data)

   return (
      <div className="profile">
         <Avatar name={data.email} size="35" round={true} />
         <div className="names">
            <h4 className="ownname">{data.email}</h4>
         </div>
      </div>
   )
}

export default Profile
