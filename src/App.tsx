import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.css";
import { AnimatedRoutes } from "./AnimatedRoutes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "./store";
import { Button } from "react-bootstrap";
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
