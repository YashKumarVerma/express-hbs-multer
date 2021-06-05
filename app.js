const express = require("express");
const app = new express();
const multer = require("multer");
const exphbs = require("express-hbs");
const bodyParser = require("body-parser");
const path = require("path");

/** configure multer for file upload */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });

/** configure the templating engine */
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

/** load body-parser to get form data as json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

/** directly serve some stuff */
app.use("/", express.static(path.join(__dirname, "public")));

/** upload and save image locally */
app.post("/", upload.single("image"), function (req, res, next) {
  console.log(req.body, req.file);
  return res.json({ body: req.body, file: req.file });
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
