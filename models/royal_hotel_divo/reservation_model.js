const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  arrival_date: { type: String },
  release_date: { type: String },
  room_category: { type: String },
  number_of_rooms: { type: String },
  check_in: { type: Boolean, default: false },
  check_out: { type: Boolean, default: false },
  date: { type: String },
});

module.exports = mongoose.model(
  "royalhoteldivo_reservation",
  reservationSchema
);
