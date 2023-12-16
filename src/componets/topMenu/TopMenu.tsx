import React from "react";
import { Time } from "./Time";
import s from "./TopMenu.module.css";
import { useDispatch } from "react-redux";




export const TopMenu = (props: any) => {

const dispatch = useDispatch();

  return (
    <div className={s.wrapper}>
      <div>
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
