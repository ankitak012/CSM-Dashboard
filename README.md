# Command
`docker-compose -f docker-compose-dev.yml up`

`docker-compose -f docker-compose-dev.yml up --force-recreate frontend`

`docker-compose -f docker-compose-dev.yml up --build`


# Running the Development Environment
To start the development environment using Docker, follow these steps:

1. Run the Docker Compose File
Use the following command to run the docker-compose-dev.yml file:
`docker-compose -f docker-compose-dev.yml up`
This will start the necessary containers for both the frontend and backend services.

2. Attach IDE to Containers
Once the containers are up and running:
Open your IDE (e.g., VS Code).
Attach the IDE to both the frontend and backend containers using the Remote Containers extension or Docker integration.

3. Start Backend Server
Inside the backend container, run the following command:
`python manage.py runserver 0.0.0.0:8000`
This will start the Django development server on port 8000.

4. Start Frontend Server
Inside the frontend container, run the following command:
`ng serve --host 0.0.0.0 --port 4200 --hmr --poll=2000`
This will start the Angular development server on port 4200 with Hot Module Replacement (HMR) enabled.