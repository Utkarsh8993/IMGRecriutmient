import React from 'react';

const Profile = ({ userData }) => {
  return (
    <div>
        <ul>
      {userData.map(user => (
        <li>{user.username}</li>))}
      </ul>
    </div>
  )
}

export default Profile
