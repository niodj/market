
import { Time } from "./Time";
import s from "./TopMenu.module.css";

import { StoreType } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";


export const TopMenu = () => {
  const dispatch = useDispatch();


  const dark = useSelector((state: StoreType) => state.serviceState.dark);


  return (
    <div className={`${s.wrapper} ${dark ? s.dark : ""}`}>
        <div className={s.themeToggle}>
          {dark ? "it's a time of darkness." : "it's daylight time"}
        <Form>
          <Form.Check
            type='switch'
            checked={dark}
            onChange={() => dispatch({ type: "CHANGE_THEME" })}
          ></Form.Check>
        </Form>
      </div>

      <div className={s.logoAndSearch}>
        <img
          src='https://www.freeiconspng.com/download/49594'
          className={s.logo}
          alt='Logo'
        ></img>

        <input
          placeholder='search'
          onChange={(e) =>
            dispatch({ type: "SEARCH_TERM", searchTerm: e.currentTarget.value })
          }
          className={s.searchline}
        />
      </div>
      <Time />
    </div>
  );
};
