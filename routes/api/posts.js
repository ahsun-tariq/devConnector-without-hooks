const express = require("express");
const router = express.Router();


//@route GET api/post
//@desc TEST route
//@access Public
router.get("/",
  (req,res) => res.send("post route")
);


module.exports = router;