
import { Time } from "./Time";
import s from "./TopMenu.module.css";
import React, { useEffect, useState } from "react";
import { StoreType } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";


export const TopMenu = () => {
  const dispatch = useDispatch();
  //////////dark mode
  const dark = useSelector((state: StoreType) => state.serviceState.dark);
  const currentHour = new Date().getHours();
  useEffect(() => {
    currentHour >= 19 || (currentHour < 6 && !dark)
      ? dispatch({ type: "CHANGE_THEME" })
      : dispatch({ type: "" });
  }, []);


  return (
    <div className={s.wrapper}>
      <div className={s.themeToggle}>
        <Form>
          <Form.Check
            type='switch'
            label='dark'
            checked={dark}
            onChange={() => dispatch({ type: "CHANGE_THEME" })}
          ></Form.Check>
        </Form>
      </div>

      <div className={s.logoAndImg}>
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
