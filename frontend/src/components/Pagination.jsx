import React from "react";

export default function Pagination({ page = 1, totalPages = 1, onChange = () => {} }) {
  const pages = [];
  const show = 6;
  let start = Math.max(1, page - Math.floor(show / 2));
  if (start + show - 1 > totalPages) start = Math.max(1, totalPages - show + 1);
  for (let i = 0; i < Math.min(show, totalPages); i++) pages.push(start + i);

  return (
    <div className="pagination" style={{marginTop:14}}>
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page <= 1}>Previous</button>
      {pages.map((p) => (
        <button key={p} className={p === page ? "active" : ""} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
