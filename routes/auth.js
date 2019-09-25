const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");
//@route GET api/auth
//@desc   Get logged user
//@access Privado
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server error");
  }

  res.json({ msg: "Get Logged in user" });
});

//@route POST api/auth
//@desc   Auth user and get token
//@access Publico
router.post(
  "/",
  [
    check("email", "Entre com um email valido").isEmail(),
    check("password", "Favor informar a senha").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ erros: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Email ou senha incorretos" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Email ou senha incorretos" });
      }

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
