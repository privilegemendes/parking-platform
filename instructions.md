# Frontend Coding Challenge - ParkingBusiness

Hi there! In this coding challenge, you will build the frontend for an existing backend application.

## Context
The application belongs to ParkingBusiness, a company that operates parking garages. This is a pilot project for one of the buildings owned by ParkingBusiness. If this project is successful, they will likely want to extend the software to manage all of their parking buildings.

The building setup is as follows:
- **Floor 1**: Parking spaces 1 – 75
- **Floor 2**: Parking spaces 76 – 150

Each parking space has specific requirements:
- **Space 1 – 50**: Used for residents (no charge)
- **Space 51 – 130**: Cars, €5.00 per hour
- **Space 131 – 150**: Motorcycles, €3.00 per hour

## Backend
A backend implementation is available and deployed; you can consume it from the client.

**Credentials**:
- **Username**: `super@parkdemeer.nl`
- **Password**: `SUPER_USER_SECRET_PASS`

A successful login returns an `accessToken`, which can be used to make authenticated requests. Send this token in an authorization header as `Bearer {accessToken}`.

To avoid CORS issues, host your project on `localhost:8000`, as this is whitelisted.

Backend documentation: [https://parkdemeer-afde952e3fef.herokuapp.com/api/docs#/Authentication/AuthController_me](https://parkdemeer-afde952e3fef.herokuapp.com/api/docs#/Authentication/AuthController_me)

---

## Stories to Implement

### PBF-01: Overall Project Setup
1. Set up your project in a Git hosting service.
2. Implement the frontend as a JavaScript Single Page Application using any framework/library.
3. Include a README with installation and run instructions.
4. Avoid CSS frameworks (e.g., Bootstrap) to demonstrate direct CSS usage.

### PBF-02: Login/Logout
1. On app start, call the auth endpoint for the current user; if logged in, redirect to the dashboard, else redirect to login.
2. Allow login and logout using email and password.
3. Enable logout from the dashboard.

### PBF-03: Dashboard
1. Display an overview of the building by consuming backend data.
2. Show three areas: residents, non-resident cars, and non-resident motorcycles.
3. Display occupancy as a number (digital indicator) and a graphic proportion (analog indicator).
4. Add any other useful information for the parking operator.

### PBF-04: Sessions
1. Display a table of parking sessions, consuming backend data.
2. Allow filtering by session type (resident, non-resident car, non-resident motorbike), start/end date, and session status (active/inactive).
3. Provide a button to manually end a parking session if needed.

### PBF-05: Extra Credit
1. Add revenue metrics for individual sessions or time periods.
2. Include any other features that would benefit the parking operator.
3. Deploy the frontend to an accessible URL. Share the URL to whitelist it for CORS.

---

## Deliverables
- Access to a repository (or .zip file) containing the code.
- A README with instructions to run the code locally.

Good luck, and feel free to reach out if you have questions!