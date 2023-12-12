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
        <div className={s.avatar}><img src=""></img></div>
        <div className={s.sidebarlinks}>
          <NavLink
            to='/orders'
            className={({ isActive }: NavLinkProps) =>
              isActive ? s.active : ""
            }
          >
            Orders
          </NavLink>
          <NavLink
            to='/products'
            className={({ isActive }: NavLinkProps) =>
              isActive ? s.active : ""
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
