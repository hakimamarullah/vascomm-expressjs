# NodeJs ExpressJs, PostgreSQL Application using Docker Compose

This project demonstrates how to run a NodeJS application with PostgreSQL using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/hakimamarullah/vascomm-expressjs
   ```

2. Navigate to the project directory:

   ```sh
   cd vascomm-expressjs
   ```

3. Start PostgreSQL container:

   ```sh
   docker-compose up --build -d
   ```

4. Run application (skip this step if the container already running from previous step):

   ```sh
   npm start
   ```
5. Access the ExpressJS application at [http://localhost:3000](http://localhost:3000).



## Stopping the Application

1. [non-detached] To stop the application and remove the containers, press `Ctrl + C` in the terminal where `docker-compose` is running.
2. If you use `-d` option then simple run this command to stop all containers `docker-compose down`


