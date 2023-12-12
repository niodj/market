import React, { ChangeEvent } from "react";
import { Time } from "./Time";
import s from "./TopMenu.module.css";
import { SerachLine } from "./SerachLine";

export const TopMenu = () => {
  return (
    <div className={s.wrapper}>
      <SerachLine />
      <Time />
    </div>
  );
};
