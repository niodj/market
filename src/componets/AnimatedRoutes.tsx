import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import { Sidebar } from "./sidebar/Sidebar";
import { Products } from "./product/Products";
import { Orders } from "./orders/Orders";


export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Sidebar />}>
          <Route index element={<div>start</div>} />
          <Route path='/products' element={<Products />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='*' element={<div>404 No page</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
