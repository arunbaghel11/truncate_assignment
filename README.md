# TruEstate – Retail Sales Management System

A full-stack Retail Sales Management System built as part of the TruEstate SDE Intern Assignment.  
The system implements high-performance **search, filtering, sorting, and pagination** over structured retail sales data, with a clean frontend UI inspired by the provided Figma design and a scalable backend architecture.

---

## 🚀 Tech Stack

### **Frontend**
- React (Vite)
- Component-based UI architecture  
- Axios for API communication  
- Custom CSS aligned with Figma layout

### **Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- CSV ingestion using `fast-csv` streaming  
- Bulk insertion for scalable dataset loading  

---

## 🔍 Search Implementation Summary

Full-text search implemented on:

- **Customer Name**
- **Phone Number**

Search Features:
- Case-insensitive  
- Uses MongoDB `$regex`  
- Works with filters, sorting & pagination  
- Core logic located in `salesService.js → buildFilter()`  

---

## 🎛️ Filter Implementation Summary

Supports **multi-select** and **range-based filters**:

| Filter | Type | Backend Logic |
|--------|------|----------------|
| Customer Region | Multi-select | `{ customerRegion: { $in: [...] } }` |
| Gender | Multi-select | `{ gender: { $in: [...] } }` |
| Age Range | Min–Max | `{ age: { $gte, $lte } }` |
| Product Category | Multi-select | `{ productCategory: { $in: [...] } }` |
| Tags | Multi-select | `{ tags: { $all: [...] } }` |
| Payment Method | Multi-select | `{ paymentMethod: { $in: [...] } }` |
| Date Range | Range | `{ date: { $gte, $lte } }` |

Filters:
- Work independently  
- Combine seamlessly  
- Persist along with sorting & pagination  

---

## 🔽 Sorting Implementation Summary

Sorting options implemented:

| Sort Key | Description |
|----------|-------------|
| `date_desc` | Newest first |
| `quantity_desc` | Highest quantity first |
| `customer_asc` | Customer Name A → Z |

Sorting occurs **after applying search & filters**, ensuring accurate ordering.

---

## 📄 Pagination Implementation Summary

- Page size: **10 items**
- Supports Next / Previous navigation  
- Persists:
  - Search  
  - Filters  
  - Sorting  
- Backend uses:
  - `skip = (page - 1) * 10`
  - `limit = 10`

API Response:
```json
{
  "total": 500,
  "page": 1,
  "pageSize": 10,
  "items": [...]
}
```

---

## 🧱 Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md
│
└── README.md
```

---

## ⚙️ Setup Instructions

### **1️⃣ Backend Setup**

```bash
cd backend
npm install
```

Create `.env`:

```
MONGO_URI=mongodb://localhost:27017/truestate_assignment
PORT=5000
```

Seed dataset (recommended 300–500 rows):

```bash
npm run seed
```

Start server:

```bash
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### **2️⃣ Frontend Setup**

```bash
cd frontend
npm install
```

Create `.env`:

```
VITE_API_BASE=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## ✔️ Notes

- Handles empty results, conflicting filters, invalid ranges, large combinations  
- Clean modular React + Express code  
- No duplicate logic  
- State management via `useReducer`  
- UI manually built to match Figma  

---

## 🎉 Final Submission

Add the following before submitting:

- **GitHub Repository Link**

Your project is now **fully ready for submission**.

