import express from "express";
import { getAllLists, addToList, updateList, getById, deleteList } from "../controllers/list-controller";

const listRouter = express.Router();

listRouter.get("/", getAllLists);
listRouter.get("/:id", getById);
listRouter.post("/add", addToList);
listRouter.put("/update/:id", updateList);
listRouter.delete("/:id", deleteList);


export default listRouter;