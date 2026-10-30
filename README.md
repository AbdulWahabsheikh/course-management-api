# Course Management API

REST API built with Express.js, MongoDB (Mongoose) and Modular MVC architecture.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your values
3. `npm start` (or `npm run dev`)

## Endpoints
| Method | URL | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/auth/me | Yes | Current user |
| POST | /api/categories | Yes | Create category |
| GET | /api/categories | No | List categories |
| GET | /api/categories/:id | No | Single category |
| PUT | /api/categories/:id | Yes | Update category |
| DELETE | /api/categories/:id | Yes | Delete category |
| POST | /api/courses | Yes | Create course |
| GET | /api/courses | No | List courses |
| GET | /api/courses/:id | No | Single course |
| PUT | /api/courses/:id | Yes | Update course |
| DELETE | /api/courses/:id | Yes | Delete course |

Protected routes need header: `Authorization: Bearer <token>`

## Structure
config/ models/ controllers/ routes/ middleware/ app.js server.js
