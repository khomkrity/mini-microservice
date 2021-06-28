const express = require('express');
const app = express();
const cors = require('cors');
const { randomBytes } = require('crypto');

// body-parser
app.use(express.json());
// handling cors
app.use(cors());

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
