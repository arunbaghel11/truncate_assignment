import React from "react";
import "../styles.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box">
          <img src="/logo.png" alt="logo" />
        </div>
        <div>
          <div className="user-name">Vault</div>
          <div className="user-role">Anurag Yadav</div>
        </div>
      </div>

      <div className="section-title">Dashboard</div>
      <div className="section-title">Nexus</div>
      <div className="section-title">Intake</div>

      <div className="section-title">Services</div>
      <div className="item">Pre-active</div>
      <div className="item">Active</div>
      <div className="item">Blocked</div>
      <div className="item">Closed</div>

      <div style={{height:12}} />

      <div className="section-title">Invoices</div>
      <div className="item selected">Proforma Invoices</div>
      <div className="item">Final Invoices</div>
    </div>
  );
}
