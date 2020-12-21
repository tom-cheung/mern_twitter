const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));
// router.get("/reply", (eq, res) => res.json({msg: "Reply to a tweet"})); testing, works 

module.exports = router;