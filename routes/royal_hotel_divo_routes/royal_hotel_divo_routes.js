const express = require("express");
const router = express.Router();
const ReservationCtrl = require("../../controllers/royal_hotel_divo_controllers/reservation_controller");

router.post("/royal_hotel_divo_reservation", ReservationCtrl.createReservation);
router.get("/royal_hotel_divo_reservation", ReservationCtrl.getReservation);
router.get(
  "/royal_hotel_divo_reservation/:id",
  ReservationCtrl.getOneReservation
);
router.put(
  "/royal_hotel_divo_reservation/:id",
  ReservationCtrl.modifyReservation
);
router.delete(
  "/royal_hotel_divo_reservation/:id",
  ReservationCtrl.deleteReservation
);

module.exports = router;
