import React from "react";
import style from "./scss/app.scss";
import Home from "./Pages/Home";
import Header from "./component/Header";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
