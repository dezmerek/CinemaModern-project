# CinemaModern

A comprehensive web application for cinema management, enabling repertoire handling, online ticket sales, a loyalty program, and an administrative panel.

![Strona Główna](https://github.com/user-attachments/assets/c1eac108-a67c-4eea-a438-8dcb74e810ce)

---

## Technologies

- **Frontend:** React.js (React Router, Google OAuth, SASS, React Icons, React Player, React QR Code, React Select, Redux)
- **Backend:** Node.js (Express.js, REST API, Multer, JWT, bcrypt, Tpay, Mongoose)
- **Database:** MongoDB
- **Other:** Integrations with Google, Tpay, file uploads, CORS

---

## Features

### User

- Browse repertoire, movie details, and halls
- Buy tickets online (integration with Tpay)
- Loyalty program, generate and use vouchers
- Login with Google or own system
- Transaction history and purchased tickets
- Movie ratings and reviews

### Administrator

- Manage movies (add, edit, banners)
- Manage halls and their layout
- Manage showtimes
- Manage users and roles
- Manage vouchers
- Sales and activity reports

---

## Project Structure

```
CinemaModern-project/
├── backend/
│   ├── src/
│   │   ├── models/        # Mongoose models (User, Movie, Reservation, Hall, Schedule, Rating, Review, Voucher)
│   │   ├── routes/        # API routes (movies, users, halls, schedules, payments, reservations, vouchers, tickets)
│   │   └── server.js      # Main entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components (dashboard, home, common)
│   │   ├── routers/       # Views and routing (e.g., movies, halls, payments, vouchers, ticket purchases)
│   │   ├── assets/        # Static assets
│   │   └── Styles/        # SASS/SCSS styles
│   └── package.json
└── README.md
```

---

## Requirements

- Node.js >= 18.x
- MongoDB (locally or Atlas)
- Tpay account (for online payments)
- Google OAuth account (for login)

---

## Installation & Running

### Backend

1. Go to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and fill in the required data:
   - `MONGODB_URI` – database address
   - `PORT` – backend port (e.g., 5000)
   - `CLIENT_ID` – Tpay client ID
   - `CLIENT_SECRET` – Tpay client secret
   - `URL_SUCCESS_NOTIFICATION` – Tpay notification URL (e.g., `http://localhost:5000`)
   - `JWT_SECRET` – JWT secret
4. Run the backend:
   ```bash
   npm start
   ```

### Frontend

1. Go to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and fill in the required data:
   - `REACT_APP_GOOGLE_CLIENT_ID` – Google client ID
   - `REACT_APP_BACKEND_URL` – backend URL (e.g., `http://localhost:5000`)
4. Run the frontend:
   ```bash
   npm start
   ```

---

## Environment Variables

### Backend

- `MONGODB_URI`
- `PORT`
- `CLIENT_ID` (Tpay)
- `CLIENT_SECRET` (Tpay)
- `URL_SUCCESS_NOTIFICATION` (Tpay)
- `JWT_SECRET`

### Frontend

- `REACT_APP_GOOGLE_CLIENT_ID`
- `REACT_APP_BACKEND_URL`

---

## Roles & Permissions

- **user** – regular user (buys tickets, uses loyalty program, rates movies)
- **admin** – full access to the administrative panel, managing movies, halls, schedules, vouchers, and users

**How to assign the admin role?**

- Change the user's `role` field in the database to `admin` (e.g., through MongoDB Compass or a script).

---

## API Endpoints

Example main endpoints:

### Movies

- `GET /api/movies` – list of movies
- `POST /api/movies` – add a movie _(admin)_
- `PUT /api/movies/:id` – edit a movie _(admin)_
- `DELETE /api/movies/:id` – delete a movie _(admin)_

### Reservations & Tickets

- `POST /api/reservations` – create a reservation
- `GET /api/reservations/:userId/transactions` – user's transaction history
- `GET /api/tickets` – list of all tickets _(admin)_

### Payments

- `POST /api/payments/create-session-transaction-tpay` – start a Tpay transaction
- `POST /api/payments/tpay-notifications` – Tpay notification webhook

### Users

- `POST /api/users/google-login` – login with Google
- `GET /api/users` – list of users _(admin)_

### Vouchers

- `POST /api/vouchers` – add a voucher _(admin)_
- `GET /api/vouchers` – list of vouchers

**More details can be found in the source code in the `backend/src/routes/` directory**

---

## Screenshots

### Movie details
![POLECANE_SZCZEGÓŁY](https://github.com/user-attachments/assets/4076445b-5476-4ad2-94f2-60fc8a58ac20)

### Choosing a place
![WYBOR_MIEJSCA_WYBIERZ](https://github.com/user-attachments/assets/b8f97c92-c1aa-4981-a510-996242afd4d9)

### Dashboard
![DASHBOARD](https://github.com/user-attachments/assets/746fd59d-af1b-49c0-afb5-2f0306455b90)

### Add a movie
![DODAJ FILM](https://github.com/user-attachments/assets/82cfc16c-30a9-4b7b-99c1-140a1a62de0a)

