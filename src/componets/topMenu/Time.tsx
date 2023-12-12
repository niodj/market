import React, { useState, useEffect } from "react";
import s from "./TopMenu.module.css"
export const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const day = time.toLocaleString("en-US", { weekday: "long" });
  const date = time.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeString = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={s.timeItems}>
      <div> {day}</div>
      <div>
        {date}
     {"  "}
        <img
          src='https://www.freeiconspng.com/download/7813'
          className={s.clockLogo}
        ></img>
        {timeString}
      </div>
    </div>
  );
};
