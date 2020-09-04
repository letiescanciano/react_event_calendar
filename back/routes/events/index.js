const { Router } = require("express");
const router = Router();

const { check, validationResult } = require("express-validator");

const Event = require("../../models/Events");
const ObjectId = require("mongoose").Types.ObjectId;

const validationArray = [
  check("title").not().isEmpty(),
  check("description").not().isEmpty(),
  check("start").isISO8601().toDate(),
  check("end").isISO8601().toDate(),
];

router.get("/", (req, res) => {
  console.log("Get events fired");
  Event.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/", validationArray, (req, res) => {
  console.log("Req body", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Event.create(req.body)
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      ok: false,
      msg: "_id is not correct. Please check it and try again",
    });
  }
  Event.findById(req.params.id)
    .then((data) => {
      return data
        ? res.status(200).json(data)
        : res
            .status(400)
            .json({ ok: false, msg: "No event match the id provided" });
    })
    .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
});

router.put("/:id", validationArray, (req, res) => {
  const errors = validationResult(req);
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      ok: false,
      msg: "_id is not correct. Please check it and try again",
    });
  }
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      return data
        ? res.status(201).json(data)
        : res
            .status(400)
            .json({ ok: false, msg: "No event match the id provided" });
    })
    .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
});
router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      ok: false,
      msg: "_id is not correct. Please check it and try again",
    });
  }
  Event.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({ ok: true, msg: "Event deleted correctly" });
    })
    .catch((err) => res.status(500).json({ ok: false, msg: err.message }));
});

module.exports = router;
