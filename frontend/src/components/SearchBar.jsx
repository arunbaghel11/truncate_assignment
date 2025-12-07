import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by customer name or phone..."
        style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", minWidth: 360 }}
      />
    </div>
  );
}
