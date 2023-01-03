# Github User Query Service
Service which exposes an API that retrieves github users by programming language. 

## Installation & Setup

- After cloning, run `npm install`
- Copy `.env.example` to `.env` and adjust its variables accordingly.

### Starting the Application with Docker

- Inside the root of the project, run `docker build . -t <suitable-image-name>`
- Run `docker run -p <desired-port>:8080 -d <suitable-image-name>`
- Example scripts: 
- `docker build . -t vladnec/query-service`
- `docker run -p 49160:8080 -d vladnec/query-service` 

### Terminating the Docker Application 
- To kill the application, first run `docker ps` to get the containerId. 
- Run `docker kill <containerId>`


### Routes

Route schema : `${host}:${port}/git/users/${programmingLanguage}` </br>
Route example: http://localhost:2000/git/users/java
