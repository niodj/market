import React, { ChangeEvent } from "react";
import { Time } from "./Time";
import s from "./TopMenu.module.css";
import { SerachLine } from "./SerachLine";

export const TopMenu = () => {
  return (
    <div className={s.wrapper}>
      <div>
        <img
          src='https://www.freeiconspng.com/download/49594'
          className={s.logo}
        ></img>
      </div>
      <SerachLine />
      <Time />
    </div>
  );
};
