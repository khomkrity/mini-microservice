const express = require('express');
const app = express();
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

// body-parser
app.use(express.json());
// handling cors
app.use(cors());
// local repository for comments
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const postId = req.params.id;
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[postId] = comments;

  // emitting CommentCreated event to the event bus
  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId,
        status: 'pending',
      },
    })
    .catch(err => console.log(err));

  res.status(201).send(comments);
});

// receive event from the event bus
app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { id, status, postId, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;
    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: {
          id,
          postId,
          status,
          content,
        },
      })
      .catch(err => console.log(err));
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('Hello. This is a comment service');
  console.log('Listening on 4001');
});
