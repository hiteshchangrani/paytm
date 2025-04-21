// const mongoose = require("mongoose")
// const dotenv = require('dotenv').config()

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.db, {
//       serverSelectionTimeoutMS: 30000,
//       socketTimeoutMS:        45000
//     });
//     console.log("Server is connected to the database");
//   } catch (err) {
//     console.error("Server is not connected to the database:", err.message);
//   }
// };
// connectDb();

require("dotenv").config(); // Load .env
const mongoose = require("mongoose");

const connectDb = async () => {
  const uri = process.env.db;
  if (!uri) {
    console.error("MongoDB URI not found in env");
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};
connectDb();


const userSchema = new mongoose.Schema({
    username: String,
    password: String,   
    firstName: String,
    lastName: String,
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}
