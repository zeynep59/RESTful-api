const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../server'); // Import the app from your server file
const Book = require('../models/Book');
const Author = require('../models/Author');

let isConnected = false; // Track connection state

beforeAll(async () => {
  if (!isConnected) {
    await mongoose.connect("mongodb://localhost:27017/bookStore", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true; // Set the connection state
  }
});

afterAll(async () => {
  if (isConnected) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    isConnected = false; // Reset the connection state
  }
});

test("POST /api/books", async () => {
  const author = await Author.create({ 
    name: "dummy1", 
    country: "dummy1", 
    birthDate: "1920-10-08" 
  });

  const data = {
    title: "dummy",
    author: author._id,
    price: 29.99,
    ISBN: "9780441013593",
    language: "English",
    numberOfPages: 412,
    publisher: "dummy"
  };

  const response = await supertest(app).post("/api/books").send(data).expect(201);

  // Check the response
  expect(response.body._id).toBeTruthy();
  expect(response.body.title).toBe(data.title);

  // Check data in the database
  const book = await Book.findOne({ _id: response.body._id });
  expect(book).toBeTruthy();
  expect(book.title).toBe(data.title);
});

test("DELETE /api/books/:id", async () => {
  const book = await Book.create({ 
    title: "dummy", 
    author: { name: "dummy1", country: "dummy1", birthDate: "1920-10-08" }, 
    price: 29.99,
    ISBN: "9780441013593",
    language: "English",
    numberOfPages: 412,
    publisher: "dummy" 
  });

  await supertest(app)
    .delete("/api/books/" + book._id)
    .expect(204);

  expect(await Book.findOne({ _id: book._id })).toBeFalsy();
});
