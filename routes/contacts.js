const router = require("express").Router();

//@route GET api/contacts
//@desc  GET contacts
//@access Private
router.get("/", (req, res) => {
  res.json({ msg: "Get all Contacts" });
});

//@route POST api/contacts
//@desc  Add new contacts
//@access Private
router.post("/", (req, res) => {
  res.json({ msg: "Add new Contacts" });
});

//@route PUT api/contacts/:id
//@desc  edit contacts
//@access Private
router.put("/:id", (req, res) => {
  res.json({ msg: "Update Contacts" });
});

//@route DELETE api/contacts/:id
//@desc  Delete contacts
//@access Private
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete Contacts" });
});

module.exports = router;
