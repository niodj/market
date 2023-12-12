import { Sidebar } from "./componets/sidebar/Sidebar";
import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.css";
import { Products } from "./componets/product/Products";
import { Routes, Route } from "react-router-dom";
import { Orders } from "./componets/orders/Orders";

function App() {
  return (
    <div className={s.wrapper}>
      <TopMenu />
         <Routes>
        <Route path='/' element={<Sidebar />}>
          <Route index element={<div>start</div>} />
          <Route path='/products' element={<Products />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='*' element={<div>404 No page</div>} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
