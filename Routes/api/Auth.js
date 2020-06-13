const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const jwtSecret = config.get("jwtSecret");

const Users = require("../../models/Users");

//access public
router.get("/", (req, res) => {
  Users.find().then((user) => res.json(user));
});

//access public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  //check for existing user
  Users.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not  exists" });

    //validate password
    bcrpyt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

      jwt.sign(
        { id: user.id },
        jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
          });
        }
      );
    });
  });
});

//access private
router.get("/user", auth, (req, res) => {
  //dont select password
  Users.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
