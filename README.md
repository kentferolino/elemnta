# Elemnta Frontend

A modern React application built with Vite, TypeScript, and RTK Query.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn
```

2. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```bash
VITE_API_AUTH_URL=https://x8ki-letl-twmt.n7.xano.io/api:61-6TeiM
VITE_API_PERSON_URL=https://x8ki-letl-twmt.n7.xano.io/api:GvRarFv6
```

Adjust the URLs according to your backend configuration.

3. Login
   email: tester1@tester1.com
   password: Password.1

## Available Scripts

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Testing

Run the test suite:

```bash
npm run test
# or
yarn test
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── store/         # Redux store configuration
│   ├── services/  # RTK Query services
│   └── slices/    # Redux slices
├── styles/        # Global styles
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```
