# Event Management Backend

A RESTful backend API for an Event Management application built with **Node.js**, **Express.js**, and **MongoDB**. The application provides user management, timezone-aware event scheduling, and event audit logging.

---

## Features

### User Management
- Create users
- Retrieve all users
- Update user details

### Event Management
- Create events
- Update events
- Retrieve events by user
- Multi-user event support
- Timezone-aware scheduling

### Event Logging
- Automatically logs every successful event update
- Stores previous and updated values
- Maintains complete audit history

### Validation
- Validates IANA timezones
- Ensures selected users exist
- Prevents invalid event durations
- Handles errors with meaningful responses

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Day.js

---

## Project Structure

```text
src
│
├── config
│   └── database.js
│
├── controllers
│   ├── user.controller.js
│   ├── event.controller.js
│   └── event-log.controller.js
│
├── middleware
│   └── error.middleware.js
│
├── models
│   ├── user.model.js
│   ├── event.model.js
│   └── event-log.model.js
│
├── repositories
│   ├── user.repository.js
│   ├── event.repository.js
│   └── event-log.repository.js
│
├── routes
│   ├── user.route.js
│   ├── event.route.js
│   └── event-log.route.js
│
├── services
│   ├── user.service.js
│   ├── event.service.js
│   └── event-log.service.js
│
├── utils
│   ├── timezone.util.js
│   └── error.js
│
├── app.js
└── server.js
```

---

## Database Design

### Users

| Field | Type |
|------|------|
| _id | ObjectId |
| name | String |
| timezone | String |
| createdAt | Date |
| updatedAt | Date |

---

### Events

| Field | Type |
|------|------|
| _id | ObjectId |
| users | ObjectId[] |
| timezone | String |
| startTime | Date (UTC) |
| endTime | Date (UTC) |
| createdAt | Date |
| updatedAt | Date |

---

### Event Logs

| Field | Type |
|------|------|
| _id | ObjectId |
| event | ObjectId |
| changes | Array |
| createdAt | Date |
| updatedAt | Date |

---

## API Endpoints

### User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a user |
| GET | `/api/users` | Get all users |
| PATCH | `/api/users/:id` | Update a user |

---

### Event APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events` | Create an event |
| GET | `/api/events/user/:userId` | Get events for a user |
| PATCH | `/api/events/:eventId` | Update an event |

---

### Event Log APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/event-logs/:eventId` | Retrieve event logs |

---

## Timezone Handling

- Events are created using the selected timezone.
- Start and end times are converted to UTC before being stored.
- UTC timestamps are converted back to the selected timezone when displayed.
- Supports all IANA timezone identifiers.

Example timezones:

- UTC
- Asia/Kolkata
- America/New_York
- Europe/London


---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Navigate to the project

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Run in development

```bash
npm run dev
```

### Run in production

```bash
npm start
```

---

## Author

**Manu Krishna**