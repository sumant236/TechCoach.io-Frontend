# TechCoach.io - AI-Powered Mock Interview Platform (Frontend)

A modern, highly responsive single-page application built with **React** and **Tailwind CSS** for **TechCoach.io**. It provides developers with an immersive, interactive platform to practice technical interviews tailored to specific job roles, tech stacks, and experience levels, powered by real-time AI evaluation.

> **🔗 Frontend:** You can reach for the backend at: https://github.com/sumant236/TechCoach.io-Backend.git

## 🚀 Key Features & Capabilities

* **Dynamic Mock Interview Generation:** Configure and spin up customized interview sessions by specifying your target Job Role, Tech Stack (e.g., React, Spring Boot), and Experience Level.
* **Interactive Question & Answer Workflow:** Seamless multi-question navigation allowing users to type responses, review previous answers, and manage their session state effortlessly.
* **Instant AI Evaluation & Feedback:** Submit answers on the fly to receive immediate qualitative feedback and precise numerical scores (0-10 scale) with color-coded performance indicators.
* **Session Persistence & Recovery:** Automatically restores ongoing active interviews from local storage and backend state, preventing data loss on accidental page refreshes.
* **Comprehensive Performance History Dashboard:** Track past mock interview attempts through a clean, tabular history view displaying dates, roles, tech stacks, and calculated average scores.
* **Seamless Authentication Integration:** Secure login, registration, and Google OAuth2 handling backed by HttpOnly cookies and protected route guards.
* **Mobile-First Responsive Design:** Fluid typography and adaptive layouts optimized for flawless usability across mobile phones, tablets, and desktop displays.

## 🛠️ Tech Stack
* **Frontend Library:** React 18+ (Vite)
* **Styling & UI:** Tailwind CSS (Utility-first, responsive design)
* **Routing:** React Router v6 (Guest, Public, and Protected routes)
* **HTTP Client:** Axios (Configured with credentials support for cross-origin communication)

## Project Directory Structure
```text
src/
├── api/
│   └── axios.js          # Centralized Axios instance configuration
├── assets/               # Static images, logos, and icons
├── components/           # Reusable UI components (QuestionCard, InterviewForm, etc.)
├── context/              # Global state providers (AuthContext)
├── pages/                # Page-level views (Login, Register, Dashboard)
├── App.jsx               # Root component with routing configuration
└── main.jsx              # Application entry point

```

## Environment Setup

Create a `.env` file in the root directory of the frontend repository:

```env
VITE_API_BASE_URL=[https://techcoach-io-backend.onrender.com](https://techcoach-io-backend.onrender.com)

```

## Getting Started

1. Clone the repository:
```bash
git clone [https://github.com/sumant236/TechCoach.io-Frontend.git](https://github.com/sumant236/TechCoach.io-Frontend.git)

```


2. Navigate into the directory:
```bash
cd TechCoach.io-Frontend

```


3. Install dependencies:
```bash
npm install

```


4. Run the development server:
```bash
npm run dev

```
