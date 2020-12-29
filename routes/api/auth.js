const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");



//@route POST api/auth
//@desc authenticate user and get token
//@access Public
router.post("/", 
[check("email","Please include a valid email").isEmail(),
check("password is required").exists()],

  async (req,res) => {
    const {email, password} = req.body
    try{
      const user = await User.findOne({email});
      
      if(!user){
        return res.status(400).json({
          errors:[{msg: "Invalid Credentials"}]
        })
      }
      
      const isMatch = await brcrypt.compare(password,user.password);

      if(!isMatch){
        return res.status(400).json({
          errors:[{msg: "Invalid Credentials"}]
        })
      }

      const payload = {
        user:{
          id: user.id
        }
      }

      jwt.sign(payload,
      config.get("jwtSecret"),
      {expiresIn: 36000},
      (err,token)=>{
        if(err) throw err;
        res.json({token})
      })

    }

    catch(err){
      console.log(err.message);
      res.status(500).json({msg:"Server Error"})
    }
  }
);


router.get("/",auth,
 async (req,res) => {
    try
    {
        const user = await User.findById(req.user.id).select("-password");
        res.json({user})

    }

    catch(err){
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
)

module.exports = router;