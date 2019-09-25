const router = require("express").Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");

//@route GET api/contacts
//@desc  GET contacts
//@access Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/contacts
//@desc  Add new contacts
//@access Private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("name", "Favor informar um nome")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

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
