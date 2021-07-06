const express = require('express');
const app = express();
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

// body-parser
app.use(express.json());
// handling cors
app.use(cors());

// local repository for posts
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  // random post id
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  
  // emitting PostCreated event
  await axios
    .post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .catch(err => console.log(err.message));

  const newPost = posts[id];
  res.status(201).send(newPost);
});

// receive event from the event bus
app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Hello. This is a post service');
  console.log('Listening on 4000');
});
