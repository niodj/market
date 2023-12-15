import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.css";
import { AnimatedRoutes } from "./AnimatedRoutes";
function App() {

  return (
    <div className={s.wrapper}>
      <TopMenu />
     <AnimatedRoutes />
    </div>
  );
}

export default App;
