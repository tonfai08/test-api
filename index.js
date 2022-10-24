const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
app.use(cors()) // Use this after the variable declaration
// require('dotenv/config')
app.use(express.json());
//import Router
const dishTypeRouter = require('./routes/dishType')
const dishRouter = require('./routes/dish')
const jwtRouter = require('./routes/jwt')

app.use('/dishtype', dishTypeRouter);
app.use('/dish', dishRouter);
app.use('/jwt', jwtRouter);

app.get('/', (req,res) => {
    res.send('Hello World');
})

//connect
// const dburi = process.env.DB_CONNECTTION;
  const dburl  ="mongodb+srv://tonbee159:015665521@cluster0.qgqzi.mongodb.net/?retryWrites=true&w=majority";
  console.log("Connecting to DB...");
  mongoose.connect(dburl).catch(e => { 
    console.error("Error Connecting to DB"+e);
    console.log("Good Bye !");
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server is running on port '+PORT));