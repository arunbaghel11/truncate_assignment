import React from "react";

export default function TransactionTable({ items = [], loading = false }) {
  const totalUnits = items.reduce((s, i) => s + (i.quantity || 0), 0);
  const totalAmount = items.reduce((s, i) => s + (i.finalAmount || 0), 0);
  const totalDiscount = items.reduce((s, i) => s + ((i.discountPercentage || 0)), 0);

  return (
    <>
      <div className="metric-block" style={{marginTop:8}}>
        <div className="metric-card"><div className="metric-title">Total units sold</div><div className="metric-value">{totalUnits}</div></div>
        <div className="metric-card"><div className="metric-title">Total Amount</div><div className="metric-value">₹{totalAmount.toLocaleString()}</div></div>
        <div className="metric-card"><div className="metric-title">Total Discount</div><div className="metric-value">₹{totalDiscount.toLocaleString()}</div></div>
      </div>

      <div className="table-wrapper">
        {loading && <div style={{padding:12}}>Loading...</div>}
        <table className="styled-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Customer name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Product Category</th>
              <th className="qty">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="9" style={{padding:20,textAlign:"center"}}>No results</td></tr>
            ) : items.map((it) => (
              <tr key={it._id || Math.random()}>
                <td>{it.transactionId}</td>
                <td>{it.date ? new Date(it.date).toLocaleDateString() : ""}</td>
                <td>{it.customerId}</td>
                <td>{it.customerName}</td>
                <td>{it.phoneNumber}</td>
                <td>{it.gender}</td>
                <td>{it.age}</td>
                <td>{it.productCategory}</td>
                <td className="qty">{String(it.quantity || 0).padStart(2, "0")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
