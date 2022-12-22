# Mobimeo Technical Task

## Installation & Setup

- After cloning, run `npm install`
- Copy `.env.example` to `.env` and adjust its variables accordingly.

### Starting the Application with Docker

- Inside the root of the project, run `docker build . -t <suitable-image-name>`
- Run `docker run -p <desired-port>:8080 -d <suitable-image-name>`

### Terminating the Docker Application 
- To kill the application, first run `docker ps` to get the containerId. 
- Run `docker kill <containerId>`
