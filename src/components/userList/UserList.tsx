import React, { useEffect, useState } from 'react';
import './styles.css';
import { getAllUsers, getUserByName } from '../../services/userService.ts';
import { Adress } from '../../types/user.ts';
import RightArrow from '../../assets/svg/arrow-right-short.svg';
import LefttArrow from '../../assets/svg/arrow-left-short.svg';
import { Page } from '../../interfaces/page.ts';

const UserList = () => {
  const [userPage, setUserPage] = useState<Page>({} as Page);
  const [page, setPage] = useState<number>(1);

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

  useEffect(() => {
    getData(page);
  }, []);

  return (
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
                  <td>{user.address.postalCode}</td>
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
  );
};

export default UserList;
