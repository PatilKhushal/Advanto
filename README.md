
# Project Setup

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v16.x or higher recommended)
- **npm** (comes with Node.js)
- **Git** (for version control)

## Folder Structure

```
.
├── backend/      # Backend code (Node.js, Express, etc.)
├── frontend/     # Frontend code (React, Vite, etc.)
```

## Installation Instructions

### 1. Clone the repository

```bash
git clone <https://github.com/PatilKhushal/Advanto.git>
cd <Advanto>
```

### 2. Install Dependencies

Run the following commands to install the dependencies for both the backend and frontend:

```bash
npm run installBackend
npm run installFrontend
```

This will:

- Navigate to the `backend` folder and install the backend dependencies.
- Navigate to the `frontend` folder and install the frontend dependencies.

## Running the Project

### 1. Start Backend Server

To start the backend server:

```bash
npm run start
```

This will:

- Change the directory to the `backend` folder and start the backend server using `npm start`.

### 2. Run Frontend (Development Mode)

To run the frontend in development mode:

```bash
npm run dev
```

This will:

- Change the directory to the `frontend` folder and run the frontend development server using `npm run dev`.

## Notes

- Ensure that the backend and frontend are set up correctly before running the project.
- You can customize the scripts inside `package.json` if needed.
