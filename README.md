# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a5e7fae8-3356-4c31-a5c7-135bb2f13406

## What is this project?

This project is a web application for AquaPump Industries, a fictional company that sells industrial pumps. The application includes a home page with product information and an AI-powered chatbot to assist users.

## Technologies Used

This project is built with:

- **Frontend**:
  - Vite
  - TypeScript
  - React
  - shadcn-ui
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express
  - TypeScript
- **Database**:
  - Redis (for caching)
- **Containerization**:
  - Docker
  - Docker Compose

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js & npm](https://github.com/nvm-sh/nvm#installing-and-updating) (for local development without Docker)

### Running with Docker (Recommended)

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
    Update the `.env` file with your API keys for the AI services you want to use.

3.  **Build and run the application:**
    ```sh
    docker-compose up --build
    ```
    This command will build the Docker images for the frontend and backend services and start the containers.

4.  **Access the application:**
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend: [http://localhost:3001](http://localhost:3001)

### Running Locally (without Docker)

#### Backend

1.  Navigate to the `server` directory:
    ```sh
    cd server
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add your API keys.
4.  Start the server:
    ```sh
    npm start
    ```

#### Frontend

1.  In a new terminal, navigate to the root of the project:
    ```sh
    cd <YOUR_PROJECT_NAME>
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```

## AI Chatbot

The application includes an AI-powered chatbot that can assist users with product recommendations, technical specifications, and more. The chatbot can be configured to use one of the following AI services:

- OpenAI
- Claude
- Perplexity
- Grok

The `aiService` is set in the `ChatBot.tsx` component. By default, it is set to `openai`.

## AWS Cognito Authentication

This application uses AWS Cognito for user authentication for the admin panel. To set up Cognito, you will need to:

1.  Create a new Cognito User Pool in the AWS console.
2.  Create a new App Client in the User Pool.
3.  Update the `src/aws-exports.js` file with your Cognito User Pool ID, and App Client ID.
