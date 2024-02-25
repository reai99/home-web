import { FC, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FloatButton } from 'antd';
import { HomeOutlined, RollbackOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';

import './index.less';

interface IProps {}

const Index:FC<IProps> = () => {

  const [open, setOpen] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();

  const parentRouterPath = useMemo(() => {
    const pathStr = location.pathname;
    if(pathStr === '/') return false;
    const routerArr = pathStr.split('/');
    return '/' + routerArr.slice(0, -1).join('/');
  }, [location]);

  const generateGuide = () => {
    return (
      <FloatButton.Group
        open={open}
        trigger="click"
        shape="circle"
        style={{ right: 24, top: 20 }}
        onClick={() => { setOpen(!open)}}
        icon={<PlusOutlined />}
      >
        <FloatButton icon={<HomeOutlined />} tooltip="主页" onClick={() => navigate('/')}/>
        { parentRouterPath && <FloatButton icon={<RollbackOutlined />} tooltip="返回上一级" onClick={() => navigate(parentRouterPath)} />}
        <FloatButton icon={<SettingOutlined />} tooltip="管理端" onClick={() => window.location.href = '/admin'}/>
      </FloatButton.Group>
    )
  }

  return (
    <>
      <div className="home-container-wrapper">
        {generateGuide()}
        <div className="home-content-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Index;
