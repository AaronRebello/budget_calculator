const express = require("express");
const exphbs  = require('express-handlebars');
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const methodOverride = require("method-override");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express();

const port = 5000

const mongoDbURI = require("./config/keys");
mongoose
  .connect(mongoDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));


     //requiring mongoose model

     const Budget= require('./models/budgetSchema');

const { registerDecorator } = require("handlebars");

     
//template setup
app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

//body parser setup

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//method overirde
app.use(methodOverride("_method"));



const passbook = require('./routes/passbook');

app.use(passbook);


app.listen(port, () => {
    console.log(`port is running on ${port}`)
    });
  
