import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.scss";
import { AnimatedRoutes } from "./AnimatedRoutes";

import { StoreType } from "./store";
import { useDispatch, useSelector } from "react-redux";

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
