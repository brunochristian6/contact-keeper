const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ erros: errors.array() });
    }
    res.send("passed");
  }
);

module.exports = router;
