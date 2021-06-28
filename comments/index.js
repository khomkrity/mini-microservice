const express = require('express');
const app = express();
const { randomBytes } = require('crypto');

// body-parser
app.use(express.json());

// local repository for comments
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const postId = req.params.id;
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
