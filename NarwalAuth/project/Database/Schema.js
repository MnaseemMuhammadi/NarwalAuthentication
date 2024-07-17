const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// User Schema
const userSchema = new Schema({
  userId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(AutoIncrement, { inc_field: "userId", start_seq: 1 });
const User = mongoose.model("User", userSchema);

const mySchemas = { User };
module.exports = mySchemas;
