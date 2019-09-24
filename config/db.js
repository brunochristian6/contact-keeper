const mongoose = require("mongoose");
require("dotenv/config");
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected");
  } catch (err) {
    return console.log(err);
  }
};

module.exports = connectDB;
