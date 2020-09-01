const { Router } = require("express");

const router = Router();
const Event = require("../models/Events");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  Event.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("start").isISO8601().toDate(),
    check("end").isISO8601().toDate(),
  ],
  (req, res) => {
    console.log("Req body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Event.create(req.body)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
  }
);

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
});

router.put("/:id", (req, res) => {
  Event.findByIdAndUpdate(req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
});
router.delete("/:id", (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
});

module.exports = router;
