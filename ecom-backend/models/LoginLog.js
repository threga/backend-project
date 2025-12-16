const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  loginTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LoginLog", loginLogSchema);
