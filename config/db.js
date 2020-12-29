const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

async function connectDB(){
  try
  {
    await mongoose.connect(db,
      {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify: false}
      );
    console.log("mongoDB connected");
  }
  catch(err)
  { 
    console.log(err)
    //Exit process with failure
    process.env.exit(1);
  }
}

module.exports = connectDB;