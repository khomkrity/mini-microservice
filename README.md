# mini-microservice
> Building a simple post-and-comment project using microservice concept

## Goals of this Project :dart:
1. Get a taste of a microservice architecture (async, event-based communication between services)
2. Build as much as possible from scratch
3. Get a basic understanding of how to communicate between front-end and back-end

## Disclaimer :warning:
> Do not use this project as a template for future microservices stuff

## System Overview :globe_with_meridians:
> This application provides a simple post-and-comment functionality that users can create a new post and enter a comment to that post.\
Each comment will be moderated from the system whether that comment should be displayed or not.\
The following are the main components (services) of the system:
- **Client**: A typical Front-end application making a request to query service to display post and comment.
- **Post**: A service used to `CREATE` and `GET` posts.
- **Comment**: A service used to `CREATE` and `GET` comments including receiving updated comment from moderation service.
- **Moderation**: A service used to handle 'created' comments and apply some text moderation to it whether that comment should be approved or rejected.
- **Query**: A service used to serve and sync all the data to the client. This service is a replacement for `GET` posts and comments in order to minimize making lots of requests by the client.
- **Event Bus**: Receives events and publishes them to all of the services.

## API Reference

#### Get all posts and comments

```http
  GET /posts
```

#### Add post

```http
  POST /posts
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`   | `string` | title or topic of the post |

#### Add comment

```http
  POST /posts/:id/comments
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | id of the post |
| `content` | `string` | comment message |

## Installation :computer:
> cd to each service to install dependencies and run
```
# install dependencies
npm install

# run
npm start

```

