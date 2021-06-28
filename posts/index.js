const express = require('express');
const { randomBytes } = require('crypto');
const app = express();

// body-parser
app.use(express.json());

// local repository for posts
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  // random post id
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  const newPost = posts[id];
  res.status(201).send(newPost);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
