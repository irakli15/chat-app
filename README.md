# chat-app
The purpose of this project is educational.
General strategies and technologies that will be used:
- Backend will be written in Java, Spring and frontend in React js, postgres for database for now.
- backend will be a microservice, will have multiple instances.
- Client and server communications will be using WebSockets.
- Syncronizing data between instances will use Messaging (kafka/RabbitMQ/Redis pubsub)
- It is questionable how well and realtime will the syncronizations be.
- implement CI/CD principles. Use Jenkins/CircleCi.
- Testing must be a big part.
- Containerization.


Rough development path:
- Start out with basic REST backend
- Migrate backend to SpringWebflux and reactive RESTful
- Write simple front-end between these two steps, shouldn't neet changing between them.
- Turn backend into a microservice and containerize it, use messaging 
  to sync data between instances (all of them will have the same data for now).
- Migrate REST to websockets for more in-sync messaging.
- Maybe brush up and improve front-end at this point
