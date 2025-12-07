Backend (Node.js + Express + MongoDB)
------------------------------------

Requirements:
- Node.js (v16+)
- MongoDB (local or Atlas)

1. Copy your dataset CSV to `backend/data/sales.csv` (the repo contains a small sample).
2. Create a `.env` file in backend/ with `MONGO_URI` and `PORT` if you want defaults.
3. Install dependencies: `cd backend && npm install`
4. Seed data: `npm run seed` (this imports CSV to MongoDB using MONGO_URI)
5. Run: `npm start`

API endpoint: GET /api/sales
Query parameters (examples):
- q=searchTerm
- regions=North,South
- genders=Male,Female
- ageMin=20&ageMax=40
- categories=Clothing,Accessories
- tags=summer,sale
- paymentMethods=Cash,Card
- dateFrom=2023-01-01&dateTo=2023-12-31
- sort=date_desc | quantity_desc | customer_asc
- page=1

