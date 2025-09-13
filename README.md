# AquaPump Industries Web Application

This project is a web application for AquaPump Industries, a fictional company that sells industrial pumps. The application includes a home page with product information, and an AI-powered chatbot.

## Project Structure

The project is organized into three main directories:

-   `frontend/`: Contains the React frontend application.
-   `backend/`: Contains the Node.js/Express backend application.
-   `infra/`: Contains the Docker and CI/CD configuration.

## Technologies Used

-   **Frontend**:
    -   React, Vite, TypeScript
    -   shadcn-ui, Tailwind CSS
    -   i18next for internationalization (English & Hebrew)
-   **Backend**:
    -   Node.js, Express, TypeScript
-   **Database**:
    -   PostgreSQL
-   **Containerization**:
    -   Docker, Docker Compose

## Getting Started (Docker-First)

This project is designed to be run with Docker. No local installation of Node.js or other dependencies is required.

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```

2.  **Create an environment file:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Update the `.env` file with any API keys for the AI services you want to use.

3.  **Build and run the application:**
    ```sh
    docker-compose up --build
    ```
    This command will build the Docker images for the frontend and backend services and start the containers.

4.  **Access the application:**
    -   Frontend: [http://localhost:8081](http://localhost:8081)
    -   Backend: [http://localhost:3001](http://localhost:3001)

## CI/CD

The project includes a GitHub Actions workflow that builds, lints, and tests the frontend and backend on every push and pull request. On merge to the `main` branch, it also builds and pushes the production Docker images to Amazon ECR.

## AI Chatbot

The application includes an AI-powered chatbot that can be configured from the admin panel.
