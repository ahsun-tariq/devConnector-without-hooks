const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  //Reference to user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  company:{
    type: String
  },

  website:{
    type: String
  },

  location:{
    type:String
  },

  //instructor, student, developer
  status:{
    type: String,
    required: true
  },

  skills:{
    type: [String],
    required: true
  },

  bio:{
    type: String
  },

  githubUsername:{
    type: String
  },

  experience:[
    {
      title: {
        type: String,
        required: true
      },

      company:{
        type: String,
        required: true
      },
      
      location:{
        type: String
      },

      from:{
        type: Date,
        required: true
      },

      to: {
        type: Date,
      
      },

      current: {
        type: Boolean,
        default: false
      },

      description:{
        type: String
      }

    }
  ],

  education:[
    {
      school:{
        type: String,
        required: true
      },

      degree:{
        type: String,
        required: true,
      },

      fieldOfStudy:{
        type: String,
        required: true
      },

      to:{
        type: Date
      },

      current:{
        type: Boolean,
        default: false
      },

      description:{
        type: String
      }
    }
  ],

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook:{
      type: String
    },
    linkedIn:{
      type: String
    },
    instagram:{
      type: String
    }
  },

  date:{
    type: Date,
    default: Date.now
  }
  
});


module.exports = Profile = mongoose.model(
  "profile",profileSchema
);