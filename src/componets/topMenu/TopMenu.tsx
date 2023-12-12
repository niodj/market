import React, { ChangeEvent } from "react";
import { Time } from "./Time";
import s from "./TopMenu.module.css";
import { SearchLine } from "./SearchLine";

export const TopMenu = () => {
  return (
    <div className={s.wrapper}>
      <div>
        <img
          src='https://www.freeiconspng.com/download/49594'
          className={s.logo}
        ></img>
      </div>
      <SearchLine />
      <Time />
    </div>
  );
};
