# mini-microservice
> Building a simple post-and-comment project using microservice concept

## Goals of this Project :dart:
1. Get a taste of a microservice architecture (async, event-based communication between services)
2. Build as much as possible from scratch
3. Get a basic understanding of how to communicate between front-end and back-end

## Disclaimer :warning:
> Do not use this project as a template for future microservices stuff.\
[see why](#downside-of-this-app)

## System Overview :globe_with_meridians:
> This application provides a simple post-and-comment functionality that users can create a new post and enter a comment to that post.\
Each comment will be moderated from the system whether that comment should be displayed or not.

The following are the main components (services) of the system:
- **Client**: A typical Front-end application making a request to query service to display post and comment.
- **Post**: A service used to `CREATE` and `GET` posts.
- **Comment**: A service used to `CREATE` and `GET` comments including receiving updated comment from moderation service.
- **Moderation**: A service used to handle 'created' comments and apply some text moderation to it whether that comment should be approved or rejected.
- **Query**: A service used to serve and sync all the data to the client. This service is a replacement for `GET` posts and comments in order to minimize making lots of requests by the client.
- **Event Bus**: Receives events and publishes them to all of the services.

*Side Note*: *Each service is contained inside a docker image which will be deployed inside a pod (one pod per container) which is exposed by a Cluster IP service.*

## API Reference :compass:
#### Get all posts and comments

```http
  GET /posts
```

#### Add post

```http
  POST /posts/create
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

## Containerization :whale:
> Create a single lightweight executable—called a container—that runs consistently on any infrastructure using Docker
```bash
# in each service directory
# build a docker image
docker build -t username/imagename:tagname .

# create and start a docker container from the image
docker run username/imagename:tagname

# push the image to docker hub
docker push username/imagename:tagname
```

## Container Orchestration :building_construction:
> Managing all of the services inside containers i.e. deployment, networking with services and ingress using kubernetes and ingress-nginx
```bash
# inside infra/k8s directory
# creating pods, deployments and services 
kubectl apply -f service-depl.yaml

# exposes HTTP routes from outside the cluster to services within the cluster.
kubectl apply -f ingress-srv.yaml

# manually restart deployments after making some changes in an image
kubectl rollout restart deployment service-depl
```

## Continuous Development :repeat:
> Automactically handling the workflow for building, pushing, and deploying services using skaffold
```bash
# inside the base directory where skaffold.yaml is
# do a full build and deploy of all artifacts specified in the skaffold.yaml
skaffold dev

# cleanup all the artifacts (if ctrl + c doesn't work)
skaffold delete
```
## Lesson Learned :books:
> [@omekrit](https://www.github.com/omekrit)'s opinion
- The big challenge in microservice is **data** since each service has its own database.
- Async communication focuses on communicating changes using events sent to an event bus.
- Async communication encourages each service to be 100% self-sufficient which will be relatively easy to handle temporary downtime or new service creation.
- Docker makes it easier to package up services.
- Kubernetes is a pain to setup, but makes it easier to deploy and scale services.
- Apart of microservice concept, it's a prerequisite for everyone before jumping into the microservice world to first have a basic understanding of **how to build an app (programming languages, front-end, back-end, frameworks, tools, and other stuff related)**
### Downside of this App :-1:
- Lots of duplicated code (specifically the backend services).
- It's a pain to picture and test the flow of events between services.
- It's also a pain to remember what properties an event should have.
- Running kubernetes locally is not a good idea (laggy). 