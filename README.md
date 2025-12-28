# Interview Coach - Frontend Application

An AI-powered technical interview preparation platform built with React, TypeScript, and Vite.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Tech Stack

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- React Router 7.11.0
- Styled Components 6.1.19

## Getting Started

### Installation

1. Clone the repository and navigate to the app directory:
```bash
cd apps/app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Routes

- `/` - Redirects to `/home`
- `/home` - Home page
- `/interview-coach` - Interview configuration page
- `/login` - User login page
- `/register` - User registration page

## Development Notes

- API directory (`apps/api`) is currently empty

## TODO

- [ ] Integrate backend API for authentication
- [ ] Implement interview session management
- [ ] Add AI-powered interview question generation
- [ ] Implement real-time feedback system
- [ ] Add progress tracking and analytics
- [ ] Connect to backend API for interview coach functionality
- [ ] Add user profile management
- [ ] Implement session history and review
- [ ] Document path aliases configuration (`@components`, `@services`)
