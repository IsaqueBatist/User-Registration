import React, { useEffect, useState } from 'react';
import './styles.css';

import { deleteUser, getAllUsers, getNumbersOfUsers, getUserByName } from '../../services/userService.ts';
import { Adress, UserType } from '../../types/user.ts';
import { Page } from '../../interfaces/page.ts';
import removeIcon from "../../assets/svg/remove.svg"
import editIcon from "../../assets/svg/edit.svg"
import { UserListProps } from "../../interfaces/userListProps.ts"
import { Modal, Pagination } from 'antd';

const UserList = ({onUserSelect}: UserListProps) => {
  const [userPage, setUserPage] = useState<Page>({} as Page);
  const [page, setPage] = useState<number>(1);
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [selectUser, setSelectUser] = useState<UserType>({} as UserType)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (user: UserType) => {
    setSelectUser(user)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleDeleteUser(selectUser.id || 0)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getData = async (page: number) => {
    const data = await getAllUsers(page);
    if (data.length === 0) {
      return setUserPage({
        content: [],
        length: 0,
        page: page,
        nextPage: false,
      });
    }
    setUserPage({
      content: data,
      length: data.length,
      page: page,
      nextPage: true,
    });
  };

  const getNextPage = async (currentPage: number) => {
    await getData(currentPage);
    setPage((prevState) => prevState + 1);
  };

  const handleChange = (currentPage: number) => {
    console.log(currentPage)
    if(currentPage > page){
      getNextPage(currentPage)
    }else {
      getPreviusPage(currentPage)
    }
  }

  const getPreviusPage = async (currentPage: number) => {
    await getData(currentPage);
    setPage((prevState) => prevState - 1);
  };

  const handleSearchUser = async (name: string) => {
    if (name.length >= 2 || name.length === 0) {
      const data = await getUserByName(name, 1);
      setPage(1);
      setUserPage({
        ...userPage,
        content: data,
        length: data.length
      });
    }
  };

  const formatAddress = (address: Adress) => {
    return `${address.street}`;
  };
  //TODO: Need to re-render the UserList Component
  const handleEditUser = (userData: UserType): void => {
    onUserSelect(userData)
  }

  const handleDeleteUser = async (userId: number) => {
    try{
      await deleteUser(userId)
      await getData(page)
    }catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData(page);
  }, [page]);

  useEffect(() => {
    const getArraySize = async () => {
      const length = await getNumbersOfUsers()
      setNumberOfUsers(length)
    }
    getArraySize()
  }, [])

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
              <th scope="col">Address</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPage.content &&
              userPage.content.map((user) => (
                <tr key={user.id}>
                  <td scope="row">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{formatAddress(user.address)}</td>
                  <td>
                    <img className='edit-button' src={editIcon} onClick={() => handleEditUser(user)} alt="editButton" />
                    <img className='remove-button' src={removeIcon} onClick={() => showModal(user)} alt="removeButton" />
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}><Pagination className='custom-pagination' align="center" onChange={handleChange} current={page} defaultCurrent={1} pageSize={7} total={numberOfUsers} /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <Modal className='modal' title="Delete user?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p><span>Nome:</span> {selectUser.name}</p>
        <p><span>Address:</span> {selectUser.address && selectUser?.address.street || ''}</p>
    </Modal>
    </>
  );
};

export default UserList;
