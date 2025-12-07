import React from "react";
import "../styles.css";

export default function SortDropdown({ uiState, setUiState }) {
  const changeSort = (e) => {
    setUiState((prev) => ({
      ...prev,
      sortBy: e.target.value,
      page: 1,
    }));
  };

  return (
    <select className="sort-select" value={uiState.sortBy} onChange={changeSort}>
      <option value="customer_asc">Sort by: Customer Name (A–Z)</option>
      <option value="date_desc">Date (Newest First)</option>
      <option value="qty_desc">Quantity (High First)</option>
    </select>
  );
}
