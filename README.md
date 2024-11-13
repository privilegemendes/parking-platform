# Hartje Parking Platform

## Table of Contents

- [Tech Stack](#tech-stack)
- [Approach](#approach)
- [Features](#features)
- [Codebase Structure](#codebase-structure)
- [Codebase Optimization](#codebase-optimization)
- [Possible Frontend Improvements](#possible-frontend-improvements)
- [Backend API Improvements](#backend-api-improvements)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)


## Tech Stack
- React + Vite
- Tailwind CSS
- Shadcn component based library
- Radix Primitives for accessibility
- TanStack Query for data fetching
- TanStack Router for routing and protected routes
- TanStack Table for displaying parking sessions
- Zod for type checking and validation

## Approach
- The table implemented was done using TanStack Table for displaying parking sessions. The table is virtualized for improved performance for large amounts of data, however pagination is available for small to medium-sized data.
- TanStack Router handles routing and protected routes for the application. The accessToken is stored in the local storage and is used to authenticate the user. We use the AuthProvider to monitor the expiration of the token and redirect the user to the login page if the token is expired.

## Features
- [x] Authentication with protected routes
- [x] Table of parking sessions
- [x] Filter parking sessions by license plate, vehicle type, and parking status
- [x] Sort parking sessions by parking start time, parking end time, and parking status
- [x] Pagination for parking sessions (disabled for now)
- [x] Table virtualization for improved performance
- [x] Dashboard with available parking spaces
- [x] Bar chart to visualize parking occupancy over the past year 
- [x] Total revenue generated from parking sessions

## Codebase Structure
The codebase is structured as follows:
- `src/components`: Contains the tree component and its subcomponents
- `src/hooks`: Contains custom hooks for managing tree state and search functionality
- `src/utils`: Contains utility functions for tree traversal and search
- `src/data`: Contains the mock data for the tree
- `src/styles`: Contains global styles and CSS variables (Tailwind CSS)
- `src/App.tsx`: Main application component

## Codebase Optimization
- The codebase used Eslint and prettier for code formatting and linting.

## Possible Frontend Improvements
- Improve the dashboard for improved mobile friendliness. This will help the parking operators to manage the parking spaces on the go.

# Backend API Improvements
- The occupancy value should be non-negative integer.
- Provide the error codes and messages for the API responses.

# External Link
The live demo can be found [here](https://parking-platform.vercel.app/).

## Setup and Installation

1. **Clone the repository:**

```sh
git clone https://github.com/privilegemendes/parking-platform.git
cd parking-platform
npm install
```


## Running the Application

To run the application in development mode:
```sh
npm dev
```

Open http://localhost:8000/ to view it in the browser. The page will reload if you make edits.
