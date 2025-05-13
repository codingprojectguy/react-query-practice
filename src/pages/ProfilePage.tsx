import React from 'react'
import { fetchProducts } from '../api/store/Product.api'
const ProfilePage: React.FC = () => {
   console.log(fetchProducts())
  return (
    <div className='profile-page'>
      <h3>My Profile</h3>
      <div className="profile-bar">
        <div className="user-info">
          <h3>Account Information</h3>
          <span>Username: XXXXX<br /> Birthday:  XXXXXXXX<br />Address: XXXXXXXX</span>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
