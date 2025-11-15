import express from "express";
import {
  getAll,
  changeStatus,
  addNote,
  deleteNote,
  getNotes,
} from "../../controllers/territoryPartner/calenderController.js";

const router = express.Router();

router.get("/meetings", getAll);
router.put("/meeting/status/:id", changeStatus);
router.get("/notes", getNotes);
router.post("/note/add", addNote);
router.delete("/note/delete/:id", deleteNote);

export default router;
