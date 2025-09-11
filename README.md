# AquaPump Industries Web Application

This project is a web application for AquaPump Industries, a fictional company that sells industrial pumps. The application includes a home page with product information, an AI-powered chatbot, and optional user authentication with AWS Cognito.

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
-   **Authentication**:
    -   AWS Cognito
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
    Update the `.env` file with your AWS Cognito credentials and any API keys for the AI services you want to use.

3.  **Build and run the application:**
    ```sh
    docker-compose -f infra/docker-compose.yml up --build
    ```
    This command will build the Docker images for the frontend and backend services and start the containers.

4.  **Access the application:**
    -   Frontend: [http://localhost:8081](http://localhost:8081)
    -   Backend: [http://localhost:3001](http://localhost:3001)

## AWS Cognito Setup

The frontend is configured to use AWS Cognito for authentication. The configuration is done via environment variables. You need to set the following variables in your `.env` file:

-   `VITE_AWS_REGION`: The AWS region where your Cognito User Pool is located (e.g., `us-east-1`).
-   `VITE_COGNITO_USER_POOL_ID`: The ID of your Cognito User Pool.
-   `VITE_COGNITO_CLIENT_ID`: The ID of your Cognito User Pool client.

The backend validates the JWTs from Cognito. No additional configuration is needed on the backend for authentication to work.

## CI/CD

The project includes a GitHub Actions workflow that builds, lints, and tests the frontend and backend on every push and pull request. On merge to the `main` branch, it also builds and pushes the production Docker images to Amazon ECR.

## AI Chatbot

The application includes an AI-powered chatbot that can be configured from the admin panel. The admin panel is accessible to authenticated users who are part of the `admin` group in Cognito.
