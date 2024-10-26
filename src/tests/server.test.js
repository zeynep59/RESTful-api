beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/BookstoreTestDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });
  

  test("POST /api/books", async () => {
    const data = {
      title: "dummy",
      author: { name: "dummy1", country: "dummy1", birthDate: "1920-10-08" },
      price: 29.99,
      ISBN: "9780441013593",
      language: "English",
      numberOfPages: 412,
      publisher: "dummy"
    };
  
    await supertest(app).post("/api/books")
      .send(data)
      .expect(201)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.title).toBe(data.title);
  
        // Check data in the database
        const book = await Book.findOne({ _id: response.body._id });
        expect(book).toBeTruthy();
        expect(book.title).toBe(data.title);
      });
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
      .expect(204)
      .then(async () => {
        expect(await Book.findOne({ _id: book._id })).toBeFalsy();
      });
  });

  