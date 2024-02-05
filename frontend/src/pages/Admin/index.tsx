import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navigation from './Navigation';

import './index.less';

interface IProps {}

const Admin:FC<IProps> = () => {

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
