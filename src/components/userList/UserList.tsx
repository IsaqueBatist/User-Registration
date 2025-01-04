import React, { useEffect, useState } from 'react';
import './styles.css';
import { getAllUsers } from '../../services/user.ts';
import { Adress, UserType } from '../../types/user.ts';

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const getData = async (page: number) => {
    const data = await getAllUsers(page);
    console.log(data);
    setUsers(data);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formatAddress = (address: Adress) => {
    return `${address.street}, ${address.country}`;
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <div className="userlist-container">
      <h2>List of Users</h2>
      <div className="list-users">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Address</th>
              <th scope="col">Zipcode</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td scope="row">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(new Date(user.dof))}</td>
                  <td>{formatAddress(user.address)}</td>
                  <td>{user.address.postalCode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
