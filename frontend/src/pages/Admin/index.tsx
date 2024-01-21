import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Sidebar from './SideBar';

import './index.less';

interface IProps {}

const Admin:FC<IProps> = (props) => {

  return (
    <>
      <Navigation/>
      <div className="main-container-wrapper">
        <div className='container-sidebar-wrapper'>
          <Sidebar/>
        </div>
        <div className="container-content-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Admin;
