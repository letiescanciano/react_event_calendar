# Full stack event app
- Simple event app with calendar and list view

# Front
Project created using create-react-app

# Back
Express server with node.js
Endpoints
| Route | Method | Description |
| ------ | ------ |------ |
|/events|	GET	|Show all events
|/events|	POST|	Create new event
|/events/:id|	GET|	Show event details
|/events/:id|	PUT|	Update event details
|/events/:id|	DELETE|	Delete event


To run the project, clone the repo and:
```bash 
➜  front: npm start
```

To start the server:
```bash 
➜  back: npm run dev
```

*You need to have your own MongoDB Database on your machine or in MongoAtlas and create the proper env file with the required variables:
- DB
- PORT
- ENV
