import React, { useEffect, useState } from 'react';
import './styles.css';

import { deleteUser, getAllUsers, getUserByName } from '../../services/userService.ts';
import { Adress, UserType } from '../../types/user.ts';
import RightArrow from '../../assets/svg/arrow-right-short.svg';
import LefttArrow from '../../assets/svg/arrow-left-short.svg';
import { Page } from '../../interfaces/page.ts';
import removeIcon from "../../assets/svg/remove.svg"
import editIcon from "../../assets/svg/edit.svg"
import { UserListProps } from "../../interfaces/userListProps.ts"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const UserList = ({onUserSelect}: UserListProps) => {
  const [userPage, setUserPage] = useState<Page>({} as Page);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState(false)
  const [selectUser, setSelectUser] = useState<UserType>({} as UserType)

  const handleOpen = (user: UserType) => {
    setSelectUser(user)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getData = async (page: number) => {
    const data = await getAllUsers(page);
    if (data.length === 0) {
      return setUserPage({
        ...userPage,
        nextPage: false,
      });
    }
    setUserPage({
      ...userPage,
      content: data,
      length: data.length,
      page: page,
      nextPage: true,
    });
  };
  const handleNextPage = async () => {
    await getData(page + 1);
    setPage((prevState) => prevState + 1);
    console.log(`nextpage: ${page}`);
  };

  const handlePreviusPage = async () => {
    await getData(page - 1);
    setPage((prevState) => prevState - 1);
    console.log(`previus page: ${page}`);
  };

  const handleSearchUser = async (name: string) => {
    if (name.length >= 2 || name.length === 0) {
      const data = await getUserByName(name, 1);
      setPage(1);
      setUserPage({
        ...userPage,
        content: data,
      });
    }
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
  //TODO: Need to re-render the UserList Component
  const handleEditUser = (userData: UserType): void => {
    onUserSelect(userData)
  }

  const handleDeleteUser = (userId: number) => {
    try{
      deleteUser(userId)
      getData(page)
    }catch (error) {
      console.error(error)
    }
    handleClose()
  }

  useEffect(() => {
    getData(page);
  }, []);

  return (
    <>
    <div className="userlist-container">
      <h2>List of Users</h2>
      <div className="list-users">
        <div className="filter">
          <input
            type="text"
            placeholder="Search User"
            onChange={(e) => handleSearchUser(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Address</th>
              <th scope="col">Zipcode</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPage.content &&
              userPage.content.map((user) => (
                <tr key={user.id}>
                  <td scope="row">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(new Date(user.dof))}</td>
                  <td>{formatAddress(user.address)}</td>
                  <td>{user.zipCode}</td>
                  <td>
                    <img className='edit-button' src={editIcon} onClick={() => handleEditUser(user)} alt="editButton" />
                    <img className='remove-button' src={removeIcon} onClick={() => handleOpen(user)} alt="removeButton" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="page-control">
          {userPage.page > 1 ? (
            <img
              src={LefttArrow}
              onClick={handlePreviusPage}
              alt="previusPage"
            />
          ) : (
            <div></div>
          )}
          {userPage.nextPage && (
            <img src={RightArrow} onClick={handleNextPage} alt="nextPage" />
          )}
        </div>
      </div>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description buttons"
      >
        <Box className="modal">
          <h2 id="parent-modal-title">Delete User?</h2>
          <p className='user-info-modal'>Name: {selectUser.name}</p>
          <p className='button-modal' id="parent-modal-description">
            <Button onClick={() => handleDeleteUser(selectUser.id || 0)} color='error' variant='contained'>Delete</Button>
            <Button variant='contained' onClick={handleClose}>Cancel</Button>
          </p>
        </Box>
      </Modal>
    </>
  );
};

export default UserList;
