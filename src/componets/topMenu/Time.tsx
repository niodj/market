import React, { useState, useEffect } from "react";

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
    <div>
      <div>Day: {day}</div>
      <div>Date: {date}</div>
      <div>Time: {timeString}</div>
    </div>
  );
};
