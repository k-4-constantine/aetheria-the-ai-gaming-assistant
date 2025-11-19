# Aetheria: The AI Gaming Assistant

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/k-4-constantine/aetheria-the-ai-gaming-assistant)

Aetheria is an AI-powered gaming assistant designed as a visually stunning, illustrative web application. It serves as a personal coach for gamers, providing tips, strategies, and analysis through an intuitive chat interface. The application leverages a powerful AI backend running on Cloudflare's serverless infrastructure to deliver real-time, helpful responses. The core of the application is a single-page chat view, where users can create multiple conversation sessions for different games or topics.

The UI is crafted with an 'Illustrative' artistic style, featuring custom sketchy graphics, playful animations, and a unique, engaging font for headings to create a human-centered and whimsical experience.

## Key Features

-   **AI-Powered Coaching**: Get personalized gaming tips, strategies, and analysis.
-   **Illustrative UI**: A beautiful, dark-themed interface with a unique, hand-drawn aesthetic.
-   **Real-time Chat**: Fluid, streaming responses from the AI for a seamless conversation.
-   **Session Management**: Create, switch between, and delete multiple chat sessions for different games or topics.
-   **Responsive Design**: A flawless experience across desktop, tablet, and mobile devices.
-   **Serverless Architecture**: Built on Cloudflare Workers and Durable Objects for scalability and performance.

## Technology Stack

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **UI Components**: shadcn/ui, Framer Motion, Lucide React
-   **State Management**: Zustand
-   **Backend**: Hono on Cloudflare Workers
-   **Persistence**: Cloudflare Agents (Durable Objects)
-   **AI Integration**: OpenAI SDK via Cloudflare AI Gateway

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/)
-   [Git](https://git-scm.com/)
-   A Cloudflare account

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd aetheria-gaming-assistant
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Set up environment variables:**

    Log in to Cloudflare and create an AI Gateway. You will need the Gateway URL and an API key.

    Create a `.dev.vars` file in the root of the project and add your Cloudflare AI Gateway credentials. This file is used by Wrangler for local development.

    ```ini
    # .dev.vars

    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    Replace the placeholder values with your actual credentials.

## Development

To run the application locally, which starts both the Vite frontend server and the Cloudflare Worker for the backend, use the following command:

```sh
bun dev
```

The application will be available at `http://localhost:3000`.

## Deployment

This project is configured for easy deployment to the Cloudflare network. The command will deploy the frontend application to Cloudflare Pages and the backend API to Cloudflare Workers.

1.  **Log in to Wrangler:**
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    ```sh
    bun run deploy
    ```

After deployment, you will get a URL for your live application. You will also need to configure your production environment variables in the Cloudflare dashboard.

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/k-4-constantine/aetheria-the-ai-gaming-assistant)

## Project Structure

-   `src/`: Contains all the frontend React application code, including pages, components, hooks, and utility functions.
-   `worker/`: Contains all the backend Cloudflare Worker code, including the Hono router, the ChatAgent Durable Object, and API logic.
-   `wrangler.jsonc`: Configuration file for the Cloudflare Worker and Pages deployment.
-   `tailwind.config.js`: Configuration for Tailwind CSS.
-   `vite.config.ts`: Configuration for the Vite development server.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.