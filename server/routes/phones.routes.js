const express = require("express");
const phoneRoutes = express.Router();
const Phone = require("../models/Phone.model");


phoneRoutes.get('/getAllPhones', (req, res) => {
    Phone.find()
        .then(allPhones => res.json(allPhones))
        .catch(err => console.log('DB error', err))

});

phoneRoutes.post("/create", (req, res) => {
  const {
    color,
    description,
    manufacturer,
    name,
    price,
    simStatus,
    memory,
    imageUrl,
    screen,
    processor 
  } = req.body;

  Phone.create({
    color,
    description,
    manufacturer,
    name,
    price,
    simStatus,
    memory,
    imageUrl,
    screen,
    processor
  })
    .then(phone => {
        res.json(phone);
    })
    .catch(err => console.log("DB error", err));
});

phoneRoutes.get("/details/:id", (req, res) => {
  const phoneId = req.params.id;
  console.log(phoneId);
  Phone.findById(phoneId)
    .then(phone => {
      console.log(phone, 'phone');
      res.json(phone)
    })
    .catch(err => console.log("DB error", err));
});

phoneRoutes.post("/edit/:id", (req, res) => {
  const {
    color,
    description,
    manufacturer,
    name,
    price,
    simStatus,
    memory,
    imageUrl,
    screen,
    processor
  } = req.body;

  const phoneId = req.params.id;

  Phone.findByIdAndUpdate(
    phoneId,
    {
      color,
      description,
      manufacturer,
      name,
      price,
      simStatus,
      memory,
      imageUrl,
      screen,
      processor
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