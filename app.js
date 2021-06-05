const express = require("express");
const app = new express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const exphbs = require("express-hbs");
const bodyParser = require("body-parser");
const path = require("path");

app.engine(
  "hbs",
  exphbs.express4({
    partialsDir: path.join(__dirname, "views/partials"),
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "views/layouts/main.hbs",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/** upload and save image locally */
app.post("/", upload.single("image"), function (req, res, next) {
  return res.json({ uploaded: true });
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

/** render homepage */
app.get("/", (req, res) => {
  res.render("pages/home");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
