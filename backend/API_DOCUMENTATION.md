# HealthPulse API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## Authentication
- **JWT Bearer Token** required for all protected endpoints.
- Register and login to obtain a token.

---

## Endpoints

### Auth
| Method | Endpoint              | Description                | Auth Required | Request Body / Params         | Response Example |
|--------|-----------------------|----------------------------|---------------|-------------------------------|------------------|
| POST   | `/auth/register`      | Register a new user        | No            | `{ name, email, password, region }` | `{ token, user }` |
| POST   | `/auth/login`         | Login user                 | No            | `{ email, password }`         | `{ token, user }` |
| GET    | `/auth/profile`       | Get user profile           | Yes           | -                             | `{ user }`       |

---

### Symptoms
| Method | Endpoint              | Description                | Auth Required | Request Body / Params         | Response Example |
|--------|-----------------------|----------------------------|---------------|-------------------------------|------------------|
| POST   | `/symptoms`           | Log a new symptom and get health tips | Yes | `{ symptom }` | `{ symptom, tips }` |
| GET    | `/symptoms`           | Get all symptoms for user  | Yes           | -                             | `{ symptoms: [...] }` |
| GET    | `/symptoms/history`   | Get symptom history (optionally by date range) | Yes | `?from=YYYY-MM-DD&to=YYYY-MM-DD` | `{ symptoms: [...] }` |

---

### Health Tips
| Method | Endpoint              | Description                | Auth Required | Request Body / Params         | Response Example |
|--------|-----------------------|----------------------------|---------------|-------------------------------|------------------|
| GET    | `/tips`               | Get general health tips    | No            | -                             | `{ tips: [...] }` |

---

### Clinics
| Method | Endpoint              | Description                | Auth Required | Request Body / Params         | Response Example |
|--------|-----------------------|----------------------------|---------------|-------------------------------|------------------|
| GET    | `/clinics`            | Search clinics by region, city, or name | No | `?region=...&city=...&name=...` | `{ clinics: [...] }` |
| GET    | `/clinics`            | Search clinics by coordinates (uses OSM, may be rate-limited) | No | `?lat=...&lon=...` | `{ clinics: [...] }` |

---

### Emergency Contacts
| Method | Endpoint              | Description                | Auth Required | Request Body / Params         | Response Example |
|--------|-----------------------|----------------------------|---------------|-------------------------------|------------------|
| GET    | `/emergency`          | Get emergency contacts by region or user | Optional      | `?region=...`                 | `{ contacts: [...] }` |
| POST   | `/emergency`          | Add/update user emergency contact | Yes | `{ name, number, type, region }` | `{ contact }`    |

---

### Health Check
| Method | Endpoint              | Description                | Auth Required | Request Body / Params         | Response Example |
|--------|-----------------------|----------------------------|---------------|-------------------------------|------------------|
| GET    | `/health`             | API health check           | No            | -                             | `{ status: "ok" }` |

---

## Request/Response Schemas

### User
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "region": "string"
}
```

### Symptom
```json
{
  "id": "string",
  "userId": "string",
  "symptom": "string",
  "timestamp": "date-time"
}
```

### Clinic
```json
{
  "name": "string",
  "address": "string",
  "region": "string",
  "coordinates": { "lat": "number", "lon": "number" }
}
```

### EmergencyContact
```json
{
  "name": "string",
  "number": "string",
  "type": "string",
  "region": "string"
}
```

### HealthTip
```json
{
  "title": "string",
  "body": "string"
}
```

---

## Special Features

- **Symptom Logging with Tips:**  
  When you log a symptom, you get health tips relevant to that symptom in the response.

- **Flexible Clinic Search:**  
  Search clinics by region, city, or partial name using query parameters.

- **Customizable Emergency Contacts:**  
  Get default contacts by region or add your own.

---

## Authentication
- Use the JWT token from `/auth/login` or `/auth/register` in the `Authorization` header:
  ```
  Authorization: Bearer <token>
  ```

---

## Error Responses
All errors return:
```json
{
  "error": "Error message"
}
```

---

## Swagger UI
- Interactive API docs available at:  
  `http://localhost:5000/api-docs`

---

## Example Usage

**Register:**
```json
POST /api/auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "region": "Lagos"
}
```

**Log Symptom:**
```json
POST /api/symptoms
{
  "symptom": "malaria"
}
```
_Response:_
```json
{
  "symptom": { ... },
  "tips": [
    { "title": "Prevent Malaria", "body": "..." }
  ]
}
```

---

If you want this in another format (Swagger/OpenAPI, PDF, etc.), let me know! 