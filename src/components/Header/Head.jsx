import React from "react";
import { Link } from "react-router-dom"; 
import "./Header.css";

export const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
        <div className="left-row">
  <label htmlFor="">
          <Link aria-label="Home" className="left-row white-text" to="/">merkle-bloomreach test shop</Link>
  </label>  
</div>

          <div className="right-row">
            <span>
              <label htmlFor="">Need Help ?</label>
            </span>
            <span>
              <label htmlFor="">EN</label>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
