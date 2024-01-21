import React, { FC } from "react";
interface IProps {}

const Navigation: FC<IProps> = (props) => {
  return (
    <div className="navigation-wrapper">
      <div className="navigation-logo">
        <span>REAI ADMIN</span>
      </div>
      <div className="navigation-menus"></div>
      <div className="navigation-right">
        <div className="navigation-right-login">
           <div className="login-img">
            <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
           </div>
           <span>admin</span>
        </div>
      </div>
    </div>
  )
}

export default Navigation;