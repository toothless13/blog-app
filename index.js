import express from "express";
import { v4 as uuidv4 } from "uuid";

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
    req.body.postNum = uuidv4();
    posts.push(req.body);
  } else {
    console.log("No Content");
  }
  res.status(200).render("index.ejs", { posts: posts });
});

app.get("/edit-post/:postId", (req, res) => {
  // console.log(req.params);
  const postId = req.params.postId;
  // console.log(postId);
  // console.log(posts);
  const findPostIndex = post => {
    if (postId == post.postNum) {
      return true;
    } else {
      return false;
    }
  }
  const postIndex = posts.findIndex(findPostIndex);
  // console.log(`Post Index is ${postIndex}`);
  // console.log(postId);
  // console.log(posts[postIndex]);
  // console.log(posts);
  res.render("edit-post.ejs", { post: posts[postIndex] });
});

app.get("/edit-post", (req, res) => {
  res.render("index.ejs", {posts: posts });
});

app.post("/edit-post/:postId", (req, res) => {
  console.log(req.params);
  console.log(posts);

  const postId = req.params.postId;
  // console.log(postId);
  // console.log(posts);
  const findPostIndex = post => {
    if (postId == post.postNum) {
      return true;
    } else {
      return false;
    }
  }
  const postIndex = posts.findIndex(findPostIndex);

  posts[postIndex].blogTitle = req.body.blogTitle;
  posts[postIndex].blogContent = req.body.blogContent;
  res.render("index.ejs", { posts: posts });
  // res.redirect("/");
});

app.get("/remove-post/:postId", (req, res) => {
  posts.splice(req.params.postId, 1);
  res.render("index.ejs", { posts: posts });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
