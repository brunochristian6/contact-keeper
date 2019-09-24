const router = require("express").Router();

//@route POST api/users
//@desc  Registrar user
//@access Public
router.post("/", (req, res) => {
  res.json({ msg: "Registrar" });
});

module.exports = router;
