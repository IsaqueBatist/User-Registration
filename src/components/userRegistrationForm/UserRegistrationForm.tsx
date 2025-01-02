import React from 'react';
import './styles.css';

const UserRegistrationForm = () => {
  return (
    <div className="main-container">
      <h2>Register User</h2>
      <form className="user-form">

        <div className="row">
          <div className="input-controler">
            <input type="text" placeholder="Name"/>
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="email" placeholder="Email"/>
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="date" placeholder="Date of Birth"/>
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="number" placeholder="Zip Code"/>
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="text" placeholder="Street"/>
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="text" placeholder="Country"/>
          </div>
          <div className="input-controler">
            <input type="text" placeholder="Postal Code"/>
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="text" placeholder="City"/>
          </div>

          <div className="input-controler">
            <input type="text" placeholder="State"/>
          </div>
        </div>



      </form>
    </div>
  );
};

export default UserRegistrationForm;
