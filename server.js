const express = require("express");
const app = express();
const port = 5555;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

///routes
const Royal_hotel_divo_reservation_routes = require("./routes/royal_hotel_divo_routes/royal_hotel_divo_routes");

app.get("/", (req, res) => res.send("hello word"));
app.listen(process.env.PORT || port, () => {
  console.log(`app listening on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//connect to database
//not change the username

mongoose
  .connect(
    "mongodb+srv://evansJean:Azerty0987@cluster0.a2k1t6d.mongodb.net/all_dashbaord_api?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => console.log(`database connecting ${res}`))
  .catch((err) => console.log(`connection failed ${err.message}`));

//royal_hotel_divo_routes
app.use(Royal_hotel_divo_reservation_routes);
