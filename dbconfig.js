const mongoose = require('mongoose');

module.exports =  () => {
    connection_string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tcbwmb9.mongodb.net/?retryWrites=true&w=majority`
    options = { useNewUrlParser: true, useUnifiedTopology: true }

    mongoose.connect(connection_string, options)
        .then(() => console.log('Database Successfully Connected'))
        .catch((err) => console.log(err))
}
