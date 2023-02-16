import mongoose from "mongoose";
import AnimeList from "../models/AnimeList";
import User from "../models/User";

export const getAllLists = async (req, res, next) => {
  let lists;
  try {
    lists = await AnimeList.find()
  } catch (err) {
    return console.log(err);
  }
  if (!lists) {
    return res.status(404).json({ message: "No List Yet" })
  }
  return res.status(200).json({ lists })
};

export const addToList = async (req, res, next) => {
  const { title, thumbnail, mal_id, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err)
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by ID" })
  }
  const list = new AnimeList({
    title,
    thumbnail,
    mal_id,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await list.save({ session });
    existingUser.list.push(list)
    await existingUser.save({ session })
    await session.commitTransaction();

  } catch (err) {
    return console.log(err);
    return res.status(500).json({ message: err })
  }
  return res.status(200).json({ list });
};

export const updateList = async (req, res, next) => {
  const { title, thumbnail, mal_id } = req.body;
  const listId = req.params.id;

  let lists;
  try {
    lists = await AnimeList.findByIdAndUpdate(listId, {
      title,
      thumbnail,
      mal_id
    })
  } catch (err) {
    return console.log(err);
  }
  if (!lists) {
    return res.status(500).json({ message: "Unable to update" })
  }
  return res.status(200).json({ lists });
  const list = await AnimeList.findByIdAndUpdate(listId, {
    title,
    thumbnail,
    mal_id
  })
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let lists;
  try {
    lists = await AnimeList.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!lists) {
    return res.status(404).json({ message: "No List found" });
  }
  return res.status(200).json({ lists });
};

export const deleteList = async (req, res, next) => {
  const id = req.params.id;

  let lists;
  try {
    lists = await AnimeList.findByIdAndRemove(id).populate("user");
    await lists.user.list.pull(lists);
  } catch (err) {
    return console.log(err)
  }
  if (!lists) {
    return res.status(500).json({ message: "Unable to Delete" })
  }
  return res.status(200).json({ message: "Successfully Deleted" })
}