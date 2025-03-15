# API Documentation

## POST /api/users/register

**Description:**  
Endpoint to register a new user.

**Required Data:**

- `fullName.firstName`: string, minimum 3 characters.
- `fullName.lastName`: string, minimum 3 characters.
- `email`: string, valid email format.
- `password`: string, minimum 6 characters.

**Possible Status Codes:**

- **201 Created:** Successful registration.
- **400 Bad Request:** Validation error with details.
- **409 Conflict:** Email already exists.
- **500 Internal Server Error:** Server-side error.

**Example Response (201 Created):**

```json
{
  "userId": "5f8f8c44b54764421b7156c3",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "createdAt": "2023-05-15T13:45:30.000Z"
}
```

**Example Error Response (400 Bad Request):**

```json
{
  "error": "Validation Error",
  "details": {
    "email": "Email is invalid"
  }
}
```

**Example Error Response (409 Conflict - Email Exists):**

```json
{
  "error": "Conflict",
  "message": "Email already exists"
}
```

**Example Server Error Response (500 Internal Server Error):**

```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong on the server"
}
```

## POST /api/users/login

**Description:**  
Endpoint to log in a user.

**Required Data:**

- `email`: string, valid email format.
- `password`: string, minimum 6 characters.

**Possible Status Codes:**

- **200 OK:** Successful login.
- **400 Bad Request:** Validation error with details.
- **404 Not Found:** User not found.
- **500 Internal Server Error:** Server-side error.

**Example Response (200 OK):**

```json
{
  "userId": "5f8f8c44b54764421b7156c3",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "token": "generated_jwt_token"
}
```

**Example Error Response (400 Bad Request):**

```json
{
  "error": "Invalid credentials",
  "message": "Email or password is incorrect"
}
```

**Example Error Response (404 Not Found - User Not Found):**

```json
{
  "error": "Not Found",
  "message": "User not found"
}
```

**Example Server Error Response (500 Internal Server Error):**

```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong on the server"
}
```

## GET /api/users/profile

**Description:**  
Endpoint to retrieve the authenticated user's profile.

**Authentication:**  
Requires a valid token via headers (Authorization: Bearer token) or cookies.

**Possible Status Codes:**
- **200 OK:** Returns the user profile.
- **401 Unauthorized:** Token is missing or invalid.
- **500 Internal Server Error:** Server-side error.

**Example Response (200 OK):**
```json
{
  "user": {
    "userId": "5f8f8c44b54764421b7156c3",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Example Error Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized access"
}
```

**Example Server Error Response (500 Internal Server Error):**
```json
{
  "error": "Internal Server Error",
  "message": "Error in getting user profile"
}
```

## POST /api/users/logout

**Description:**  
Endpoint to log out an authenticated user. This clears the token and adds it to a blacklist so it can no longer be used.

**Authentication:**  
Requires a valid token via headers (Authorization: Bearer token) or cookies.

**Possible Status Codes:**
- **200 OK:** Successful logout.
- **401 Unauthorized:** Token is missing or invalid.
- **500 Internal Server Error:** Server-side error.

**Example Response (200 OK):**
```json
{
  "message": "User logged out successfully"
}
```

**Example Error Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized access"
}
```

**Example Server Error Response (500 Internal Server Error):**
```json
{
  "error": "Internal Server Error",
  "message": "Error in logging out the user"
}
```

<!-- ...additional documentation if needed... -->
