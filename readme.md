# To-Do List API

A simple API for managing a to-do list. Users can create, read, update, and delete to-do items. The API includes user authentication, data validation, pagination, and filtering and sorting of to-do items.

## Features

- **CRUD Operations**: Create, Read, Update, Delete to-do items.
- **User Authentication**: Register and login users using JWT.
- **Data Validation**: Ensure all to-do items have valid data before saving.
- **Pagination**: Handle large lists by implementing pagination.
- **Filtering and Sorting**: Allow users to filter and sort their to-do items.

## Prerequisites

- Node.js
- npm
- MongoDB

## Getting Started

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Fouadalkallas/To-Do-List-API.git
    cd To-Do-List-API
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```sh
    npm start
    ```

### API Endpoints

#### Authentication

- **Register User**
    ```http
    POST /api/auth/register
    ```
    - Body: `{ "username": "string", "password": "string" }`

- **Login User**
    ```http
    POST /api/auth/login
    ```
    - Body: `{ "username": "string", "password": "string" }`

#### To-Do Items

- **Create To-Do**
    ```http
    POST /api/todos
    ```
    - Headers: `Authorization: Bearer your_jwt_token`
    - Body: `{ "title": "string", "description": "string" }`

- **Get All To-Dos**
    ```http
    GET /api/todos
    ```
    - Headers: `Authorization: Bearer your_jwt_token`
    - Query Params: `page`, `limit`, `sort`, `order`, `search`

- **Get Single To-Do**
    ```http
    GET /api/todos/:id
    ```
    - Headers: `Authorization: Bearer your_jwt_token`

- **Update To-Do**
    ```http
    PUT /api/todos/:id
    ```
    - Headers: `Authorization: Bearer your_jwt_token`
    - Body: `{ "title": "string", "description": "string" }`

- **Delete To-Do**
    ```http
    DELETE /api/todos/:id
    ```
    - Headers: `Authorization: Bearer your_jwt_token`

### Example Requests

#### Register User
```sh
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
