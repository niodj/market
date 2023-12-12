import { NavLink, Outlet } from "react-router-dom";
import s from "./Sidebar.module.css";
import Button from "react-bootstrap/esm/Button";

interface NavLinkProps {
  isActive: boolean;
}

export const Sidebar = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.avatarAndLinks}>
        <div className={s.avatarAndSettings}>
          <img
            src='https://i.pinimg.com/474x/c2/88/dd/c288dd202b5f578cb2d492d606b0b522.jpg'
            className={s.avatar}
          ></img>
          <NavLink to='/product'>
            {" "}
            <img
              src='https://imgpng.ru/d/gear_PNG37.png'
              className={s.settingBtn}
              alt='Settings'
            />
          </NavLink>
        </div>
        <div className={s.sidebarlinks}>
          <NavLink
            to='/orders'
            className={({ isActive }: NavLinkProps) =>
              isActive ? s.active : s.noActive
            }
          >
            Orders
          </NavLink>
          <NavLink
            to='/products'
            className={({ isActive }: NavLinkProps) =>
              isActive ? s.active : s.noActive
            }
          >
            Products
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
