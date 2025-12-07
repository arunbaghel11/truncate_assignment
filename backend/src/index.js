require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const salesRoute = require('./routes/sales');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI ;

mongoose.connect(MONGO_URI)
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use('/api/sales', salesRoute);

app.get('/', (req,res)=> res.send({message:'TruEstate Sales API'}));

app.listen(PORT, ()=> console.log('Server running on port', PORT));
