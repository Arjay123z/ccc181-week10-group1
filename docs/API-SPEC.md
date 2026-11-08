# CampusConnect API Specification

Base URL: `http://localhost:3000/api/v1`

All requests and responses use JSON.

## 1. Implemented endpoints

### GET /health

Checks that the server is running.

**Response 200**
```json
{ "status": "ok" }
```

### POST /sessions

Logs in and returns a token.

**Request body**
```json
{
  "email": "student@campusconnect.test",
  "password": "Campus26"
}
```

**Response 200**
```json
{
  "token": "<JWT>",
  "user": {
    "id": 1,
    "name": "Demo Student",
    "email": "student@campusconnect.test"
  }
}
```

**Response 400** (email or password missing or invalid format)
```json
{ "error": "Email and password are required." }
```

**Response 401** (wrong password or unknown email)
```json
{ "error": "Invalid email or password." }
```

### GET /users/me

Returns the logged-in user. Requires the header `Authorization: Bearer <token>`.

**Response 200**
```json
{
  "id": 1,
  "name": "Demo Student",
  "email": "student@campusconnect.test"
}
```

**Response 401** (missing, wrong or expired token)
```json
{ "error": "Not logged in." }
```

## 2. Error responses for every route

| Status | When | Body |
|---|---|---|
| 404 | No route matches | `{ "error": "Not found." }` |
| 500 | Unexpected server error | `{ "error": "Something went wrong." }` |

The password and password hash are never returned.

## 3. Events (design only)

This section is a design for Week 12. It is **not built yet**.

Conventions: no verbs in the address, plural nouns, the HTTP method says the action, and each response uses the correct status code.

| Action | Method and address | Success | Errors |
|---|---|---|---|
| List events | `GET /events` | 200 | 401 |
| Get one event | `GET /events/{id}` | 200 | 401, 404 |
| Add an event | `POST /events` | 201 | 400, 401 |
| Update part of an event | `PATCH /events/{id}` | 200 | 400, 401, 404 |
| Delete an event | `DELETE /events/{id}` | 204 (no body) | 401, 404 |
| Filter by month | `GET /events?month=11` | 200 | 400, 401 |

### Example: add an event

`POST /events`

```json
{
  "title": "Welcome Night",
  "date": "2026-11-20",
  "location": "Main Hall"
}
```

**Response 201**
```json
{
  "id": 12,
  "title": "Welcome Night",
  "date": "2026-11-20",
  "location": "Main Hall"
}
```

### Example: update part of an event

`PATCH /events/12`

```json
{ "location": "Room 204" }
```

**Response 200**
```json
{
  "id": 12,
  "title": "Welcome Night",
  "date": "2026-11-20",
  "location": "Room 204"
}
```

### Example: filter by month

`GET /events?month=11` returns only the events in November.

**Response 200**
```json
[
  {
    "id": 12,
    "title": "Welcome Night",
    "date": "2026-11-20",
    "location": "Room 204"
  }
]
```

An invalid month such as `?month=13` returns `400` with `{ "error": "Invalid month." }`.