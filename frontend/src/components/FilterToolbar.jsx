import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import "./FilterToolbar.css";

export default function FilterToolbar({ state, dispatch }) {
  const [openMenu, setOpenMenu] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);

  const safeArr = (key) => (Array.isArray(state[key]) ? state[key] : []);

  const toggleSelect = (key, value) => {
    const arr = safeArr(key);
    if (arr.includes(value)) {
      dispatch({ type: "SET", payload: { [key]: arr.filter((v) => v !== value), page: 1 } });
    } else {
      dispatch({ type: "SET", payload: { [key]: [...arr, value], page: 1 } });
    }
  };

  const regions = ["North", "South", "East", "West"];
  const genders = ["Male", "Female", "Other"];
  const categories = ["Clothing", "Footwear", "Accessories", "Electronics"];
  const payments = ["Card", "Cash", "UPI"];

  return (
    <div className="filter-toolbar" ref={ref}>
      {/* Region */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => toggleMenu("region")}>
          Customer Region ▾
        </button>
        {openMenu === "region" && (
          <div className="dropdown-menu">
            {regions.map((r) => (
              <label key={r} className="dropdown-item">
                <input type="checkbox" checked={safeArr("regions").includes(r)} onChange={() => toggleSelect("regions", r)} />
                {r}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Gender */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => toggleMenu("gender")}>
          Gender ▾
        </button>
        {openMenu === "gender" && (
          <div className="dropdown-menu">
            {genders.map((g) => (
              <label key={g} className="dropdown-item">
                <input type="checkbox" checked={safeArr("genders").includes(g)} onChange={() => toggleSelect("genders", g)} />
                {g}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Age */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => toggleMenu("age")}>
          Age Range ▾
        </button>
        {openMenu === "age" && (
          <div className="dropdown-menu">
            <input type="number" placeholder="Min" value={state.ageMin} onChange={(e) => dispatch({ type: "SET", payload: { ageMin: e.target.value, page: 1 } })} />
            <input type="number" placeholder="Max" value={state.ageMax} onChange={(e) => dispatch({ type: "SET", payload: { ageMax: e.target.value, page: 1 } })} />
          </div>
        )}
      </div>

      {/* Category */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => toggleMenu("category")}>
          Product Category ▾
        </button>
        {openMenu === "category" && (
          <div className="dropdown-menu">
            {categories.map((c) => (
              <label key={c} className="dropdown-item">
                <input type="checkbox" checked={safeArr("categories").includes(c)} onChange={() => toggleSelect("categories", c)} />
                {c}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Tags (free list) */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => toggleMenu("tags")}>
          Tags ▾
        </button>
        {openMenu === "tags" && (
          <div className="dropdown-menu">
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {/* quick suggestions */}
              {["organic","skincare","portable","wireless","gadgets"].map(t => (
                <button key={t} onClick={() => toggleSelect("tags", t)} style={{padding:"6px 8px",borderRadius:6,border:"1px solid #ddd",background:safeArr("tags").includes(t)?"#eef6f2":"#fff"}}>{t}</button>
              ))}
            </div>
            <div style={{marginTop:8}}>
              <input placeholder="comma separated tags" onBlur={(e) => {
                const raw = e.target.value;
                if(!raw) return;
                const arr = raw.split(",").map(s=>s.trim()).filter(Boolean);
                arr.forEach(a => toggleSelect("tags", a));
                e.target.value = "";
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Payment */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => toggleMenu("payment")}>
          Payment Method ▾
        </button>
        {openMenu === "payment" && (
          <div className="dropdown-menu">
            {payments.map((p) => (
              <label key={p} className="dropdown-item">
                <input type="checkbox" checked={safeArr("paymentMethods").includes(p)} onChange={() => toggleSelect("paymentMethods", p)} />
                {p}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Date range */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => toggleMenu("date")}>
          Date ▾
        </button>
        {openMenu === "date" && (
          <div className="dropdown-menu">
            <input type="date" value={state.dateFrom || ""} onChange={(e) => dispatch({ type: "SET", payload: { dateFrom: e.target.value, page: 1 } })} />
            <input type="date" value={state.dateTo || ""} onChange={(e) => dispatch({ type: "SET", payload: { dateTo: e.target.value, page: 1 } })} />
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="dropdown" style={{marginLeft:"auto"}}>
        <button className="dropdown-btn" onClick={() => toggleMenu("sort")}>Sort: {state.sort === "customer_asc" ? "Customer Name (A–Z)" : "Date (Newest)"} ▾</button>
        {openMenu === "sort" && (
          <div className="dropdown-menu">
            <label className="dropdown-item"><input type="radio" name="sort" checked={state.sort === "date_desc"} onChange={() => dispatch({ type: "SET", payload: { sort: "date_desc", page: 1 } })} /> Date (Newest)</label>
            <label className="dropdown-item"><input type="radio" name="sort" checked={state.sort === "customer_asc"} onChange={() => dispatch({ type: "SET", payload: { sort: "customer_asc", page: 1 } })} /> Customer Name (A–Z)</label>
            <label className="dropdown-item"><input type="radio" name="sort" checked={state.sort === "quantity_desc"} onChange={() => dispatch({ type: "SET", payload: { sort: "quantity_desc", page: 1 } })} /> Quantity (High → Low)</label>
          </div>
        )}
      </div>
    </div>
  );
}
