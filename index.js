const express = require('express');
const mongoose = require('mongoose');
const app = express();

module.exports = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/bookStore", { useMongoClient: true });

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
      });
      mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
      });

    mongoose.Promise = global.Promise;
}

app.get('/', (request, response) => {
    response.send('Hello World!')
});


app.listen(5000, ()=> console.log('server is running on port 5000'))