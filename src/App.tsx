import { Sidebar } from "./componets/sidebar/Sidebar";
import { TopMenu } from "./componets/topMenu/TopMenu";
import s from "./App.module.css";
import { Products } from "./componets/product/Products";
import { Routes, Route } from "react-router-dom";
import { Orders } from "./componets/orders/Orders";
import  { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  console.log(searchTerm);

  return (
    <div className={s.wrapper}>
      <TopMenu setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path='/' element={<Sidebar />}>
          <Route index element={<div>start</div>} />
          <Route
            path='/products'
            element={<Products searchTerm={searchTerm} />}
          />
          <Route path='/orders' element={<Orders />} />
          <Route path='*' element={<div>404 No page</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;


