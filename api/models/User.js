import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  list: [{
    type: mongoose.Types.ObjectId,
    ref: "AnimeList",
    required: true
  }]
});

export default mongoose.model("User", userSchema);
