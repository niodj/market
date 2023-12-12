import React, { useState, useEffect } from "react";

export const Time = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []); // Пустой массив зависимостей означает, что эффект будет запущен только при монтировании компонента

  return (
    <>
      <div>{time}</div>
    </>
  );
};
