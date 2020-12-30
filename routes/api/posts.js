const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

//@route POST api/post
//@desc Create a post
//@access Private
router.post("/",[auth,[
  check("text","Text is required").not().isEmpty()
]],
  async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    const user = await User.findById(req.user.id).select("-password");



    try {
      const newPost= new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })

      const post = await newPost.save()
      res.json(post)


    } catch (err) {

      console.error(error.message);
      res.status(500).send({msg:"Server Error"});

    }



  }
);

//@route GET api/posts
//@desc Get all posts
//@access Private

router.get("/",auth,async (req,res) =>
  {
    try {
      const posts = await Post.find().sort({date:-1});
      res.json(posts)
      
    } catch (err) {
      console.error(err.message)
      res.status(500).send({msg:"Server Error"})
    }
  }
);

module.exports = router;