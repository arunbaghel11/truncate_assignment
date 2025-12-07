# Architecture Document

## Backend architecture
- Node.js + Express API server
- Mongoose (MongoDB) models and services
- Controllers handle request parsing and delegate to services
- Services contain query construction (filters, search, sort, pagination)
- A CSV seed utility to import the provided dataset into MongoDB

## Frontend architecture
- React (Vite) application
- Components: SearchBar, FilterPanel, TransactionTable, SortDropdown, Pagination
- services/api.js centralises API calls
- Predictable state in App.jsx using useReducer for combined filter/search/sort state

## Data flow
1. Dataset CSV -> backend/data/sample_sales.csv -> seed script imports into MongoDB.
2. Frontend sends requests to `/api/sales` with query params for q, filters, sort, page.
3. Backend builds a single mongoose query combining search + filters + sort + pagination and returns JSON results.

## Folder structure
See provided repository layout in the assignment spec. This repo follows that structure.

## Module responsibilities
- controllers/: parse HTTP params, validate, return responses
- services/: build and execute DB queries
- models/: Mongoose schema for Sale
- utils/: CSV parsing & seed
- frontend/components/: UI components and hooks

