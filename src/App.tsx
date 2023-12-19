import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.css";
import { AnimatedRoutes } from "./AnimatedRoutes";

import { StoreType } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function App() {



    //////////dark mode mode on time
  const dispatch = useDispatch();
    const dark = useSelector((state: StoreType) => state.serviceState.dark);
  const currentHour = new Date().getHours();

  useEffect(() => {
    if (
      (currentHour > 18 && !dark) ||
      (currentHour < 9 && !dark) ||
      (currentHour > 9 && dark)
    ) {

      dispatch({ type: "CHANGE_THEME" });
    }
  }, []);

  return (
    <div className={`${s.wrapper} ${dark ? s.dark : ""}`}>
      <TopMenu />
      <AnimatedRoutes />

    </div>
  );
}

export default App;
