const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const mongoose = require("mongoose");
const Sale = require("../models/Sale");

require("dotenv").config();

// Mongo URI
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/truestate_assignment";

// 📌 Correct file path based on your request
const CSV_PATH = path.join(__dirname, "..", "..", "data", "sales_sample.csv");

async function seed() {
  console.log("CSV PATH:", CSV_PATH);

  if (!fs.existsSync(CSV_PATH)) {
    console.error("❌ CSV file not found at:", CSV_PATH);
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  await Sale.deleteMany({});
  console.log("🗑️ Old records cleared.");

  let batch = [];
  const BATCH_SIZE = 1000;
  let totalInserted = 0;

  const stream = fs
    .createReadStream(CSV_PATH)
    .pipe(csv.parse({ headers: true, ignoreEmpty: true }));

  stream.on("data", (row) => {
    batch.push({
      transactionId: row["Transaction ID"],
      date: row["Date"] ? new Date(row["Date"]) : null,
      customerId: row["Customer ID"],
      customerName: row["Customer Name"],
      phoneNumber: row["Phone Number"],
      gender: row["Gender"],
      age: Number(row["Age"]),
      customerRegion: row["Customer Region"],
      customerType: row["Customer Type"],
      productId: row["Product ID"],
      productName: row["Product Name"],
      brand: row["Brand"],
      productCategory: row["Product Category"],
      tags: row["Tags"]
        ? row["Tags"].split(",").map((t) => t.trim())
        : [],
      quantity: Number(row["Quantity"]),
      pricePerUnit: Number(row["Price per Unit"]),
      discountPercentage: Number(row["Discount Percentage"]),
      totalAmount: Number(row["Total Amount"]),
      finalAmount: Number(row["Final Amount"]),
      paymentMethod: row["Payment Method"],
      orderStatus: row["Order Status"],
      deliveryType: row["Delivery Type"],
      storeId: row["Store ID"],
      storeLocation: row["Store Location"],
      salespersonId: row["Salesperson ID"],
      employeeName: row["Employee Name"],
    });

    if (batch.length >= BATCH_SIZE) {
      stream.pause();

      Sale.insertMany(batch, { ordered: false })
        .then(() => {
          totalInserted += batch.length;
          console.log(`📦 Inserted: ${totalInserted}`);
          batch = [];
          stream.resume();
        })
        .catch((err) => {
          console.error("❌ Batch insert error:", err.message);
          stream.resume();
        });
    }
  });

  stream.on("end", async () => {
    if (batch.length > 0) {
      await Sale.insertMany(batch, { ordered: false });
      totalInserted += batch.length;
      console.log(`📌 Inserted remaining: ${batch.length}`);
    }

    console.log("\n🎉 IMPORT COMPLETED");
    console.log("📊 TOTAL ROWS INSERTED:", totalInserted);

    mongoose.connection.close();
    process.exit(0);
  });
}

seed();
