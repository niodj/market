import React from "react";
import { Time } from "./Time";
import s from "./TopMenu.module.css";


export const TopMenu = (props: any) => {
  return (
    <div className={s.wrapper}>
      <div>
        <img
          src='https://www.freeiconspng.com/download/49594'
          className={s.logo}
          alt='Logo'
        ></img>
      </div>
      <input placeholder='search' onChange={(e) => props.setSearchTerm(e.currentTarget.value)} className={s.searchline}
      />
      <Time />
    </div>
  );
};
