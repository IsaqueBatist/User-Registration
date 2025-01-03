import React from 'react';
import './styles.css';

import UserRegistrationForm from '../../components/userRegistrationForm/UserRegistrationForm.tsx';
import UserList from '../../components/userList/UserList.tsx';

const Home = () => {
  return (
    <div className="home-page">
      <UserRegistrationForm />
      <UserList />
    </div>
  );
};

export default Home;
