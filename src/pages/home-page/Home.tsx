import React from 'react';
import './styles.css';

import UserRegistrationForm from '../../components/userRegistrationForm/UserRegistrationForm.tsx';
const Home = () => {
  return (
    <div className="home-page">
      <UserRegistrationForm />
    </div>
  );
};

export default Home;
