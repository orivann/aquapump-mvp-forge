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
    - Frontend: [http://localhost:8080](http://localhost:8080)
    - Backend: [http://localhost:3001](http://localhost:3001)

### Conflict resolution / ports

The repository had a merge conflict between branches that used different frontend ports and Dockerfiles. This has been resolved as follows so you can merge and close the PR:

- Frontend: host port 8080 (mapped to container port 8080)
- Frontend dev image: `Dockerfile.dev` (used by `docker-compose.yml` for the `app` service)
- Frontend production image: `Dockerfile` (builds static files and serves them with nginx)
- Backend: host port 3001 (mapped to container port 3001) — unchanged

If you prefer the frontend dev server to use Vite's default port 5173 instead of 8080, tell me and I will update `vite.config.ts`, `Dockerfile.dev`, and `docker-compose.yml` to match.

### Environment and best practices

This repository uses an `.env` file to make ports and the frontend Dockerfile configurable. This avoids hard-coded ports and makes merging branches easier.

1. Copy the example file:
```sh
cp .env.example .env
```

2. Edit `.env` only when needed. Defaults are:
- `FRONTEND_HOST_PORT=8080`
- `FRONTEND_INTERNAL_PORT=8080`
- `APP_DOCKERFILE=Dockerfile.dev`
- `BACKEND_HOST_PORT=3001`

3. Run compose:
```sh
docker-compose up --build
```

Notes:
- Use `Dockerfile` (production) vs `Dockerfile.dev` (dev) by changing `APP_DOCKERFILE` in `.env`.
- Keep API URLs in the frontend code configurable via environment or runtime config if you need to point to different backend hosts.

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
