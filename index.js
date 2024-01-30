import express from "express";

const app = express();
const port = 3000;

const posts = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});

app.post("/create-post", (req, res) => {
  if (req.body.blogTitle && req.body.blogContent) {
    req.body.postNum = posts.length;
    posts.push(req.body);
  } else {
    console.log("No Content");
  }
  res.status(200).render("index.ejs", { posts: posts });
});

app.get("/edit-post/:postId", (req, res) => {
  // console.log(req.params);
  const postId = req.params.postId;
  // console.log(posts[postId]);
  res.render("edit-post.ejs", { post: posts[postId] });
});

app.post("/edit-post", (req, res) => {
  res.render("index.ejs", {posts: posts });
});

app.post("/edit-post/:postId", (req, res) => {
  // console.log(req.params);
  posts[req.params.postId].blogTitle = req.body.blogTitle;
  posts[req.params.postId].blogContent = req.body.blogContent;
  res.render("index.ejs", { posts: posts });
  // res.redirect("/");
});

app.get("/remove-post/:postId", (req, res) => {
  posts.splice(req.params.postId, 1);
  // res.render("index.ejs", { posts: posts });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
