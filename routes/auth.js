const router = require("express").Router();

//@route GET api/auth
//@desc   Get logged user
//@access Privado
router.get("/", (req, res) => {
  res.json({ msg: "Get Logged in user" });
});

//@route POST api/auth
//@desc   Auth user and get token
//@access Publico
router.post("/", (req, res) => {
  res.json({ msg: "Log in user" });
});

module.exports = router;
