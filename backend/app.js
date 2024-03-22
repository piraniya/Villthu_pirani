const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const path = require('path');



app.use(cors({
    origin: 'http://localhost:3000', // Adjust the origin based on your frontend URL
    credentials: true,
  }))


const userRoutes = require('./routes/userRoutes');
const plantRoute = require('./routes/plantRoute');
const fertilizersRoute = require('./routes/fertilizersRoute');
const reviewRoute = require('./routes/reviewRoute');
const adminRoute = require ('./routes/adminRoute');
const stripe = require ('./controller/stripe')
const getUser = require('./controller/getusercontroller');
const userInfo = require('./routes/userInformationRoute');
const createOrder = require('./routes/createOrderRoute');
const review = require("./routes/reviewRoute")
const products = require('./routes/productRoute');
const port = process.env.PORT || 4009;
require('./db');




// execute database connection 




// var corsOptions = {
//     origin:"http://localhost:4200"
// };


// app.use(cors(corsOptions))
// app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use('/api/products', productRoute);
app.use('/api/users', userRoutes);
app.use('/api/plants', plantRoute);
app.use('/api/fertilizers', fertilizersRoute);
app.use('/api/reviews',reviewRoute);
app.use('/api/admin',adminRoute);
app.use('/api/v1/',stripe);
app.use('/api/v1/',getUser);
app.use('/api/v1/',userInfo)
app.use('/api/v1/',createOrder)
app.use('/api/v1/',products);

app.listen(port, function () {
    console.log("app running", port)
})