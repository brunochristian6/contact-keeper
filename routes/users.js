const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const { check, validationResult } = require("express-validator");

//@route POST api/users
//@desc  Registrar user
//@access Public
router.post(
  "/",
  [
    check("name", "Favor informar o nome")
      .not()
      .isEmpty(),
    check("email", "Favor informar um email").isEmail(),
    check(
      "password",
      "Favor informar uma senha com no minimo 6 characters "
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ erros: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User ja cadastrado" });
      }

      user = new User({
        name,
        email,
        password
      });

      //HashPassword

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
