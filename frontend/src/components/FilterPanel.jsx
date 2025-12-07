import React from "react";
import "./FilterToolbar.css";

export default function FilterFilters({ uiState, setUiState }) {
  const setDates = (key, val) => {
    setUiState((prev) => ({
      ...prev,
      [key]: val,
      page: 1,
    }));
  };

  return (
    <div className="extra-filters">
      <div className="date-box">
        <input
          type="date"
          value={uiState.dateFrom}
          onChange={(e) => setDates("dateFrom", e.target.value)}
        />
        <input
          type="date"
          value={uiState.dateTo}
          onChange={(e) => setDates("dateTo", e.target.value)}
        />
      </div>
    </div>
  );
}
