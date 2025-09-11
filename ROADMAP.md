# Project Roadmap

This document outlines the future development, deployment, and operational plans for this project.

## Phase 1: Foundational Setup (Complete)

- [x] Codebase organization
- [x] Docker containerization (`Dockerfile`, `docker-compose.yml`)
- [x] CI/CD pipeline for building and pushing Docker images to ECR (`.github/workflows/main.yml`)
- [x] Initial documentation

## Phase 2: Testing and Quality Assurance

- **Unit & Integration Testing:**
  - Implement a testing framework (e.g., Vitest, Jest, React Testing Library).
  - Write unit tests for critical components and utility functions.
  - Add integration tests for user flows (e.g., navigation, form submissions).
- **CI Enhancements:**
  - Add a `test` stage to the GitHub Actions workflow to run all tests before the build and push steps. A failed test run should fail the workflow.
- **End-to-End (E2E) Testing:**
  - Introduce an E2E testing framework like Playwright or Cypress to test the application in a real browser.

## Phase 3: Staging and Production Deployment

- **Infrastructure as Code (IaC):**
  - Use Terraform or AWS CDK to define and manage the cloud infrastructure (VPC, ECS/Fargate cluster, Load Balancer, ECR).
- **Staging Environment:**
  - Create a staging environment that mirrors production.
  - Deploy the `latest` Docker image from ECR to the staging environment automatically on every merge to `main`.
- **Production Deployment Strategy:**
  - Implement a manual approval step in the GitHub Actions workflow for production deployments.
  - Use a Git-tagging strategy (e.g., `v1.0.0`) to trigger production deployments. The workflow will deploy the corresponding versioned Docker image from ECR.
- **Cloud Service:**
  - **Option A (Serverless):** Deploy the container to **AWS Fargate**. This is a cost-effective and low-maintenance option for running containers without managing servers.
  - **Option B (Orchestration):** Deploy to an **Amazon EKS (Kubernetes)** cluster for more complex, large-scale applications requiring advanced orchestration.

## Phase 4: Monitoring, Logging, and Scaling

- **Logging:**
  - Configure the application and infrastructure to send logs to **Amazon CloudWatch Logs**.
- **Monitoring & Alerting:**
  - Set up **Amazon CloudWatch Dashboards** to monitor key metrics (CPU/Memory utilization, request counts, error rates).
  - Create CloudWatch Alarms to notify the team of any issues (e.g., high error rates, service downtime).
- **Scaling:**
  - Configure **Auto Scaling** for the ECS/Fargate service to automatically adjust the number of running containers based on traffic and resource utilization.
- **Content Delivery Network (CDN):**
  - Use **Amazon CloudFront** in front of the application's Load Balancer to cache static assets and serve content faster to users globally.

## API Key Management

### AWS Cognito Setup

To enable user authentication with AWS Cognito, you will need to configure the following API keys and settings in the `.env` file.

1.  **Create an `.env` file:**
    If you don't already have one, create a new file named `.env` in the root of the project. You can do this by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  **Configure Cognito Variables:**
    Open the `.env` file and add the following variables with the values from your AWS Cognito User Pool and Identity Pool.

    ```env
    # AWS Cognito User Pool ID
    VITE_USER_POOL_ID=your_user_pool_id

    # AWS Cognito User Pool Client ID
    VITE_USER_POOL_CLIENT_ID=your_user_pool_web_client_id

    # AWS Region where your Cognito resources are deployed
    VITE_AWS_REGION=your_aws_region
    ```

3.  **How to find these values:**
    *   **`VITE_USER_POOL_ID`** and **`VITE_USER_POOL_CLIENT_ID`**:
        *   Go to the AWS Cognito console and select your User Pool.
        *   The **Pool ID** is displayed at the top of the page.
        *   In the left-hand navigation, go to **App integration** > **App client and analytics**. Your **Client ID** will be listed there.
    *   **`VITE_AWS_REGION`**: This is the AWS region where you created your Cognito resources (e.g., `us-east-1`, `eu-west-2`).

4.  **Restart the application:**
    After updating the `.env` file, restart your development server for the changes to take effect.

### AI API Setup

The application uses an AI-powered chatbot. To enable this feature, you need to provide an API key for the AI service.

1.  **Get an API Key:**
    Obtain an API key from the AI service provider you are using (e.g., OpenAI, Google AI).

2.  **Configure the AI API Key:**
    Open the `.env` file and add the following variable with your API key:

    ```env
    # AI Service API Key
    VITE_AI_API_KEY=your_ai_api_key
    ```

3.  **Restart the application:**
    After updating the `.env` file, restart your development server for the changes to take effect.
