const Reservation = require("../../models/royal_hotel_divo/reservation_model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.createReservation = async (req, res) => {
  const reservation = new Reservation({
    ...req.body,
    date: new Date().toUTCString(),
  });
  reservation
    .save()
    .then(() => {
      res.status(201).json({
        message: `la reservation a bien été prise en compte : ${res}`,
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getReservation = async (req, res) => {
  try {
    await Reservation.find()
      .sort({ $natural: -1 })
      .then((reservation) => res.status(200).json(reservation))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getOneReservation = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknown : ${req.params.id}`);
  } else {
    try {
      await Reservation.findById({ _id: req.params.id })
        .then((reservation) => res.status(200).json(reservation))
        .catch((error) => res.status(400).json(`ID unknown : ${error}`));
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

exports.modifyReservation = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknown : ${req.params.id}`);
  } else {
    try {
      await Reservation.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((reservation) => console.log(reservation))
        .then(
          res.status(200).json({
            message: `la reservation a bien été modifiée : ${res}`,
          })
        )
        .catch((error) => res.status(401).json({ message: `${error}` }));
    } catch (error) {
      res.status(500).json({ message: `internal-server-error : ${error}` });
    }
  }
};

exports.deleteReservation = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknown : ${req.params.id}`);
  } else {
    try {
      await Reservation.deleteOne({ _id: req.params.id }).then((reservation) =>
        console.log(reservation)
      );
      then(() => {
        res.status(200).json({ message: `la reservation a bien été annulée` });
      }).catch((error) => res.status(400).json({ error }));
    } catch (error) {
      return res
        .status(500)
        .json({ message: `internal-error-servor : ${error}` });
    }
  }
};
