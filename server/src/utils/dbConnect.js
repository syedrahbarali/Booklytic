const mongoose = require("mongoose");

module.exports = dbConnect = async () => {
  try {
    return await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
