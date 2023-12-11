# Star Wars Proxy API

This project is a RESTful API built with [Nest](https://github.com/nestjs/nest) framework. It provides information about the Star Wars universe, including films, characters, starships, and species. The data is fetched from the [Star Wars API (SWAPI)](https://swapi.dev/).

## Redis Caching

This project uses Redis for caching data. Redis is an open-source, in-memory data structure store that can be used as a database, cache, and message broker.


## Monitoring Redis Activity

While the application is running, you can monitor the activity of Redis in real-time using the `redis-cli monitor` command. This command streams every command processed by the Redis server, which can be useful for understanding how the application is interacting with Redis.

To use this command, open a second terminal window and run:

```bash
docker exec -it <container-name-or-id> 
$ redis-cli monitor
```

Replace <container-name-or-id> with the name or ID of your Redis container. If you're not sure what the name or ID is, you can use the docker ps command to list all running containers.
## ENV
The Redis configuration values in this project are hardcoded for the sake of simplicity and ease of setup. While best practices typically involve storing configuration values in environment variables (using a `.env` file or similar), in this case, the decision was made to prioritize a smooth, hassle-free initial setup for anyone downloading and running the project. This approach eliminates the need for users to create additional configuration files before they can get the project up and running.
## Installation

First, install the necessary packages:

```bash
$ npm install
```

## Running the app with Docker
You can use Docker Compose to run the app:

### Build and run the app
```bash
$ docker compose up --build
```
### Stop and remove containers
```bash
$ docker compose down
```

## Swagger Documentation

This project uses Swagger UI for API documentation. Once the application is running, you can access the Swagger UI by navigating to http://localhost:3000/api in your web browser.

The Swagger UI provides a visual interface for exploring the API. It lists all the available endpoints, their request parameters, and their response formats. You can also use it to send requests to the API and view the responses.
## Test
I wrote test only for ApiService and for FilmsModule logic. At this point all other modules are using the same logic as the films Module. So writing test for each one would be redundant.
### Running the unit tests:
```bash
$ npm run test
```
### Generate a test coverage report:
```bash
$ npm run test:cov
```