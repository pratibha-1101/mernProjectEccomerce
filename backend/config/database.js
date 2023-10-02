const mongoose = require("mongoose");
// DB_URI = "mongodb.//localhost:27017/Eccomerce"


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
        // ,useCreateIndex: true 
    })
        .then((data) => {
            console.log(`mongodb connected with mogodb ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
        })
}


module.exports = connectDatabase