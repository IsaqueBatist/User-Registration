import React, { useState } from 'react';
import './styles.css';

import UserRegistrationForm from '../../components/userRegistrationForm/UserRegistrationForm.tsx';
import UserList from '../../components/userList/UserList.tsx';
import { UserType } from '../../types/user.ts';

let renderCounter = 0
const Home = () => {
  const [selectedUser, setSelectedUser] = useState<UserType>({} as UserType)

  const handleUserSelected = (user: UserType): void => {
    setSelectedUser(user)
  }
  renderCounter++
  return (
    <div className="home-page">
      {renderCounter/2}
      <UserRegistrationForm setSelectedUser={setSelectedUser} user={selectedUser} />
      <UserList onUserSelect={handleUserSelected} />
    </div>
  );
};

export default Home;
