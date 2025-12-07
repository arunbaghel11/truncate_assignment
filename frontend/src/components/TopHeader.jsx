import React from "react";
import "../styles.css";

export default function TopHeader({ search, onSearch }) {
  return (
    <div className="top-header">
      <h2>Sales Management System</h2>
      <input
        className="search-input"
        placeholder="Name, Phone no."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
