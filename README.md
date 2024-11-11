# Hartje Parking Platform

## Tech Stack
- React + Vite
- Tailwind CSS
- Shadcn component based library
- Radix Primitives for accessible components
- TanStack Query for data fetching
- TanStack Router for routing and protected routes
- TanStack Table for displaying parking sessions
- Zod for type checking and validation


## Installation
1. Clone the repository
2. Install the dependencies
``` npm install ```
3. Run the development server
``` npm run dev ```

## Approach
- Since each vehicle has a unique license plate, I used the license plate as the primary key for the vehicle.

# Backend API Improvements
- The occupancy value should be non-negative integer.
- Provide the error codes and messages for the API responses.
- Parking spaces description does not correlate with the actual data