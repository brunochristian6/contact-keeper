const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

//@route GET api/contacts
//@desc  GET contacts
//@access Private
router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "Get all Contacts" });
});

//@route POST api/contacts
//@desc  Add new contacts
//@access Private
router.post("/", authMiddleware, (req, res) => {
  res.json({ msg: "Add new Contacts" });
});

//@route PUT api/contacts/:id
//@desc  edit contacts
//@access Private
router.put("/:id", authMiddleware, (req, res) => {
  res.json({ msg: "Update Contacts" });
});

//@route DELETE api/contacts/:id
//@desc  Delete contacts
//@access Private
router.delete("/:id", authMiddleware, (req, res) => {
  res.json({ msg: "Delete Contacts" });
});

module.exports = router;
