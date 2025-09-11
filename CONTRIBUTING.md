# Contributing to AquaPump Industries

We welcome contributions to the AquaPump Industries web application. Please follow these guidelines to ensure a smooth development process.

## Development Environment

This project is fully containerized with Docker. You do not need to install Node.js or any other dependencies on your local machine. All you need is Docker and Docker Compose.

### Running in Development Mode

1.  **Clone the repository.**
2.  **Create a `.env` file** by copying `.env.example` and filling in the required values for AWS Cognito and AI services.
3.  **Run the application:**
    ```sh
    docker-compose -f infra/docker-compose.yml up --build
    ```

This will start the frontend and backend services in development mode with hot-reloading enabled. Any changes you make to the source code in the `frontend` or `backend` directories will be automatically reflected in the running containers.

### Environment Variables

All configuration is done via the `.env` file in the root of the project. Please refer to `.env.example` for the list of required variables.

**Important:** Never commit your `.env` file to the repository.

## Coding Style

-   **Linting:** We use ESLint for both the frontend and backend. Please run `npm run lint` in the respective directories to check your code before committing. The CI/CD pipeline will also run this check.
-   **Formatting:** We use Prettier for code formatting. Please configure your editor to format on save, or run `npx prettier --write .` before committing.

## Submitting a Pull Request

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes.**
4.  **Ensure all tests and lint checks pass.**
5.  **Submit a pull request** to the `main` branch.

Please provide a clear and descriptive title and description for your pull request.
