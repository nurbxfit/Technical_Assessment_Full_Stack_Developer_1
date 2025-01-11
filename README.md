# About

This is the implementation of Arkmind Interview Task : Full stack Application Development role.
This implementation has the followings features

Refer the [instruction](./INSTRUCTION.md)

## Backend

1. Using mySQL as database
2. Using prisma as ORM
3. Using Winston as Logger
4. Using Zod as Validator
5. Have custom input validator middleware
6. Have custom error handler middleware

## Frontend

1. State management with redux and redux toolkit
2. UI styling with tailwindcss
3. API integration with axios
4. Form input validation with debounce

# Setup instructions

## Prerequisites

- install the followings
  - [Node.js]() (v16 or higher)
  - [Bun]()
  - [Docker](optional for local database)
  - [MySQL] (optional for local database)
- Ensure MySQL is running to accept connection.

1. Git clone the project

```
git clone https://github.com/nurbxfit/Technical_Assessment_Full_Stack_Developer_1.git demo
```

2. Cd into the project folder and install dependencies

```
cd demo && bun install
```

## start the backend

1. Copy `backend/.env.example` into `backend/.env`
2. Update the `DATABASE_URL` value
3. run prisma migration

```
bunx prisma migrate
```

4. run backend in dev mode

```
bun run dev
```

### (optional: local dev database using docker)

1. update the content of `/infra/database/start-db.sh` with your own database credentials if you like to.
2. run the `start-db.sh` to bring up a mysql database docker container
3. Execute the `item.sql` script in the docker container to setup database

```
docker exec -i arkmysql-db mysql -u root -password123 -e "source ./items.sql"
```

## start the frontend

1. cd into the frontend folder and run the dev mode

```
cd packages/frontend && bun run dev
```

# API Endpoints

**base url**: `http://localhost:3000/api`

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| POST   | `/items`     | Create an item          |
| GET    | `/items`     | Get all items           |
| GET    | `/items/:id` | Get item by id          |
| PUT    | `/items/:id` | Update an existing item |
| DELETE | `/items/:id` | Delete an item          |

# Example HTTP Requests

### Create Item

```http
POST http://localhost:3000/api/items HTTP/1.1
Content-Type: application/json

{
"name": "item03",
"description": "description of item03",
"price": 1.0
}
```

### Get All items

```http
GET http://localhost:3000/api/items HTTP/1.1
Content-Type: application/json
```

### Update an Item

```http
PUT http://localhost:3000/api/items/1 HTTP/1.1
Content-Type: application/json

{
"name": "item01",
"description": "item renamed to 01",
"price": 1.2
}
```

### Delete an Item failed case

```http
DELETE http://localhost:3000/api/items/s1s HTTP/1.1
```
