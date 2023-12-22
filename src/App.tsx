import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.scss";
import { AnimatedRoutes } from "./componets/AnimatedRoutes";
import { StoreType } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

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
      <div className={s.topMenu_and_Wrapper}>
        <TopMenu />
        <div className={s.themeToggle}>
          {dark ? "it's a time of darkness." : "it's daylight time"}
          <Form>
            <Form.Check
              type='switch'
              checked={dark}
              onChange={() => dispatch({ type: "CHANGE_THEME" })}
            ></Form.Check>
          </Form>
        </div>
      </div>
       <AnimatedRoutes />
    </div>
  );
}

export default App;
