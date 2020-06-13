const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//model
const Items = require("../../models/Items");

//access public
router.get("/", (req, res) => {
  Items.find()
    .sort({ date: -1 })
    .then((item) => res.json(item));
});

//access private
router.post("/", auth, (req, res) => {
  const newItem = new Items({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

//access private
router.delete("/:id", auth, (req, res) => {
  Items.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
