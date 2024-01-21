import React, { FC, useEffect, useRef, useState } from "react";
import adminRouters from "@src/_routers/admin";
import { Link } from "react-router-dom";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: FC<IProps> = () => {

  const { pathname } = useLocation();
  const pathKeyMapRef = useRef<Record<string, sting>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currSelectKeys, setCurrSelectKeys] = useState<string[]>([]);

  const getMenus = () => {
    const menuItems = getMenuItems(adminRouters);
    setMenuItems(menuItems);
  }

  const getMenuItems = (menus, fullPath = '') => {
    return menus.map(({ name: label, key, path, icon, children, type }) => {
      const _key = key || path;
      let _path = path;
      const menuItem: MenuItem = {
        key: _key,
        icon,
        label,
        children,
        type,
      };
      if(children instanceof Array) {
        fullPath += path + '/';
        menuItem.type = 'group';
        menuItem.children = getMenuItems(children, fullPath);
      } else {
        _path = fullPath + path;
        menuItem.label = <Link to={fullPath + path}>{label}</Link>; 
      }
      pathKeyMapRef.current[_path] = _key;
      return menuItem;
    });
  }

  const handleSelect = ( { selectedkeys }) => {
    setCurrSelectKeys(selectedkeys);
  };

  useEffect(() => {
    getMenus();
    const defaultSelectKeys = [pathKeyMapRef.current[pathname] || ''];
    setCurrSelectKeys(defaultSelectKeys);
  }, []);

  const generateContent = () => {
    return (
      <Menu
        style={{ height: '100vh' }}
        selectedKeys={currSelectKeys}
        items={menuItems}
        onSelect={handleSelect}
        theme="dark"
      />
    )
  }

  return generateContent();
}

export default Sidebar;