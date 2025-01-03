import React from 'react';
import "./styles.css"
import User from '../user/User.tsx';

const UserList = () => {
  return (
    <div className="userlist-container">
      <h2>List of Users</h2>
      <div className="list-users">
        <User/>
      </div>
    </div>
  );
};

export default UserList;
