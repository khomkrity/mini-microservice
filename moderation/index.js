const express = require('express');
const axios = require('axios');

const app = express();
// body-parser
app.use(express.json());

// receive events from the event bus
app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);
  const { type, data } = req.body;
  // moderate comment status
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    // emit event (moderated comment) to the event bus
    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch(err => console.log(err));
  }
});

app.listen(4003, () => {
  console.log('Hello. This is a comment moderation service');
  console.log('Listening on 4003');
});
