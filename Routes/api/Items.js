const express = require("express");
const router = express.Router();

//model
const Items = require("../../models/Items");

router.get("/", (req, res) => {
  Items.find()
    .sort({ date: -1 })
    .then((item) => res.json(item));
});

router.post("/", (req, res) => {
  const newItem = new Items({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

router.delete("/:id", (req, res) => {
  Items.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
