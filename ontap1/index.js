require("dotenv").config();
const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cong-nghe-moi-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
