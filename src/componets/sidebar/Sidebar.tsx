import { NavLink, Outlet } from "react-router-dom";
import s from "./Sidebar.module.css";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store";



type NavLinkProps ={
  isActive: boolean;
}

export const Sidebar = () => {

 const dark = useSelector((state: StoreType) => state.serviceState.dark);

  return (
    <motion.div
      className={s.wrapperSidebarAndContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={s.sidebarWrapper}>





        <div className={s.avatarAndSettings}>
          <img
            src='https://i.pinimg.com/474x/c2/88/dd/c288dd202b5f578cb2d492d606b0b522.jpg'
            className={s.avatar}
          ></img>
          <NavLink to='/product'>
            {" "}
            <img
              src='https://media.istockphoto.com/id/1446363142/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0-%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C.jpg?s=1024x1024&w=is&k=20&c=0Vw87wyXu6OkysvV0DIx0rf8cdlvIGU_OXBzxQ668rQ='
              className={s.settingBtn}
              alt='Settings'
            />
          </NavLink>
        </div>
        <div className={s.sidebarlinks}>
          <NavLink
            to='/orders'
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
          >
            ORDERS
          </NavLink>

          <NavLink
            to='/products'
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
          >
            PRODUCTS
          </NavLink>

          <a
            className={s.link}
            onClick={() => {
              alert("Local storage cleared");
              localStorage.clear();
            }}
          >
            CLEAN LOCAL STORAGE
          </a>
        </div>
      </div>
      <Outlet />
    </motion.div>
  );
};
