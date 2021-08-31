const express = require("express");
const phoneRoutes = express.Router();
const Phone = require("../models/Phone.model");


phoneRoutes.get('/', (req, res) => {
    Phone.find()
        .then(allPhones => res.json(allPhones))
        .catch(err => console.log('DB error', err))

});

phoneRoutes.post("/create", (req, res) => {
  const {
    name,
    manufacturer,
    color,
    imageUrl,
    description,
    price,
  } = req.body;

  Phone.create({
    name,
    manufacturer,
    color,
    imageUrl,
    description,
    price,
  })
    .then(phone => {
        res.json(phone);
    })
    .catch(err => console.log("DB error", err));
});

phoneRoutes.get("/details/:id", (req, res) => {
  const phoneId = req.params.id;
  Phone.findById(phoneId)
    .then(phone => res.json(phone))
    .catch(err => console.log("DB error", err));
});

phoneRoutes.post("/edit/:id", (req, res) => {
  const {
    name,
    manufacturer,
    color,
    imageUrl,
    description,
    price,
  } = req.body;

  const phoneId = req.params.id;

  Phone.findByIdAndUpdate(
    phoneId,
    {
        name,
        manufacturer,
        color,
        imageUrl,
        description,
        price,
    },
    { new: true }
  )
    .then(phone => res.json(phone))
    .catch(err => console.log("DB error", err));
});
phoneRoutes.get("/delete/:id", (req, res) => {
  let phone = req.params.id;
  Phone.findByIdAndDelete(phone)
    .then((response) => {
        res.json(response)
    })
    .catch(err => console.log(err));
});

module.exports = phoneRoutes;