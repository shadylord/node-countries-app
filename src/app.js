const express = require("express");
const hbs = require("hbs");
const path = require("path");

const countries = require("../src/utils/countries");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsDirectory);

hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Countries App"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Rizky Ramadhan"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    author: "Rizky Ramadhan"
  });
});

app.get("/countries", (req, res) => {
  countries(req.query.countryName, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      ...data
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    message: "Error 404. The page you looking for doesn't exist."
  });
});

app.listen(port, () => console.log(`Listening to port ${port} ...`));
