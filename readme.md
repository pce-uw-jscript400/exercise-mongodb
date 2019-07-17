# Exercise: Book Shop

This exercise will assess your ability to build a fully working API with MongoDB.

## Setup

1. Fork & Clone this repository
1. `npm install`
1. `npm run dev`

## Instructions

As it stands, this repository contains an API for books. Update each route so that it uses a MongoDB database instead of recording the information in-memory.

Additionally, add a new set of routes for the authors. For example:

```
GET    /api/books/:bookId/authors
GET    /api/books/:bookId/authors/:authorId
POST   /api/books/:bookId/authors
PUT    /api/books/:bookId/authors/:authorId
DELETE /api/books/:bookId/authors/:authorId
```
