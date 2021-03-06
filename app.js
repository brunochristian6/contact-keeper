const express = require("express");
const app = express();

const connectDB = require("./config/db");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const contactsRoutes = require("./routes/contacts");

const PORT = process.env.PORT || 5000;

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
