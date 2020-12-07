const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
dotenv.config();

//connection mongodb
mongoose.connect(process.env.DB_URL,
{ 
    useNewUrlParser : true,
    useUnifiedTopology :true,
    useFindAndModify: false,
    useCreateIndex: true
    
},() => console.log('connected to Mongodb'));

app.use(express.json());

app.use('/api/user',authRoute);
app.use('/api/post',postRoute);

app.listen(3000,() => console.log("server up running 3000"));