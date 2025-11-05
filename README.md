# MessConnect: Student Mess Management Platform

MessConnect is a comprehensive, visually stunning, and highly intuitive platform for managing student mess facilities, built on Cloudflare's serverless infrastructure. It provides a seamless experience for students, managers, and administrators through role-based dashboards. Key features include a streamlined student admission and subscription workflow, automated monthly billing, secure one-time guest payments, an AI-powered complaint resolution system, real-time notifications, and detailed analytics. The system is designed for security, scalability, and operational excellence, ensuring all interactions are idempotent and fully audited.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/savagetongue/messconnect-student-mess-management-platform)

## ✨ Key Features

-   **Role-Based Dashboards**: Separate, tailored interfaces for Managers, Students, and SuperAdmins.
-   **Admission & Subscription Management**: Streamlined workflow for student join requests, approvals, and monthly subscriptions.
-   **Automated Billing**: Recurring monthly invoice generation and payment processing.
-   **Guest Payments**: Simple, one-time payment portal for non-registered guests.
-   **AI-Powered Complaint System**: Intelligent triage and management of student complaints.
-   **Real-time Notifications**: Broadcast urgent announcements to students via multiple channels.
-   **Comprehensive Auditing**: Full audit trails for all critical actions within the system.
-   **Analytics & Reporting**: Detailed reports on revenue, capacity, and guest activity.
-   **Built on Cloudflare**: Leverages Workers, KV, R2, and Durable Objects for a scalable, secure, and performant serverless backend.

## 🚀 Technology Stack

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
-   **State Management**: Zustand
-   **Backend**: Cloudflare Workers, Hono
-   **Storage**: Cloudflare KV, R2, Durable Objects
-   **AI**: Cloudflare Agents SDK
-   **Styling & Animation**: Framer Motion, Lucide Icons
-   **Forms & Validation**: React Hook Form, Zod

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated: `bunx wrangler login`.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd messconnect
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Configure environment variables:**

    Create a `.dev.vars` file in the root of the project for local development. You can copy the structure from `wrangler.jsonc`.

    ```ini
    # .dev.vars

    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    Replace the placeholder values with your actual Cloudflare AI Gateway details.

4.  **Run the development server:**

    This command starts the Vite frontend and the Wrangler dev server for the backend worker simultaneously.
    ```bash
    bun dev
    ```

    The application should now be running on `http://localhost:3000`.

## 💻 Development

The project is structured with a monorepo-like approach:
-   `src/`: Contains the React frontend application.
-   `worker/`: Contains the Cloudflare Worker backend code.

The `bun dev` command will automatically watch for changes in both directories and reload the application as you work.

## ☁️ Deployment

Deploying the application to Cloudflare is a straightforward process.

1.  **Build the project:**
    ```bash
    bun build
    ```

2.  **Deploy to Cloudflare:**
    ```bash
    bun deploy
    ```
    This command will build the frontend, bundle the worker, and deploy everything to your Cloudflare account.

3.  **Configure Production Secrets:**

    For the deployed application, you must set the required secrets in your Cloudflare dashboard or via the Wrangler CLI. Never commit secrets to your repository.

    ```bash
    bunx wrangler secret put CF_AI_API_KEY
    ```

    You will be prompted to enter the secret value. The `CF_AI_BASE_URL` can be set as a regular environment variable in the Worker's settings in the Cloudflare dashboard.

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/savagetongue/messconnect-student-mess-management-platform)

## 📂 Project Structure

```
.
├── src/                # Frontend React application
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and client-side services
│   └── pages/          # Page components
├── worker/             # Backend Cloudflare Worker code
│   ├── agent.ts        # Core ChatAgent Durable Object
│   ├── app-controller.ts # Session management Durable Object
│   ├── index.ts        # Worker entry point
│   └── userRoutes.ts   # Hono API routes
├── package.json        # Project dependencies and scripts
└── wrangler.jsonc      # Cloudflare Worker configuration
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.