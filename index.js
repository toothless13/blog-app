import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});

app.post("/create-post", (req, res) => {
  res.sendStatus(200);
});

app.get("/edit-post", (req, res) => {
  res.render("edit-post.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
