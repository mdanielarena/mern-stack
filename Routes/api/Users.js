const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const jwtSecret = config.get("jwtSecret");

const Users = require("../../models/Users");

//access public
router.get("/", (req, res) => {
  Users.find().then((user) => res.json(user));
});

//register user
//access public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  //check for existing user
  Users.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    //create new user
    const newUSer = new Users({
      name,
      email,
      password,
    });

    //create salt & hash
    bcrpyt.genSalt(10, (err, salt) => {
      bcrpyt.hash(newUSer.password, salt, (err, hash) => {
        if (err) throw err;
        newUSer.password = hash;
        newUSer.save().then((user) => {
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
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
