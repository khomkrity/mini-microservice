const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  // handle evnet by type
  // insert created post
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  // insert created comment
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  // update moderated comment
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });
    // update content and status
    comment.status = status;
    comment.content = content;
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
