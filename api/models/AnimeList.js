import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Using mal_id to create the popup containing the anime info when clicked
const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  mal_id: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  }
});

export default mongoose.model("AnimeList", listSchema)