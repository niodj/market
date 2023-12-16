import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.css";
import { AnimatedRoutes } from "./AnimatedRoutes";

import { StoreType } from "./store";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function App() {

  const dark = useSelector((state: StoreType) => state.serviceState.dark);
  return (
    <div className={`${s.wrapper} ${dark ? s.dark : ""}`}>
      <TopMenu />
      <AnimatedRoutes />
      
    </div>
  );
}

export default App;
